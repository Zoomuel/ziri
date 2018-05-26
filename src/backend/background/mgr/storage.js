import locks                   from 'locks';

import sdkUtils                from 'sdk/utils';

const KNOWN_CATEGORIES = [
	'settings',
	'todo',
];

const mutex = locks.createMutex();

let dataCached = {};
let ready = false;

const mgr = {
	getReady: async () => {
		await sdkUtils.criticalSection(mutex, async () => {
			if (ready) {
				return;
			}

			dataCached = await new Promise((resolve, reject) => {
				chrome.storage.local.get(KNOWN_CATEGORIES, data => resolve(data));
			});

			ready = true;
		});
	},

	get: (category) => {
		return dataCached[category];
	},

	set: async (category, data) => {
		// Update memory with shallow merging
		Object.assign(dataCached[category], data);
		// Update storage
		await mgr.flush();
	},

	flush: () => new Promise((resolve, reject) => {
		chrome.storage.local.set(dataCached, resolve);
	}),
};

export default {
	instance: async () => {
		await mgr.getReady();
		return mgr;
	},
};
