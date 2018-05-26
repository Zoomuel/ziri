import React, { Component }    from 'react';
import styled                  from 'styled-components';

const _SettingDescription = ({
	className,
	children,
}) => <div className={className}>{children}</div>;

export default styled(_SettingDescription)`
	font-size: 12px;
	color: #cccccc;;
	margin: 8px 0 20px;;
`;
