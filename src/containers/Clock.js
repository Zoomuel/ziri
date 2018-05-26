import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import Clock                   from 'react-clock';
import styled                  from 'styled-components';

const StyledClock = styled(Clock)`
	min-height: 270px;

	.react-clock__face {
		background-color: rgba(255, 255, 255, 0.6);
		border: solid 4px rgba(0, 0, 0, 0.1);
		box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.6);
	}

	.react-clock__hour-hand__body, .react-clock__minute-hand__body {
		background-color: #222222;
	}

	.react-clock__second-hand__body {
		background-color: #cc0000;
	}

	.react-clock__mark__body {
		color: #222222;
	}

	.react-clock__second-hand {
		transition: transform cubic-bezier(0.68, 0, 0.27, 1.55) 0.2s;
	}

	.react-clock__mark__number {
		font-size: 26px;
		color: #222222;
	}
`;

class ClockWrapper extends Component {
	state = {
		date: new Date(),
	}

	render() {
		return (
			<StyledClock
				size={270}
				hourHandWidth={8}
				minuteHandWidth={5}
				secondHandWidth={2}
				secondHandLength={85}
				secondHandOppositeLength={20}
				renderNumbers={this.props.showNumber}
				renderSecondHand={this.props.showSecond}
				value={this.state.date}
			/>
		);
	}

	componentDidMount() {
		setInterval(
			() => this.setState({ date: new Date() }),
			1000
		);
	}
}

const mapStateToProps = state => {
	return {
		showNumber: state.getIn(['settings', 'showClockNumber']),
		showSecond: state.getIn(['settings', 'showClockSecond']),
	};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClockWrapper);
