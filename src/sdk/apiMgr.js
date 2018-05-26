import {
	CODE,
	ZiriError,
}                              from 'sdk/error';

const backgroundApiClient = {
	send: (req) => {
		return new Promise((resolve, reject) => {
			chrome.runtime.sendMessage(req, (resp) => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
					return;
				}
				resolve(resp);
			});
		});
	},
};

const serverApiClient = {
	send: (req) => {
		throw new ZiriError({ code: CODE.NOT_IMPLEMENT });
	},
};

const apiClientMap = new Map([
	['background', backgroundApiClient],
	['server',     serverApiClient],
]);

export default {
	send: async ({ target, method, params }) => {
		if (!apiClientMap.has(target)) {
			throw new ZiriError({ code: CODE.BAD_PARAM });
		}

		const {
			success,
			data,
		} = await apiClientMap.get(target).send({ method, params });

		if (!success) {
			throw new ZiriError({
				code: data.code,
				data: data.data || {},
				args: data.args || [],
			});
		}

		return data;
	},
};
