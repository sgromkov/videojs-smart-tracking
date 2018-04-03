/**
 * Tracks once when the video is played at least 3 second.
 *
 * @function videoStartTracking
 * @param {Object} [options={}]
 *        A plain object containing options for the tracker
 */
const videoStartTracking = function(options = {}) {
  let interval = null;
  const startedTime = (options.time && options.time > 0) ? (options.time / 1000) : 0;

  /**
   * @param {number} initialTime
   *        A current time in miliseconds when player was started
   */
  let initialTime = 0;

  const setInitialTime = () => {
    initialTime = this.player.currentTime();
  };

  const videoStarted = () => {
    const currentTime = this.player.currentTime();

    return (currentTime >= initialTime + startedTime);
  };

  const videoStartEventChecker = () => {
    interval = setInterval(() => {
      const player = this.player;
      const additionalParams = {};
      let duration = null;

      if (videoStarted()) {
        clearInterval(interval);

        duration = player.duration();
        if (!isFinite(duration)) {
          duration = -2;
        }

        additionalParams.dur = duration;

        this.postTrackingEvent('video_start', additionalParams);
      }

    }, 1000);
  };

  this.player.one('play', () => {
    setInitialTime();
    videoStartEventChecker();
  });
};

export default videoStartTracking;
