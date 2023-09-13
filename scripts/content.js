// Second
const SEEK_TIME_S = 3;
const PLAYBACK_SPEED_ADJUSTMENT = 0.25;

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

    video.currentTime -= SEEK_TIME_S;
  },
  ArrowRight(e) {
    e.stopPropagation();
    if (video === null) {
      return;
    }
    if (!videoIsStarted) {
      return;
    }

    video.currentTime += SEEK_TIME_S;
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
