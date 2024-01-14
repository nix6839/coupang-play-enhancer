// @ts-nocheck
// Second
const SEEK_TIME_S = 1;

const EventHandlers = {
  ArrowLeft(e) {
    e.stopPropagation();

    const video = document.querySelector('[id^=vjs_video_]').player;
    if (!video) {
      return;
    }

    const newTime = Math.max(0, video.currentTime() - SEEK_TIME_S);
    video.currentTime(newTime);
  },
  ArrowRight(e) {
    e.stopPropagation();

    const video = document.querySelector('[id^=vjs_video_]').player;
    if (!video) {
      return;
    }

    const newTime = Math.min(
      video.duration(),
      video.currentTime() + SEEK_TIME_S,
    );
    video.currentTime(newTime);
  },
};

document.addEventListener(
  'keydown',
  (e) => {
    EventHandlers[e.key]?.(e);
  },
  { capture: true },
);
