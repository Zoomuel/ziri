import Immutable               from 'immutable';

import {
	LOAD_MODEL_START,
	LOAD_MODEL_END,
	LOAD_MODEL_FAIL,
}                              from 'actions/model';

export default (state = Immutable.Map({
	fetching: false,
	loaded: false,
	error: null,
}), action) => {
	switch (action.type) {
		case LOAD_MODEL_START:
			return state.merge({
				loaded: false,
				fetching: true,
			});
		case LOAD_MODEL_END:
			return state.merge({
				loaded: true,
				fetching: false,
			});
		case LOAD_MODEL_FAIL:
			return state.merge({
				loaded: true,
				fetching: false,
				error: action.error,
			});
		default:
			return state;
	}
};
