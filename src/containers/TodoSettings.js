import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import styled                  from 'styled-components';

import SettingTitle            from 'components/SettingTitle';
import SettingDescription      from 'components/SettingDescription';
import SettingToggleField      from 'components/SettingToggleField';
import { setSettings }         from 'actions/settings';

class TodoSettings extends Component {
	render() {
		return (
			<div>
				<SettingTitle>
					{chrome.i18n.getMessage('todo')}
				</SettingTitle>
				<SettingDescription>
					{chrome.i18n.getMessage('todo_desc')}
				</SettingDescription>
				<SettingToggleField
					value={this.props.autoClean}
					fieldName={chrome.i18n.getMessage('todo_auto_clean')}
					onChange={this.onAdjustAutoClean.bind(this)}
				/>
			</div>
		);
	}

	onAdjustAutoClean(v) {
		this.props.actions.setSettings({ autoCleanTodo: v });
	}
}

const mapStateToProps = state => {
	return {
		autoClean: state.getIn(['settings', 'autoCleanTodo']),
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
)(TodoSettings);
