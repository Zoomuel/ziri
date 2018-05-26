import Immutable               from 'immutable';

import { LOAD_MODEL_END }      from 'actions/model';

export default (state = Immutable.fromJS({
	photoBlob: '',
	photoCaption: '',
	photoUrl: undefined,
	sourceName: '',
	sourceUrl: undefined,
	subscriptions: [],
}), action) => {
	switch (action.type) {
		case LOAD_MODEL_END:
			return state.merge(action.result.crawl);
		default:
			return state;
	}
};
