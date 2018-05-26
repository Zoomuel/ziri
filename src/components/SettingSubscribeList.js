import React, { Component }    from 'react';
import NumericInput            from 'react-numeric-input';
import styled                  from 'styled-components';

const Source = styled.div`
	width: 120px;
`;

const ID = styled.div`
	flex: 1;
`;

const DeleteBtn = styled.button`
	width: 80px;
	background: transparent;
	border: none;
	outline: none;
	border-radius: 6px;
`;

class _SubscribeItem extends Component {
	render() {
		const { src, id } = this.props.data;

		return (
			<div className={this.props.className}>
				<Source>{src}</Source>
				<ID>{id}</ID>
				<DeleteBtn onClick={this.onClickDelBtn.bind(this)}>
					{chrome.i18n.getMessage('photo_subscribe_del')}
				</DeleteBtn>
			</div>
		);
	}

	onClickDelBtn() {
		this.props.onClickDelBtn(this.props.data);
	}
}

const SubscribeItem = styled(_SubscribeItem)`
	display: flex;
	flex-direction: row;
	jusify-content: start;
	align-items: center;
	margin: 4px 0;
	border-bottom: solid 1px #333;

	&:last-child {
		border-bottom: none;
	}

	& > * {
		font-size: 14px;
		padding: 0 8px;
		box-sizing: border-box;
		color: #eeeeee;
		cursor: default;
		height: 28px;
		line-height: 28px;
	}

	&:hover {
		border-radius: 6px;
		border-bottom-color: transparent;
		background: rgba(255, 255, 255, 0.1);
	}

	${DeleteBtn} {
		color: #666666;
		cursor: pointer;

		&:hover {
			color: #eeeeee;
			background: rgba(255, 255, 255, 0.2);
		}

		&:active {
			color: #eeeeee;
			background: rgba(255, 255, 255, 0.3);
		}
	}
`;

class _SettingSubscribeList extends Component {
	render() {
		return (
			<div className={this.props.className}>
				{this.props.subscriptions.map((s, i) => (
					<SubscribeItem
						key={i}
						data={s}
						onClickDelBtn={this.props.onDel}
					/>
				))}
			</div>
		);
	}
}

export default styled(_SettingSubscribeList)`
`;
