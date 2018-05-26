import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import styled                  from 'styled-components';

import config                  from 'config';

const StyledLink = styled.a`
	position: fixed;
	bottom: 0;
	right: 0;
	padding: 0;
	margin: 10px 12px;
	outline: none;
	cursor: pointer;
	z-index: 2;
	transition: opacity 0.3s ease;
	opacity: ${props => props.bright ? 1 : 0.5};

	&:hover {
		opacity: 1;
	}

	& > img {
		width: 20px;
		height: 20px;
	}
`;

export default ({ bright }) => (
	<StyledLink
		bright={bright}
		href={`mailto:${config.contactMail}`}
		target={undefined}
	>
		<img draggable="false" src={require('img/icon_info.png')} />
	</StyledLink>
);
/*

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactUs);
*/
