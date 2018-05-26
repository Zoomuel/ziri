import Immutable               from 'immutable';

import { LOAD_MODEL_END }      from 'actions/model';
import {
	SET_ITEMS_START,
	SET_ITEMS_END,
	SET_ITEMS_FAIL,
	SET_EDITING,
}                              from 'actions/todo';

export default (state = Immutable.fromJS({
	items: [],
	editing: -1,
}), action) => {
	switch (action.type) {
		case LOAD_MODEL_END:
			return state.merge(action.result.todo);
		case SET_ITEMS_START:
			return state.set('items', Immutable.fromJS(action.payload));
		case SET_ITEMS_END:
			return state.set('items', Immutable.fromJS(action.result));
		case SET_EDITING:
			return state.set('editing', action.editing);
		default:
			return state;
	}
};
