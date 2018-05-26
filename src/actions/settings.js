import { ASYNC_TASK }          from 'middleware/asyncTask';
import React                   from 'react';

import apiMgr                  from 'sdk/apiMgr';

export const SET_SETTINGS_START = 'SET_SETTINGS_START';
export const SET_SETTINGS_END   = 'SET_SETTINGS_END';
export const SET_SETTINGS_FAIL  = 'SET_SETTINGS_FAIL';

export const setSettings = (value) => {
	return {
		[ASYNC_TASK]: {
			types: [
				SET_SETTINGS_START,
				SET_SETTINGS_END,
				SET_SETTINGS_FAIL,
			],
			task: async (state) => {
				await apiMgr.send({
					target: 'background',
					method: 'setSettings',
					params: value,
				});
				return value;
			},
		},
	};
};

export const ADD_SUBSCRIPTION_START = 'ADD_SUBSCRIPTION_START';
export const ADD_SUBSCRIPTION_END   = 'ADD_SUBSCRIPTION_END';
export const ADD_SUBSCRIPTION_FAIL  = 'ADD_SUBSCRIPTION_FAIL';

export const addSubscription = (value) => {
	return {
		[ASYNC_TASK]: {
			types: [
				ADD_SUBSCRIPTION_START,
				ADD_SUBSCRIPTION_END,
				ADD_SUBSCRIPTION_FAIL,
			],
			task: async (state) => {
				return await apiMgr.send({
					target: 'background',
					method: 'addSubscription',
					params: value,
				});
			},
		},
	};
};

export const DEL_SUBSCRIPTION_START = 'DEL_SUBSCRIPTION_START';
export const DEL_SUBSCRIPTION_END   = 'DEL_SUBSCRIPTION_END';
export const DEL_SUBSCRIPTION_FAIL  = 'DEL_SUBSCRIPTION_FAIL';

export const delSubscription = (value) => {
	return {
		[ASYNC_TASK]: {
			types: [
				DEL_SUBSCRIPTION_START,
				DEL_SUBSCRIPTION_END,
				DEL_SUBSCRIPTION_FAIL,
			],
			task: async (state) => {
				return await apiMgr.send({
					target: 'background',
					method: 'delSubscription',
					params: value,
				});
			},
		},
	};
};
