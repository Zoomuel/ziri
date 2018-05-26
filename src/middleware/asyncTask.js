import sdkUtils                from 'sdk/utils';

export const ASYNC_TASK = 'ASYNC_TASK';

const asyncTaskMiddleware = ({ dispatch, getState }) => {
	return next => action => {
		const asyncTask = action[ASYNC_TASK];

		if (typeof asyncTask === 'undefined') {
			// None of my business, pass it on
			return next(action);
		}

		const {
			types,
			task,
			payload,
			shouldDo = () => true,
		} = action[ASYNC_TASK];

		if (-1 === ['AsyncFunction', 'Function'].indexOf(task.constructor.name)) {
			throw new Error('task should be an async function or function');
		}

		if (!Array.isArray(types) ||
			types.length !== 3 ||
			!types.every(type => typeof type === 'string')) {
			throw new Error('Expected an array of three string types.');
		}

		if (!shouldDo(getState())) {
			return;
		}

		const [ startType, endType, failType ] = types;

		(async () => {
			// Start
			next({ type: startType, payload });

			try {
				// Success
				next({
					type: endType,
					payload,
					result: await task(getState()),
				});
			} catch (e) {
				// Fail
				sdkUtils.error(e);
				next({
					type: failType,
					payload,
					result: e.message,
				});
			}
		})();
	};
}

export default asyncTaskMiddleware;
