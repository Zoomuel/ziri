import { ASYNC_TASK }          from 'middleware/asyncTask';
import React                   from 'react';

import apiMgr                  from 'sdk/apiMgr';

export const SET_EDITING     = 'SET_EDITING';

export const SET_ITEMS_START = 'SET_ITEMS_START';
export const SET_ITEMS_END   = 'SET_ITEMS_END';
export const SET_ITEMS_FAIL  = 'SET_ITEMS_FAIL';

export const setItems = (value) => {
	return {
		[ASYNC_TASK]: {
			types: [
				SET_ITEMS_START,
				SET_ITEMS_END,
				SET_ITEMS_FAIL,
			],
			payload: value,
			task: async (state) => {
				return await apiMgr.send({
					target: 'background',
					method: 'setTodoItems',
					params: value,
				});
			},
		},
	};
};
