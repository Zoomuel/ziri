module.exports = {
	debug: false,
	contactMail: 'zoomuel@gmail.com',
	defaultStorage: {
		settings: {
			initialized: false,
			userName: '',
			photoChangeInterval: 10,
			showClockNumber: true,
			showClockSecond: false,
			autoCleanTodo: true,
			subscriptions: [{
				src: 'Instagram',
				id: 'instagram',
			}],
		},
		todo: {
			items: [],
			lastUpdate: 0,
		},
	},
};
