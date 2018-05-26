import React, { Component }    from 'react';
import Toggle                  from 'react-toggle';
import styled                  from 'styled-components';

import 'react-toggle/style.css';

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

const StyledToggle = styled(Toggle)`
	&.react-toggle--focus {
		.react-toggle-thumb {
			box-shadow: 0px 0px 2px 3px rgba(255, 255, 255, 0.5);
		}
	}

	&:active:not(.react-toggle--disabled) {
		.react-toggle-thumb {
			box-shadow: 0px 0px 5px 5px rgba(255, 255, 255, 0.5);
		}
	}
`;

class _SettingToggleField extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<FieldName fieldName={`${this.props.fieldName}:`} />
				<StyledToggle
					icons={false}
					defaultChecked={this.props.value}
					onChange={this.onChange.bind(this)}
				/>
			</div>
		);
	}

	onChange(e) {
		this.props.onChange(e.target.checked);
	}
}

export default styled(_SettingToggleField)`
	display: flex;
	flex-direction: row;
	jusify-content: start;
	align-items: center;
	border-top: solid 1px #666;
	padding: 8px 0;
	height: 32px;
`;
