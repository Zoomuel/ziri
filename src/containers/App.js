import React, { Component }    from 'react';
import PropTypes               from 'prop-types';
import { connect }             from 'react-redux';
import styled                  from 'styled-components';

import ContactUs               from 'components/ContactUs';
import LoadingMask             from 'containers/LoadingMask';
import Welcome                 from 'containers/Welcome';
import Settings                from 'containers/Settings';
import MainContainer           from 'containers/MainContainer';
import { loadModel }           from 'actions/model';

class App extends Component {
	static propTypes = {
		dispatch: PropTypes.func.isRequired,
	}

	render() {
		return (
			<div>
				<LoadingMask />
				<Welcome />
				<MainContainer />
				{
					this.props.initialized ? (
						<div>
							<Settings />
							<ContactUs />
						</div>
					) : null
				}
			</div>
		);
	}

	componentDidMount() {
		this.props.dispatch(loadModel());
	}
}

const mapStateToProps = state => {
	return {
		initialized: state.getIn(['settings', 'initialized']),
	};
};

export default connect(mapStateToProps)(App);
