import { combineReducers }     from 'redux-immutable';

import model                   from './model';
import crawl                   from './crawl';
import todo                    from './todo';
import settings                from './settings';
import settingsPanel           from './settingsPanel';

export default combineReducers({
	model,
	crawl,
	todo,
	settings,
	settingsPanel,
});
