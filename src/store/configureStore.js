import Immutable               from 'immutable'
import { createLogger }        from 'redux-logger';
import thunk                   from 'redux-thunk';
import {
	createStore,
	applyMiddleware,
	compose,
}                              from 'redux';

import DevTools                from 'containers/DevTools';
import asyncTask               from 'middleware/asyncTask';
import rootReducer             from 'reducers';
import config                  from 'config';

const configureStore = (preloadedState = {}) => {
	if (config.debug) {
		return createStore(
			rootReducer,
			Immutable.fromJS(preloadedState),
			compose(
				applyMiddleware(thunk, asyncTask, createLogger({
					stateTransformer: (state) => Immutable.Iterable.isIterable(state) ? state.toJS() : state,
				})),
				DevTools.instrument()
			)
		);
	} else {
		return createStore(
			rootReducer,
			Immutable.fromJS(preloadedState),
			compose(applyMiddleware(thunk, asyncTask))
		);
	}
};

export default configureStore;
