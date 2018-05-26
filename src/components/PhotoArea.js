import React, { Component }    from 'react';
import twemoji                 from 'twemoji';
import styled                  from 'styled-components';

class _Field extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<img src={this.props.iconSrc} />
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}

const Field = styled(_Field)`
	display: flex;
	flex-direction: row;
	jusify-content: start;
	align-items: center;
	font-size: 18px;
	line-height: 30px;
	color: #666;

	& > div {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;

		& > a {
			color: #666;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}

		div {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		.emoji {
			width: 20px;
			margin: 0 1px;
			vertical-align: text-bottom;
		}
	}

	& > img {
		height: 28px;
		width: 28px;
		margin: 7px 12px 3px 3px;
		opacity: 0.6;
	}
`;

class _PhotoArea extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<a target="_blank" href={this.props.photoUrl}>
					<img
						ref="photo"
						src={this.props.photoBlob}
						draggable="false"
						onLoad={this.onPhotoLoad.bind(this)}
					/>
				</a>
				<div style={{display: 'none'}} ref="metaCt">
					<Field iconSrc={require('img/icon_user.png')}>
						<a
							target="_blank"
							href={this.props.sourceUrl}
							dangerouslySetInnerHTML={{ __html: twemoji.parse(this.props.sourceName || '', this.emojiFormatter) }}
						/>
					</Field>
					<Field iconSrc={require('img/icon_message.png')}>
						<div dangerouslySetInnerHTML={{ __html: twemoji.parse(this.props.photoCaption || '', this.emojiFormatter) }} />
					</Field>
				</div>
			</div>
		);
	}

	emojiFormatter(icon) {
		return `twemoji/${icon}.png`;
	}

	onPhotoLoad() {
		this.refs.metaCt.style.width = `${this.refs.photo.width}px`;
		this.refs.metaCt.style.display = 'block';
	}
}

export default styled(_PhotoArea)`
	padding: 15px;
	background-color: white;
	border: solid 1px #eee;
	text-align: center;
	border-radius: 3px;
	box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
	transform: rotate(-2deg);

	& > a {
		outline: none;

		&:hover {
			opacity: 0.9;
		}

		& > img {
			height: calc(100% - 80px);
			border-radius: 3px;
			margin-bottom: 8px;
		}
	}
`;
