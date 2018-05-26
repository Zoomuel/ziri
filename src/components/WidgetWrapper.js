import React, { Component }    from 'react';
import styled                  from 'styled-components';

import Clock                   from 'containers/Clock';
import TodoList                from 'containers/TodoList';

class _WidgetWrapper extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<Clock />
				<TodoList />
			</div>
		);
	}
}

export default styled(_WidgetWrapper)`
	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
	pointer-events: all;

	& > * {
		pointer-events: all;
	}

	${TodoList} {
		flex: 1;
		width: 100%;
		margin-top: 20%;
		max-height: calc(90% - 270px);
	}
`;
