import React, { Component }    from 'react';
import styled                  from 'styled-components';

class _AboutSettings extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<div className="logo-ct">
					<img src={require('icon64.png')} draggable="false" />
				</div>
				<div className="app-name-ct">
					{chrome.i18n.getMessage('app_name')}
				</div>
				<div className="app-version-ct">
					{`v${chrome.runtime.getManifest().version}`}
				</div>
				<div className="app-desc-ct">
					{chrome.i18n.getMessage('app_description')}
				</div>
				<div className="acknowledge-ct">
					{chrome.i18n.getMessage('acknowledge_desc')}
					<ul>
						{
							[{
								name: 'IgJs',
								url: 'https://github.com/NRandall/igjs',
								desc: 'Javascript Instagram Scraper',
							}, {
								name: 'React-Clock',
								url: 'https://github.com/wojtekmaj/react-clock',
								desc: 'Highly customizable analog clock',
							}, {
								name: 'Twitter Emoji',
								url: 'https://github.com/twitter/twemoji',
								desc: 'Replace unicode emoji with twitter emoji images'
							}, {
								name: 'Icons8',
								url: 'https://icons8.com/',
								desc: 'Great icons',
							}, {
								name: 'EmojiOne',
								url: 'https://www.emojione.com/',
								desc: 'Great emoji',
							}].map(({ name, url, desc }, i) => {
								return (
									<li key={i}>
										<a target="_blank" href={url}>{name}</a>
										<br />
										<span>{desc}</span>
									</li>
								);
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default styled(_AboutSettings)`
	color: #eeeeee;
	text-align: center;

	.logo-ct {
		margin-top: 30px;
	}

	.app-name-ct {
		margin-top: 8px;
		font-size: 18px;
		font-weight: bold;
	}

	.app-desc-ct {
		margin-top: 6px;
		font-size: 14px;
		color: #aaaaaa;
	}

	.app-version-ct {
		margin-top: 4px;
		color: #aaaaaa;
		font-size: 12px;
	}

	.acknowledge-ct {
		margin-top: 12px;
		padding-top: 16px;
		border-top: solid 1px #666666;
		font-size: 14px;
		text-align: left;

		ul {
			padding-left: 30px;
			margin: 10px 0;

			li {
				line-height: 26px;
			}
		}
	}

	a {
		color: #eeeeee;
		font-weight: bold;
	}
`;
