import { ASYNC_TASK }          from 'middleware/asyncTask';
import React                   from 'react';

import apiMgr                  from 'sdk/apiMgr';

export const LOAD_MODEL_START = 'LOAD_MODEL_START';
export const LOAD_MODEL_END   = 'LOAD_MODEL_END';
export const LOAD_MODEL_FAIL  = 'LOAD_MODEL_FAIL';

export const loadModel = () => {
	return {
		[ASYNC_TASK]: {
			types: [
				LOAD_MODEL_START,
				LOAD_MODEL_END,
				LOAD_MODEL_FAIL,
			],
			task: async (state) => {
				return await apiMgr.send({
					target: 'background',
					method: 'loadModel',
				});
			},
		},
	};
};
