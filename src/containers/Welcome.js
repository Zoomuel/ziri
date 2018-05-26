import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { TransitionGroup }     from 'react-transition-group';
import { bindActionCreators }  from 'redux';
import PropTypes               from 'prop-types';
import styled                  from 'styled-components';
import transition              from 'styled-transition-group';

import {
	AskName,
	Tutorial,
}                              from 'components/Welcome';
import {
	SETTINGS_PANEL_CLOSE,
}                              from 'actions/settingsPanel';
import { setSettings }         from 'actions/settings';

const Mask = transition.div.attrs({
	unmountOnExit: true,
	timeout: 500,
})`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.85);

	&:exit {
		opacity: 1;
	}

	&:exit-active {
		opacity: 0.01;
		transition: opacity 500ms ease-out;
	}
`;

class Welcome extends Component {
	static propTypes = {
		userName: PropTypes.string.isRequired,
		step: PropTypes.string.isRequired,
		show: PropTypes.bool.isRequired,
		actions: PropTypes.shape({
			setSettings: PropTypes.func.isRequired,
		}),
	}

	onSubmitName(userName) {
		if (userName && !this.props.userName) {
			this.props.actions.setSettings({ userName });
		}
	}

	onDoneTutorial() {
		this.props.actions.setSettings({ initialized: true });
	}

	render() {
		return (
			<Mask in={this.props.show}>
				<TransitionGroup>
					<AskName
						show={this.props.step === 'askName'}
						onSubmitName={this.onSubmitName.bind(this)}
					/>
					<Tutorial
						show={this.props.step === 'tutorial'}
						onClickButton={this.onDoneTutorial.bind(this)}
						onClick={this.onClickTutorialBackground.bind(this)}
					/>
				</TransitionGroup>
			</Mask>
		);
	}

	onClickTutorialBackground() {
		if (this.props.settingsOpened) {
			this.props.actions.closeSettings();
		}
	}
}

const mapStateToProps = state => {
	const loaded = state.getIn(['model', 'loaded']);
	const initialized = state.getIn(['settings', 'initialized']);
	const userName = state.getIn(['settings', 'userName']);

	return {
		initialized,
		userName,
		show: (!initialized && !!loaded),
		step: userName ? 'tutorial' : 'askName',
		settingsOpened: state.getIn(['settingsPanel', 'open']),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({
			setSettings,
			closeSettings: () => {
				return { type: SETTINGS_PANEL_CLOSE };
			},
		}, dispatch),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Welcome);
