import Immutable               from 'immutable';

import { LOAD_MODEL_END }      from 'actions/model';
import {
	SET_SETTINGS_START,
	SET_SETTINGS_END,
	SET_SETTINGS_FAIL,
	ADD_SUBSCRIPTION_END,
	DEL_SUBSCRIPTION_END,
}                              from 'actions/settings';

export default (state = Immutable.Map({
	initialized: false,
	userName: '',
	photoChangeInterval: 10,
	showClockNumber: true,
	showClockSecond: false,
	autoCleanTodo: true,
	subscriptions: [],
}), action) => {
	switch (action.type) {
		case LOAD_MODEL_END:
			return state.merge(action.result.settings);
		case SET_SETTINGS_END:
			return state.merge(action.result);
		case ADD_SUBSCRIPTION_END:
		case DEL_SUBSCRIPTION_END:
			return state.set('subscriptions', Immutable.fromJS(action.result));
		default:
			return state;
	}
};
