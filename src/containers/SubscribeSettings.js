import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import styled                  from 'styled-components';

import SettingTitle            from 'components/SettingTitle';
import SettingDescription      from 'components/SettingDescription';
import SettingNumericField     from 'components/SettingNumericField';
import SettingSubscribeField   from 'components/SettingSubscribeField';
import SettingSubscribeList    from 'components/SettingSubscribeList';
import {
	setSettings,
	addSubscription,
	delSubscription,
}                              from 'actions/settings';

class SubscribeSettings extends Component {
	render() {
		return (
			<div>
				<SettingTitle>
					{chrome.i18n.getMessage('subscriptions')}
				</SettingTitle>
				<SettingDescription>
					{chrome.i18n.getMessage('subscriptions_desc')}
				</SettingDescription>
				<SettingNumericField
					min={0}
					max={1440}
					value={this.props.photoChangeInterval}
					fieldName={chrome.i18n.getMessage('photo_change_interval')}
					onChange={this.onAdjustRenewInterval.bind(this)}
				/>
				<SettingSubscribeField
					fieldName={chrome.i18n.getMessage('photo_subscribe_source')}
					onAdd={this.props.actions.addSubscription}
				/>
				<SettingSubscribeList
					subscriptions={this.props.subscriptions}
					onDel={this.props.actions.delSubscription}
				/>
			</div>
		);
	}

	onAdjustRenewInterval(v) {
		this.props.actions.setSettings({ photoChangeInterval: v });
	}
}

const mapStateToProps = state => {
	return {
		subscriptions: state.getIn(['settings', 'subscriptions']).toJS(),
		photoChangeInterval: state.getIn(['settings', 'photoChangeInterval']),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({
			addSubscription,
			delSubscription,
			setSettings,
		}, dispatch),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SubscribeSettings);
