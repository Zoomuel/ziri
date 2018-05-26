import locks                   from 'locks';

import {
	CODE,
	ZiriError,
}                              from 'sdk/error';
import sdkUtils                from 'sdk/utils';
import mgrStorage              from 'backend/background/mgr/storage';
import mgrCrawl                from 'backend/background/mgr/crawl';

const subscriptionsMutex = locks.createMutex();
const todoItemsMutex = locks.createMutex();

const methodMap = new Map([
	['loadModel', async () => {
		const mgrStorageInstance = await mgrStorage.instance();
		const mgrCrawlInstance = await mgrCrawl.instance();

		if (mgrCrawlInstance.empty()) {
			await mgrCrawlInstance.refillCrawlers(true);
		}

		const settings = mgrStorageInstance.get('settings');
		const todo = mgrStorageInstance.get('todo');
		const crawl = (await mgrCrawl.instance()).getData(settings.photoChangeInterval);

		return { settings, todo, crawl };
	}],
	['refillCrawlers', async (force) => {
		await (await mgrCrawl.instance()).refillCrawlers(force);
	}],
	['setSettings', async (s) => {
		await (await mgrStorage.instance()).set('settings', s);
	}],
	['addSubscription', async (s) => {
		return await sdkUtils.criticalSection(subscriptionsMutex, async () => {
			const mgrStorageInstance = await mgrStorage.instance();
			const mgrCrawlInstance = await mgrCrawl.instance();
			const subscriptions = mgrStorageInstance.get('settings').subscriptions || [];

			if (!subscriptions.some(({ src, id }) => (src === s.src && id === s.id))) {
				subscriptions.push(s);
			}

			await mgrStorageInstance.set('settings', { subscriptions });
			await mgrCrawlInstance.addCrawler(s, false);

			// Asynchronously refill
			mgrCrawlInstance.refillCrawlers(false);

			return subscriptions;
		});
	}],
	['delSubscription', async (s) => {
		return await sdkUtils.criticalSection(subscriptionsMutex, async () => {
			const mgrStorageInstance = await mgrStorage.instance();
			const mgrCrawlInstance = await mgrCrawl.instance();
			const subscriptions = (mgrStorageInstance.get('settings').subscriptions || []).filter(({
				src, id,
			}) => {
				return src !== s.src || id !== s.id;
			});

			await mgrStorageInstance.set('settings', { subscriptions });
			await mgrCrawlInstance.delCrawler(s);

			return subscriptions;
		});
	}],
	['setTodoItems', async (items) => {
		return await sdkUtils.criticalSection(todoItemsMutex, async () => {
			await (await mgrStorage.instance()).set('todo', {
				items,
				lastUpdate: Date.now(),
			});
			return items;
		});
	}],
	['autoCleanTodo', async () => {
		return await sdkUtils.criticalSection(todoItemsMutex, async () => {
			const mgrStorageInstance = await mgrStorage.instance();
			const todo = mgrStorageInstance.get('todo');

			// Not updated for 4 hours
			if (todo.lastUpdate + 14400000 > Date.now()) {
				return;
			}

			await mgrStorageInstance.set('todo', {
				items: (todo.items || []).filter(({ completed }) => !completed ),
				lastUpdate: Date.now(),
			});
		});
	}],
]);

export default {
	invoke: async ({ method, params = {} }) => {
		sdkUtils.debug(`Invoke API "${method}"`, params);

		if (!methodMap.has(method)) {
			throw new ZiriError({ code: CODE.NO_SUCH_METHOD });
		}

		return await methodMap.get(method)(params);
	},
};
