import React, { Component }    from 'react';
import styled                  from 'styled-components';

class _PhotoBackground extends Component {
	render() {
		return (
			<div
				style={{ backgroundImage: `url(${this.props.photoBlob})` }}
				className={this.props.className}
				onClick={this.props.onClick}
			>
				<img src={require('img/button_shadow.png')} />
			</div>
		);
	}
}

export default styled(_PhotoBackground)`
	position: fixed;
	top: -20px;
	bottom: -20px;
	left: -20px;
	right: -20px;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	user-select: none;
	filter: blur(10px);
	z-index: 1;

	& > img {
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
`;
