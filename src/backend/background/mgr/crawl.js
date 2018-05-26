import locks                   from 'locks';

import InstagramCrawler        from 'backend/background/crawler/instagram';
import mgrStorage              from 'backend/background/mgr/storage';
import sdkUtils                from 'sdk/utils';
import config                  from 'config';

const NO_PHOTO = {
	photoBlob: require('img/sorrow.png'),
	photoCaption: chrome.i18n.getMessage('subscriptions_no_available'),
	photoUrl: 'https://en.wikipedia.org/wiki/At_Eternity%27s_Gate',
	sourceName: 'Vincent van Gogh',
	sourceUrl: 'https://en.wikipedia.org/wiki/Vincent_van_Gogh',
};
const CRAWLER_CTORS = {
	Instagram: InstagramCrawler,
};

const mutex = locks.createMutex();

let ready = false;
let crawlers = [];
let lastPhoto = null;
let lastCrawler = null;

const mgr = {
	getReady: async () => {
		await sdkUtils.criticalSection(mutex, async () => {
			if (ready) {
				return;
			}

			const settings = (await mgrStorage.instance()).get('settings');

			for (const { src, id } of settings.subscriptions || []) {
				mgr.addCrawler({ src, id });
			}

			ready = true;
		});
	},

	refillCrawlers: async (force = false) => {
		await sdkUtils.criticalSection(mutex, async () => {
			sdkUtils.debug('refillCrawlers');

			for (const crawler of crawlers) {
				if (crawler.empty() || force) {
					await crawler.refill();
				}
			}
		});
	},

	addCrawler: ({ src, id, photos = [] }) => {
		const ctor = CRAWLER_CTORS[src];

		if (!ctor) {
			sdkUtils.error('Unknown subscribe source', src);
			return;
		}

		if (crawlers.some(c => (src === c.src && id === c.id))) {
			sdkUtils.debug('Adding duplicated crawler', src, id);
			return;
		}

		crawlers.push(new ctor({ id, photos }));
	},

	delCrawler: ({ src, id }) => {
		let deleted = null;

		crawlers = crawlers.filter(c => {
			if (src !== c.src || id !== c.id) {
				return true;
			}
			deleted = c;
		});

		if (deleted === lastCrawler) {
			lastPhoto = null;
		}
	},

	getData: (changeInterval) => {
		if (!lastPhoto || Date.now() > (parseInt(localStorage.getItem('firstShow'), 0) + changeInterval * 60000)) {
			const availableCrawlerArr = crawlers.filter(c => !c.empty());
			const crawler = availableCrawlerArr[Math.floor(Math.random() * availableCrawlerArr.length)];

			if (!crawler) {
				lastCrawler = null;
				return NO_PHOTO;
			}

			lastCrawler = crawler;
			lastPhoto = crawler.getOne();
		}

		return lastPhoto;
	},
};

export default {
	instance: async () => {
		await mgr.getReady();
		return mgr;
	},
};
