import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import styled                  from 'styled-components';

import {
	SETTINGS_PANEL_CLOSE,
}                              from 'actions/settingsPanel';
import PhotoBackground         from 'components/PhotoBackground';
import PhotoArea               from 'components/PhotoArea';
import WidgetWrapper           from 'components/WidgetWrapper';

const MainLayout = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	z-index: 1;

	${PhotoBackground} {
		z-index: 2;
	}

	${PhotoArea} {
		height: 80%;
		margin: 0 30px;
		z-index: 3;
	}

	${WidgetWrapper} {
		min-width: 320px;
		height: 90%;
		margin-left: 4%;
		z-index: 3;
	}
`;

class MainContainer extends Component {
	render() {
		return (
			<MainLayout>
				<PhotoBackground
					photoBlob={this.props.photoBlob}
					onClick={this.onClickPhotoBackground.bind(this)}
				/>
				<PhotoArea
					photoBlob={this.props.photoBlob}
					photoUrl={this.props.photoUrl}
					photoCaption={this.props.photoCaption}
					sourceName={this.props.sourceName}
					sourceUrl={this.props.sourceUrl}
				/>
				<WidgetWrapper />
			</MainLayout>
		);
	}

	onClickPhotoBackground() {
		if (this.props.settingsOpened) {
			this.props.actions.closeSettings();
		}
	}
}

const mapStateToProps = state => {
	return {
		settingsOpened: state.getIn(['settingsPanel', 'open']),
		photoBlob:      state.getIn(['crawl', 'photoBlob']),
		photoUrl:       state.getIn(['crawl', 'photoUrl']),
		photoCaption:   state.getIn(['crawl', 'photoCaption']),
		sourceName:     state.getIn(['crawl', 'sourceName']),
		sourceUrl:      state.getIn(['crawl', 'sourceUrl']),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({
			closeSettings: () => {
				return { type: SETTINGS_PANEL_CLOSE };
			},
		}, dispatch),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainContainer);
