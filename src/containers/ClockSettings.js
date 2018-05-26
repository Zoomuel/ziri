import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import styled                  from 'styled-components';

import SettingTitle            from 'components/SettingTitle';
import SettingDescription      from 'components/SettingDescription';
import SettingToggleField      from 'components/SettingToggleField';
import { setSettings }         from 'actions/settings';

class ClockSettings extends Component {
	render() {
		return (
			<div>
				<SettingTitle>
					{chrome.i18n.getMessage('clock')}
				</SettingTitle>
				<SettingDescription>
					{chrome.i18n.getMessage('clock_desc')}
				</SettingDescription>
				<SettingToggleField
					value={this.props.showClockNumber}
					fieldName={chrome.i18n.getMessage('clock_show_number')}
					onChange={this.onAdjustShowNumber.bind(this)}
				/>
				<SettingToggleField
					value={this.props.showClockSecond}
					fieldName={chrome.i18n.getMessage('clock_show_second')}
					onChange={this.onAdjustShowSecond.bind(this)}
				/>
			</div>
		);
	}

	onAdjustShowNumber(v) {
		this.props.actions.setSettings({ showClockNumber: v });
	}

	onAdjustShowSecond(v) {
		this.props.actions.setSettings({ showClockSecond: v });
	}
}

const mapStateToProps = state => {
	return {
		showClockNumber: state.getIn(['settings', 'showClockNumber']),
		showClockSecond: state.getIn(['settings', 'showClockSecond']),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({
			setSettings,
		}, dispatch),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ClockSettings);
