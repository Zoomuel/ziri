import React, { Component }    from 'react';
import styled                  from 'styled-components';
import transition              from 'styled-transition-group';

import ContactUs               from 'components/ContactUs';
import Settings                from 'containers/Settings';

const Tooltip = styled.div`
	position: absolute;
	bottom: 50px;
	border-radius: 5px;
	border: solid 2px #eeeeee;
	padding: 10px 15px;
	font-size: 18px;
	color: #eeeeee;

	&:before {
		content: "";
		position: absolute;
		display: block;
		width: 0;
		bottom: -12px;
		border-style: solid;
		border-color: #eeeeee transparent;
		border-width: 10px 8px 0;
	}
`;

const LeftTooltip = Tooltip.extend`
	left: 8px;

	&:before {
		right: auto;
		left: 5px;
	}
`;

const RightTooltip = Tooltip.extend`
	right: 8px;

	&:before {
		left: auto;
		right: 5px;
	}
`;

const FullPanel = transition.div.attrs({
	unmountOnExit: true,
	timeout: 4000,
})`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	&:enter {
		opacity: 0.01;
	}

	&:enter-active {
		opacity: 1;
		transition: opacity 400ms ease-in;
	}

	&:exit {
		opacity: 1;
	}

	&:exit-active {
		opacity: 0.01;
		transition: opacity 400ms ease-out;
	}
`;

class _AskName extends Component {
	render() {
		return (
			<FullPanel in={this.props.show} className={this.props.className}>
				<h1>
					{chrome.i18n.getMessage('common_ask_name')}
				</h1>
				<form onSubmit={this.onSubmitName.bind(this)}>
					<input type="text" ref="nameField" />
				</form>
			</FullPanel>
		);
	}

	componentDidMount() {
		if (this.refs.nameField) {
			this.refs.nameField.focus();
		}
	}

	onSubmitName(e) {
		e.preventDefault();
		this.props.onSubmitName(this.refs.nameField.value);
	}
}

class _Tutorial extends Component {
	render() {
		return (
			<FullPanel
				in={this.props.show}
				className={this.props.className}
				onClick={this.props.onClick}
			>
				<button onClick={this.onClickButton.bind(this)}>
					{chrome.i18n.getMessage('common_start_now')}
				</button>
				<Settings bright={true} />
				<ContactUs bright={true} />
				<LeftTooltip>{chrome.i18n.getMessage('tooltip_settings_btn')}</LeftTooltip>
				<RightTooltip>{chrome.i18n.getMessage('tooltip_contact_us_btn')}</RightTooltip>
			</FullPanel>
		);
	}

	componentDidMount() {
		if (this.refs.button) {
			this.refs.button.focus();
		}
	}

	onClickButton() {
		this.props.onClickButton();
	}
}

export const AskName = styled(_AskName)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& > h1 {
		color: #eeeeee;
		font-size: 32px;
		margin-top: -5%;
	}

	& > form {
		& > input {
			width: 400px;
			background: none;
			border: none;
			border-bottom: solid 2px #cccccc;
			text-align: center;
			font-size: 26px;
			outline: none;
			color: #eeeeee;
		}
	}
`;

export const Tutorial = styled(_Tutorial)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& > button {
		background: none;
		font-size: 26px;
		padding: 12px 28px;
		border-radius: 5px;
		border: solid 2px #ccc;
		color: #eeeeee;
		outline: none;
		cursor: pointer;
		margin-top: -2%;

		&:hover {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}
`;
