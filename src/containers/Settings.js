import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { Scrollbars }          from 'react-custom-scrollbars';
import {
	Tabs,
	Tab,
	TabPanel,
	TabList,
}                              from 'react-web-tabs';
import { bindActionCreators }  from 'redux';
import styled                  from 'styled-components';
import transition              from 'styled-transition-group';

import {
	SETTINGS_PANEL_OPEN,
	SETTINGS_PANEL_CLOSE,
	SETTINGS_PANEL_SET_TAB,
}                              from 'actions/settingsPanel';
import AboutSettings           from 'components/AboutSettings';
import SubscribeSettings       from 'containers/SubscribeSettings';
import ClockSettings           from 'containers/ClockSettings';
import TodoSettings            from 'containers/TodoSettings';

const SettingsContainer = transition.div.attrs({
	unmountOnExit: true,
	timeout: 200,
})`
	position: fixed;
	bottom: 50px;
	left: 8px;
	width: 600px;
	height: 400px;
	background-color: rgba(0, 0, 0, 0.85);
	border-radius: 5px;
	padding: 20px 15px;
	color: #eeeeee;
	box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.5);
	z-index: 2;

	&:before {
		content: "";
		position: absolute;
		display: block;
		width: 0;
		right: auto;
		left: 7px;
		bottom: -10px;
		border-style: solid;
		border-color: rgba(0, 0, 0, 0.8) transparent;
		border-width: 10px 8px 0;
	}

	&:enter {
		opacity: 0.01;
	}

	&:enter-active {
		opacity: 1;
		transition: opacity 100ms ease-in;
	}

	&:exit {
		opacity: 1;
	}

	&:exit-active {
		opacity: 0.01;
		transition: opacity 200ms ease-out;
	}
`;

const OpenButton = styled.button`
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 0;
	margin: 10px 12px;
	cursor: pointer;
	border: none;
	outline: none;
	background: none;
	z-index: 2;
	transition: opacity 0.3s ease;
	opacity: ${props => (props.open || props.bright) ? 1 : 0.5};

	&:hover {
		opacity: 1;
	}

	& > img {
		width: 20px;
		height: 20px;
	}
`;

const StyledTab = styled(Tab)`
	background: transparent;
	border: none;
	font-size: inherit;
	color: #eeeeee;
	cursor: pointer;
	padding: 15px 35px;

	&:focus {
		outline: 0;
	}

	&[aria-selected="false"]:hover {
		background-color: rgba(255, 255, 255, 0.05);
	}

	&[aria-selected="true"] {
		position: relative;
		background-color: rgba(255, 255, 255, 0.1);

		&:after {
			content: '';
			position: absolute;
		}
	}
`;

const StyledTabList = styled(TabList)`
	font-size: 14px;

	&:not([aria-orientation="vertical"]) {
		border-bottom: 1px solid #666666;

		${StyledTab}[aria-selected="true"]:after {
			bottom: -1px;
			left: 0;
			width: 100%;
			border-bottom: 4px solid #eeeeee;
		}
	}

	&[aria-orientation="vertical"] {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		flex-grow: 0;
		border-right: 1px solid #666666;
		margin-right: 1rem;

		${StyledTab}[aria-selected="true"]:after {
			right: -1px;
			top: 0;
			height: 100%;
			border-right: 4px solid #eeeeee;
		}

		${StyledTab} {
			text-align: right;
			border-bottom-left-radius: 3px;
			border-top-left-radius: 3px;
		}
	}
`;

const StyledThumb = styled.div`
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 3px;
	height: 100%;
	width: 100%;
	opacity: 0.5;
	transition: opacity 0.1s ease;
	cursor: move;
`;

const ScrollTrackerSaver = styled.div`
	padding-right: 10px;
`;

const StyledTabPanel = styled(TabPanel)`
	color: #eeeeee;
	padding: 12px 0 10px 10px;
	width: 100%;
`;

class ScrollableTabPanel extends Component {
	renderThumbVertical({ style, ...props }) {
		return (
			<div {...props} style={{ ...style, backgroundColor: 'transparent' }}>
				<StyledThumb />
			</div>
		);
	}

	render() {
		return (
			<StyledTabPanel tabId={this.props.tabId} className={this.props.className}>
				<Scrollbars style={{ height: '100%' }} renderThumbVertical={this.renderThumbVertical}>
					<ScrollTrackerSaver>
						{this.props.children}
					</ScrollTrackerSaver>
				</Scrollbars>
			</StyledTabPanel>
		);
	}
}

const StyledScrollableTabPanel = styled(ScrollableTabPanel)`
	&:hover {
		${StyledThumb} {
			opacity: 1;
		}
	}
`;

const StyledTabs = styled(Tabs)`
	height: 100%;

	&[data-rwt-vertical="true"] {
		display: flex;
	}
`;

class Settings extends Component {
	render() {
		return (
			<div>
				<OpenButton
					bright={this.props.bright}
					open={this.props.open}
					onClick={this.onClickButton.bind(this)}
				>
					<img draggable="false" src={require('img/icon_settings.png')} />
				</OpenButton>
				<SettingsContainer in={this.props.open} onClick={e => e.stopPropagation()}>
					<StyledTabs
						defaultTab={this.props.tab}
						onChange={tab => this.props.actions.switchTab(tab)}
						vertical
					>
						<StyledTabList>
							<StyledTab tabFor="tab-subscriptions">
								{chrome.i18n.getMessage('subscriptions')}
							</StyledTab>
							<StyledTab tabFor="tab-clock">
								{chrome.i18n.getMessage('clock')}
							</StyledTab>
							<StyledTab tabFor="tab-todo">
								{chrome.i18n.getMessage('todo')}
							</StyledTab>
							<StyledTab tabFor="tab-about">
								{chrome.i18n.getMessage('about')}
							</StyledTab>
						</StyledTabList>
						<StyledScrollableTabPanel tabId="tab-subscriptions">
							<SubscribeSettings />
						</StyledScrollableTabPanel>
						<StyledScrollableTabPanel tabId="tab-clock">
							<ClockSettings />
						</StyledScrollableTabPanel>
						<StyledScrollableTabPanel tabId="tab-todo">
							<TodoSettings />
						</StyledScrollableTabPanel>
						<StyledScrollableTabPanel tabId="tab-about">
							<AboutSettings />
						</StyledScrollableTabPanel>
					</StyledTabs>
				</SettingsContainer>
			</div>
		);
	}

	onClickButton() {
		this.props.actions[this.props.open ? 'closeSettings' : 'openSettings']();
	}
}

const mapStateToProps = state => {
	return {
		open: state.getIn(['settingsPanel', 'open']),
		tab: state.getIn(['settingsPanel', 'tab']),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({
			openSettings: () => {
				return { type: SETTINGS_PANEL_OPEN };
			},
			closeSettings: () => {
				return { type: SETTINGS_PANEL_CLOSE };
			},
			switchTab: (tab) => {
				return {
					type: SETTINGS_PANEL_SET_TAB,
					tab,
				};
			},
		}, dispatch),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings);
