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
	padding: 4px 0px;
`;

const StyledNumericInput = styled(NumericInput)`
	width: 80px;
	height: 32px;
	padding: 6px 12px;
	background-color: transparent;
	color: #eeeeee;
	outline: none;
`;

class _SettingNumericField extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<FieldName fieldName={`${this.props.fieldName}:`} />
				<StyledNumericInput
					mobile
					strict={true}
					min={this.props.min}
					max={this.props.max}
					value={this.props.value}
					onChange={this.onChange.bind(this)}
					style={{
						plus: {
							background: '#eeeeee',
						},
						minus: {
							background: '#eeeeee',
						},
						btn: {
							cursor: 'pointer',
							background : 'transparent',
							transition : 'unset',
						},
						'btn:hover': {
							background : 'rgba(255, 255, 255, 0.2)',
						},
						'btn:active': {
							background : 'rgba(255, 255, 255, 0.3)',
						},
						'input.mobile': {
							border: 'solid 1px #eeeeee',
							borderRadius: 6,
						},
					}}
				/>
			</div>
		);
	}

	onChange(v) {
		sdkUtils.waitForFinalEvent(() => {
			this.props.onChange(sdkUtils.forceRange(v, {
				min: this.props.min,
				max: this.props.max,
			}));
		}, 500, `numeric_field_event_${this.props.fieldName}`);
	}
}

export default styled(_SettingNumericField)`
	display: flex;
	flex-direction: row;
	jusify-content: start;
	align-items: center;
	border-top: solid 1px #666;
	padding: 8px 0;
`;
