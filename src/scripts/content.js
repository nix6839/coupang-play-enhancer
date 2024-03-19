import {
	VIDEO_SEEK_TIME_DEFAULT,
	VIDEO_SEEK_TIME_S_KEY,
} from '../lib/core/storage.ts';

const items = await chrome.storage.sync.get({
	[VIDEO_SEEK_TIME_S_KEY]: VIDEO_SEEK_TIME_DEFAULT,
});

let VIDEO_SEEK_TIME_S = /** @type {number} */ (items[VIDEO_SEEK_TIME_S_KEY]);
const PLAYBACK_SPEED_ADJUSTMENT = 0.25;

chrome.storage.sync.onChanged.addListener((changes) => {
	for (let [key, { newValue }] of Object.entries(changes)) {
		if (key === VIDEO_SEEK_TIME_S_KEY) {
			VIDEO_SEEK_TIME_S = newValue;
		}
	}
});

/** @type {HTMLVideoElement | null} */
let video = null;

/** @type {HTMLDivElement | null} */
let playbackControls = null;

let countdownIsLoaded = false;
let videoIsStarted = false;

const observer = new MutationObserver(() => {
	video = /** @type {HTMLVideoElement | null} */ (
		document.getElementById('vjs_video_3_html5_api')
	);
	playbackControls = /** @type {HTMLDivElement | null} */ (
		document
			.getElementsByClassName('PlaybackControls_playbackControls__y5pf0')
			.item(0)
	);

	const countdown = document.getElementsByClassName('countdown')[0];
	if (!countdownIsLoaded && countdown !== undefined) {
		countdownIsLoaded = true;
	}
	if (countdownIsLoaded && countdown === undefined) {
		observer.disconnect();

		videoIsStarted = true;
	}
});

observer.observe(document.body, { childList: true, subtree: true });

/** @type {Object.<string, (e: KeyboardEvent) => void>} */
const EventHandlers = {
	ArrowLeft(e) {
		e.stopPropagation();
		if (video === null) {
			return;
		}
		if (!videoIsStarted) {
			return;
		}

		video.currentTime -= VIDEO_SEEK_TIME_S;
	},
	ArrowRight(e) {
		e.stopPropagation();
		if (video === null) {
			return;
		}
		if (!videoIsStarted) {
			return;
		}

		video.currentTime += VIDEO_SEEK_TIME_S;
	},
	'<'(e) {
		e.stopPropagation();
		if (video === null) {
			return;
		}

		const nextPlaybackRate = video.playbackRate - PLAYBACK_SPEED_ADJUSTMENT;
		if (nextPlaybackRate <= 0) {
			return;
		}
		video.playbackRate = nextPlaybackRate;
	},
	'>'(e) {
		e.stopPropagation();
		if (video === null) {
			return;
		}

		const nextPlaybackRate = video.playbackRate + PLAYBACK_SPEED_ADJUSTMENT;
		video.playbackRate = nextPlaybackRate;
	},
};

document.addEventListener(
	'keydown',
	(e) => {
		EventHandlers[e.key]?.(e);
	},
	{ capture: true },
);
