import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { TransitionGroup }     from 'react-transition-group';
import styled, { keyframes }   from 'styled-components';
import transition              from 'styled-transition-group';

const blink = keyframes`
	0%, 100% {
		opacity: 0.2;
	}
	20% {
		opacity: 1;
	}
`;

const BlinkItem = styled.span`
	animation-name: ${blink};
	animation-duration: 1.4s;
	animation-iteration-count: infinite;
	animation-fill-mode: both;

	&:nth-child(2) {
		animation-delay: 0.2s;
	}

	&:nth-child(3) {
		animation-delay: 0.4s;
	}
`;

const Blink = styled.div`
	display: inline-block;

	${BlinkItem}
`;

const Text = styled.div`
	position: absolute;
	right: 20px;
	bottom: 20px;
	font-size: 18px;
	font-style: italic;
	color: #888888;

	& > span {
		margin-right: 5px;
	}

	${Blink}
`;

const Mask = transition.div.attrs({
	unmountOnExit: true,
	timeout: 1200,
})`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1000;
	background-color: white;

	&:exit {
		opacity: 1;
	}

	&:exit-active {
		opacity: 0;
		transition: opacity 800ms cubic-bezier(0.22, 0.61, 0.36, 1);
		pointer-events: none;
	}

	${Text}
`;

class LoadingMask extends Component {
	render() {
		return (
			<Mask in={this.props.show}>
				<Text>
					<span>{'Loading'}</span>
					<Blink>
						<BlinkItem>{'.'}</BlinkItem>
						<BlinkItem>{'.'}</BlinkItem>
						<BlinkItem>{'.'}</BlinkItem>
					</Blink>
				</Text>
			</Mask>
		);
	}
}

const mapStateToProps = state => {
	return {
		show: !state.getIn(['model', 'loaded']),
	};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoadingMask);
