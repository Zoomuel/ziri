import React, { Component }    from 'react';
import { connect }             from 'react-redux';
import { Scrollbars }          from 'react-custom-scrollbars';
import {
	SortableContainer,
	SortableElement,
	arrayMove,
}                              from 'react-sortable-hoc';
import { bindActionCreators }  from 'redux';
import styled                  from 'styled-components';

import {
	setItems,
	SET_EDITING,
}                              from 'actions/todo';

class _TodoItem extends Component {
	render() {
		return (
			<div
				itemidx={this.props.itemidx}
				className={this.props.className}
				onDoubleClick={this.onDoubleClick.bind(this)}
			>
				<div>
					<input
						type="checkbox"
						checked={this.props.data.completed}
						onChange={this.onChangeCompleted.bind(this)}
					/>
				</div>
				{ !this.props.editing ? (
					<div>
						{this.props.data.content}
					</div>
				): null }
				{ !this.props.editing ? (
					<div>
						<button purpose="edit" type="button" onClick={this.onClickEdit.bind(this)} />
					</div>
				): null }
				{ this.props.editing ? (
					<div>
						<input
							type="text"
							ref="content"
							defaultValue={this.props.data.content}
							onBlur={this.onBlur.bind(this)}
							onKeyPress={this.onKeyPress.bind(this)}
						/>
					</div>
				) : null }
				<div>
					<button purpose="delete" type="button" onClick={this.onClickDel.bind(this)} />
				</div>
			</div>
		);
	}

	componentDidUpdate() {
		if (this.props.editing) {
			this.refs.content.focus();
		}
	}

	onChangeCompleted(e) {
		this.props.onChangeCompleted(this.props.itemidx, e.target.checked);
	}

	onClickDel(e) {
		this.props.onClickDel(this.props.itemidx);
	}

	onClickEdit(e) {
		this.props.onClickEdit(this.props.itemidx);
	}

	onDoubleClick(e) {
		this.props.onClickEdit(this.props.itemidx);
	}

	onBlur(e) {
		this.props.onChangeContent(this.props.itemidx, e.target.value);
	}

	onKeyPress(e) {
		if (e.key === 'Enter') {
			this.props.onChangeContent(this.props.itemidx, e.target.value);
		}
	}
}

const _SortableTodoItem = SortableElement(_TodoItem);
const TodoItem = styled(_SortableTodoItem)`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: start;
	padding: 5px 10px;
	font-size: 16px;
	min-height: 24px;
	line-height: 22px;
	z-index: 3;
	color: #666666;

	& > div {
		&:nth-child(1) {
			width: 20px;
			text-align: right;
			padding-right: 4px;

			& > input {
				vertical-align: middle;
			}
		}

		&:nth-child(2) {
			flex: 1;
			cursor: default;
			text-decoration: ${ props => props.data.completed ? 'line-through' : 'none' };
			font-family: Arial, Helvetica, sans-serif;
			height: 24px;
			line-height: 26px;
			padding-left: ${ props => props.editing ? '0' : '3px' };
			user-select: none;

			input {
				border: none;
				padding: 3px;
				font-size: 16px;
				border-radius: 5px;
				width: calc(100% - 3px);
				box-sizing: border-box;
				color: #666666;
				outline: none;
			}
		}

		&:nth-child(3), &:nth-child(4) {
			width: 24px;
		}

		button {
			background-color: transparent;
			background-position: center;
			background-repeat: no-repeat;
			background-size: 12px 12px;
			width: 20px;
			height: 20px;
			outline: none;
			border: solid 1px transparent;
			border-radius: 50%;
			vertical-align: middle;
			opacity: 0;
			cursor: pointer;

			&[purpose=edit] {
				background-image: ${`url(${require('img/icon_edit.png')})`};
			}

			&[purpose=delete] {
				background-image: ${`url(${require('img/icon_delete.png')})`};
			}
		}
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.025);

		& > div {
			&:nth-child(3), &:nth-child(4) {
				& > button {
					opacity: 0.4;

					&:hover {
						border-color: black;
						opacity: 0.5;
					}

					&:active {
						opacity: 0.8;
					}
				}
			}
		}
	}

	&.sorting {
		border-radius: 5px;
		background-color: #fff3c0;
		box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.7);
		cursor: move;
	}
`;

class _ItemList extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<Scrollbars style={{ height: '100%' }}>
					{this.props.items.map((item, i) => (
						<TodoItem
							index={i}
							key={i}
							itemidx={i}
							data={item}
							editing={i === this.props.editing}
							onClickDel={this.props.onDel}
							onClickEdit={this.props.onStartEdit}
							onChangeCompleted={this.props.onSetCompleted}
							onChangeContent={this.props.onSetContent}
						/>
					))}
				</Scrollbars>
			</div>
		);
	}
}

const _SortableItemList = SortableContainer(_ItemList);
const ItemList = styled(_SortableItemList)`
	height: calc(100% - 80px);
`;

class _ContentCt extends Component {
	render() {
		return (
			<div className={this.props.className}>
				{this.props.children}
			</div>
		);
	}
}

const ContentCt = styled(_ContentCt)`
	background-color: #fff3c0;
	box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.7);

	& > form {
		height: 100%;

		& > input {
			height: 40px;
			width: calc(100% - 30px);
			margin: 15px 15px 10px;
			padding: 0 22px;
			color: #666666;
			border: none;
			border-bottom: solid 1px rgba(0, 0, 0, 0.2);
			background-color: transparent;
			outline: none;
			box-sizing: border-box;
			font-size: 16px;
			font-family: Arial, Helvetica, sans-serif;

			&::placeholder {
				color: #666666;
			}
		}
	}
`;

class _TodoList extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<ContentCt>
					<form onSubmit={this.onAdd.bind(this)} >
						<input
							type="text"
							ref="content"
							placeholder={chrome.i18n.getMessage('todo_new')}
						/>
						<ItemList
							items={this.props.items}
							editing={this.props.editing}
							onDel={this.onDel.bind(this)}
							onStartEdit={this.onStartEdit.bind(this)}
							onSetCompleted={this.onSetCompleted.bind(this)}
							onSetContent={this.onSetContent.bind(this)}
							onSortEnd={this.onSortEnd.bind(this)}
							shouldCancelStart={this.shouldCancelStart.bind(this)}
							pressDelay={150}
							helperClass={'sorting'}
						/>
					</form>
				</ContentCt>
			</div>
		);
	}

	shouldCancelStart(e) {
		const disabledElements = ['input', 'textarea', 'select', 'option', 'button'];

		if (disabledElements.indexOf(e.target.tagName.toLowerCase()) !== -1) {
			return true;
		}

		return -1 !== this.props.editing;
	}

	onSortEnd({ oldIndex, newIndex }) {
		if (oldIndex !== newIndex) {
			this.props.actions.setItems(arrayMove([...this.props.items], oldIndex, newIndex));
		}
	}

	onAdd(e) {
		e.preventDefault();

		const content = this.refs.content.value.trim();

		if (!content) {
			return;
		}

		this.refs.content.value = '';
		this.props.actions.setItems([...this.props.items, {
			content,
			completed: false,
		}]);
	}

	onDel(idx) {
		const tmpItems = [...this.props.items];

		tmpItems.splice(idx, 1);

		this.props.actions.setItems(tmpItems);
	}

	onStartEdit(idx) {
		this.props.actions.setEditing(idx);
	}

	onSetCompleted(idx, completed) {
		const tmpItems = [...this.props.items];

		(tmpItems[idx] || {}).completed = completed;

		this.props.actions.setItems(tmpItems);
	}

	onSetContent(idx, content) {
		const tmpItems = [...this.props.items];

		(tmpItems[idx] || {}).content = content;

		this.props.actions.setEditing(-1);
		this.props.actions.setItems(tmpItems);
	}
}

const TodoList = styled(_TodoList)`
	box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.6);
	transform: rotate(2.5deg);
	background-color: #fff8b0;

	${ContentCt} {
		width: 100%;
		height: 100%;
		transform: rotate(-2.5deg);
	}
`;

const mapStateToProps = state => {
	return {
		items: state.getIn(['todo', 'items']).toJS(),
		editing: state.getIn(['todo', 'editing']),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators({
			setItems,
			setEditing: (idx) => {
				return {
					type: SET_EDITING,
					editing: idx,
				};
			},
		}, dispatch),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList);
