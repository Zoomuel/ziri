import config                  from 'config';

export default {
	log: (() => window.console.log.bind(window.console))(),
	debug: (() => config.debug ? window.console.log.bind(window.console) : () => {})(),
	error: (() => config.debug ? window.console.error.bind(window.console) : () => {})(),

	getPhotoBlob: url => new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.onload = () => {
			const reader = new FileReader();

			reader.onloadend = () => { resolve(reader.result); };
			reader.readAsDataURL(xhr.response)
		};
		xhr.onerror = () => reject();
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	}),

	getPhotoSize: blob => new Promise((resolve, reject) => {
		const tmp = new Image();

		tmp.onload = () => {
			resolve({
				width: tmp.width,
				height: tmp.height,
			});
		};
		tmp.error = () => reject();
		tmp.src = blob;
	}),

	sleep: (ms) => new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms);
	}),

	criticalSection: (m, fn) => new Promise((resolve, reject) => {
		m.lock(() => {
			(async () => {
				resolve(await fn());
				m.unlock();
			})();
		});
	}),

	forceRange: (v, {
		min = Number.MIN_SAFE_INTEGER,
		max = Number.MAX_SAFE_INTEGER,
	}) => Math.min(max, Math.max(min, v)),

	waitForFinalEvent: (() => {
		const timers = {};

		return (callback, ms, id) => {
			if (timers[id]) {
				clearTimeout(timers[id]);
			}
			timers[id] = setTimeout(callback, ms);
		};
	})(),
};
