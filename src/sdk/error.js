export const CODE = {
	UNKNOWN: 'UNKNOWN',
	BAD_PARAM: 'BAD_PARAM',
	NOT_IMPLEMENT: 'NOT_IMPLEMENT',
	NO_SUCH_METHOD: 'NO_SUCH_METHOD',
	UNKNOWN_SUBSCRIBE_SRC: 'UNKNOWN_SUBSCRIBE_SRC',
	CRAWL_ERROR: 'CRAWL_ERROR',
	UNKNOWN_SETTING_FIELD: 'UNKNOWN_SETTING_FIELD',
};

export class ZiriError extends Error {
	constructor(...Args) {
		super(...Args);

		const {
			code = 'unknown',
			data = {},
			args = [],
			stack = true,
		} = Args[0];

		Object.assign(this, {
			code, data, args,
			stack: (stack ? (new Error()).stack : undefined),
		});
	}
};
