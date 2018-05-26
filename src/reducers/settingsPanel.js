import Immutable               from 'immutable';

import {
	SETTINGS_PANEL_OPEN,
	SETTINGS_PANEL_CLOSE,
	SETTINGS_PANEL_SET_TAB,
}                              from 'actions/settingsPanel';

export default (state = Immutable.Map({
	open: false,
	tab: 'tab-subscriptions',
}), action) => {
	switch (action.type) {
		case SETTINGS_PANEL_OPEN:
			return state.set('open', true);
		case SETTINGS_PANEL_CLOSE:
			return state.set('open', false);
		case SETTINGS_PANEL_SET_TAB:
			return state.set('tab', action.tab);
		default:
			return state;
	}
};
