import {
	CODE,
	ZiriError,
}                              from 'sdk/error';
import sdkUtils                from 'sdk/utils';

const SRC = 'Instagram';

export default class InstagramCrawler {
	constructor({
		id,
		photos = [],
	}) {
		Object.assign(this, {
			id, photos,
			link: `https://www.instagram.com/${encodeURIComponent(id)}`,
		});
	}

	get src() {
		return SRC;
	}

	getOne() {
		let notShowed = null;

		// Find not showed this turn
		this.photos.every((photo) => {
			if (!photo.showed) {
				notShowed = photo;
				return false;
			}
			return true;
		});

		// Reset if all photo were showed except first one
		if (!notShowed) {
			this.photos.forEach((photo) => {
				photo.showed = false;
			});
			this.photos[0].showed = true;
			notShowed = this.photos[0];
		}

		// Mark showed
		notShowed.showed = true;
		localStorage.setItem('firstShow', Date.now());

		return {
			sourceName: this.userName,
			sourceUrl: this.link,
			...notShowed
		};
	}

	empty() {
		return 0 === this.photos.length;
	}

	async refill() {
		sdkUtils.debug(`Refilling crawler: ${SRC}:${this.id}`);

		// From: https://github.com/NRandall/igjs
		try {
			const me = this;

			// Fetch raw page
			const rawBody = await new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();

				xhr.open("GET", me.link);
				xhr.onload = () => resolve(xhr.responseText);
				xhr.onerror = () => reject(xhr.statusText);
				xhr.send();
			});

			// Parse it
			const d = JSON.parse(rawBody.split('window._sharedData = ')[1].split('\;\<\/script>')[0]);
			const user = d.entry_data.ProfilePage[0].graphql.user;

			// Retrieve posts
			for (const p of user.edge_owner_to_timeline_media.edges) {
				let blob, caption;

				// Skip video
				if (p.node.is_video) {
					continue;
				}

				// Get first caption
				try {
					caption = p.node.edge_media_to_caption.edges[0].node.text;
				} catch (e) {
				}

				// Get photo blob
				try {
					blob = await sdkUtils.getPhotoBlob(p.node.display_url);
				} catch (e) {
					sdkUtils.error(`Failed to get blob from ${p.node.shortcode}`, e);
				}

				me.photos.push({
					photoBlob: blob,
					photoCaption: caption || '-',
					photoUrl: `https://www.instagram.com/p/${p.node.shortcode}`,
				});
			}

			me.userName = user.full_name || me.id;
		} catch (e) {
			sdkUtils.debug(`Failed to crawl ${SRC}`, e);
		}

		if (0 === this.empty()) {
			sdkUtils.debug(`Crawler[${SRC}:${this.id}] got no photo!`);
		}

		sdkUtils.debug(`Refilled crawler: ${SRC}:${this.id}`);
	}
};
