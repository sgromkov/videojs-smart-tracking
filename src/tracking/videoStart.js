/**
 * Tracks once when the video is played at least 3 second.
 *
 * @function videoStartTracking
 */
const videoStartTracking = function() {
  let initialTimeInterval = null;

  /**
   * @param {number} initialTime
   *        A current time in seconds when player was started
   */
  let initialTime = 0;

  const setInitialTime = () => {
    initialTime = Math.floor(this.player.currentTime());
  };

  const videoStarted = () => {
    const currentTime = Math.floor(this.player.currentTime());

    return (currentTime >= initialTime + 3);
  };

  const videoStartEventChecker = () => {
    initialTimeInterval = setInterval(() => {
      const player = this.player;
      const additionalParams = {};
      let duration = null;

      if (videoStarted()) {
        clearInterval(initialTimeInterval);

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
