import React                   from 'react';
import { render }              from 'react-dom';
import { Provider }            from 'react-redux';
import { injectGlobal }        from 'styled-components';

import configureStore          from 'store/configureStore'
import App                     from 'containers/App';
import DevTools                from 'containers/DevTools';
import config                  from 'config';

/* Reset global css */
injectGlobal`
	html, body {
		height: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}
`;

render(
	<Provider store={configureStore()}>
		<div>
			<App />
			{ config.debug ? <DevTools /> : null }
		</div>
	</Provider>,
	document.getElementById('root')
);
