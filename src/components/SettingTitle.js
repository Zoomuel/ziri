import React, { Component }    from 'react';
import styled                  from 'styled-components';

const _SettingTitle = ({
	className,
	children,
}) => <div className={className}>{children}</div>;

export default styled(_SettingTitle)`
	font-size: 16px;
	color: #eeeeee;
`;
