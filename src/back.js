import {
	CODE,
	ZiriError,
}                              from 'sdk/error';
import sdkUtils                from 'sdk/utils';
import apiGateway              from 'backend/background/apiGateway';
import config                  from 'config';

// Listen on API gateway
chrome.runtime.onMessage.addListener((req, sender, sendResp) => {
	// Verify sender
	if (sender.id !== chrome.runtime.id) {
		sendResp('who the fuck are you?');
		return false;
	}

	// Trigger api
	(async () => {
		try {
			sendResp({
				success: true,
				data: await apiGateway.invoke(req),
			});
		} catch (e) {
			sdkUtils.error(e.code, e);

			const data = e instanceof ZiriError ? {
				code: e.code,
				data: e.data,
				args: e.args,
			} : {
				code: CODE.UNKNOWN,
			};

			try {
				sendResp({ success: false, data });
			} catch (e) {
				// User may already closed new tab
			}
		}
	})();

	// Enable asynchronous sendResp
	return true;
});

// Initialize storage & crawlers
chrome.runtime.onInstalled.addListener((details) => {
	(async () => {
		if (details.reason === 'install') {
			sdkUtils.debug('Installed, set default storage');
			await chrome.storage.local.set(config.defaultStorage);
		}
		if (details.reason === 'install' || details.reason === 'update') {
			sdkUtils.debug('Updated, refill crawlers');
			await apiGateway.invoke({
				method: 'refillCrawlers',
				params: { force: true },
			});
		}
	})();
});

// Listen on chrome alarms
chrome.alarms.onAlarm.addListener((alarm) => {
	(async () => {
		switch (alarm.name) {
			case 'refill_crawler':
				sdkUtils.debug('Alarm: refill_crawler');
				await apiGateway.invoke({
					method: 'refillCrawlers',
					params: { force: true },
				});
				break;
			case 'auto_clean_todo':
				sdkUtils.debug('Alarm: auto_clean_todo');
				await apiGateway.invoke({
					method: 'autoCleanTodo',
				});
				break;
			default:
				break;
		}
	})();
});

// Create alarms
chrome.alarms.clearAll(() => {});
chrome.alarms.create('refill_crawler', { periodInMinutes: 120 });
chrome.alarms.create('auto_clean_todo', { periodInMinutes: 240 });
