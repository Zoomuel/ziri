import React, { Component }    from 'react';
import NumericInput            from 'react-numeric-input';
import styled                  from 'styled-components';

import sdkUtils                from 'sdk/utils';

const _FieldName = ({ className, fieldName }) => (
	<div className={className}>
		{fieldName}
	</div>
);

const FieldName = styled(_FieldName)`
	flex: 1;
	color: #eeeeee;
	font-size: 14px;
	padding: 6px 0px;
`;

class _CompositeField extends Component {
	render() {
		return (
			<form
				className={this.props.className}
				onSubmit={this.onAdd.bind(this)}
			>
				<select ref="src" defaultValue="Instagram">
					<option value="Instagram">Instagram</option>
				</select>
				<input ref="id" type="text"
					placeholder={chrome.i18n.getMessage('photo_subscribe_placeholder')} />
				<button onClick={this.onAdd.bind(this)}>
					{chrome.i18n.getMessage('photo_subscribe_add')}
				</button>
			</form>
		);
	}

	onAdd(e) {
		e.preventDefault();

		const src = (this.refs.src.value || '').trim();
		const id = (this.refs.id.value || '').trim();

		if (!id || !src) {
			return;
		}

		this.refs.id.value = '';
		this.props.onAdd({ src, id });
	}
}

const CompositeField = styled(_CompositeField)`
	display: flex;
	flex-direction: row;
	jusify-content: start;
	align-items: center;
	padding: 8px 0 4px;

	& > * {
		height: 32px;
		color: #eeeeee;
		background-color: transparent;
		border: solid 1px #eeeeee;
		outline: none;
		font-size: 14px;
	}

	& > select {
		width: 120px;
		border-bottom-left-radius: 6px;
		border-top-left-radius: 6px;
		padding: 0 4px;
		cursor: pointer;
		font-size: 14px;

		option {
			color: #666666;
		}

		&:hover {
			background: rgba(255, 255, 255, 0.2);
		}

		&:active {
			background: rgba(255, 255, 255, 0.3);
		}
	}

	& > input {
		flex: 1;
		box-sizing: border-box;
		border-left: none;
		border-right: none;
		padding: 0 8px;
	}

	& > button {
		width: 80px
		cursor: pointer;
		border-top-right-radius: 6px;
		border-bottom-right-radius: 6px;

		&:hover {
			background: rgba(255, 255, 255, 0.2);
		}

		&:active {
			background: rgba(255, 255, 255, 0.3);
		}
	}
`;

class _SettingSubscribeField extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<FieldName fieldName={`${this.props.fieldName}:`} />
				<CompositeField onAdd={this.props.onAdd} />
			</div>
		);
	}
}

export default styled(_SettingSubscribeField)`
	border-top: solid 1px #666;
	padding: 8px 0 2px;
`;
