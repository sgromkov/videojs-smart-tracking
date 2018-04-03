/**
 * Tracks when the video player is marked as buffering
 * and waits until the player has made some progress.
 *
 * @function bufferingTracking
 * @param {Object} [options={}]
 *        A plain object containing options for the tracker
 */
const bufferingTracking = function(options = {}) {
  let timer = null;
  let scrubbing = false;
  let bufferPosition = false;
  let bufferStart = false;
  let bufferEnd = false;
  let resolutionChanged = false;

  const reset = function() {
    if (timer) {
      clearTimeout(timer);
    }
    scrubbing = false;
    bufferPosition = false;
    bufferStart = false;
    bufferEnd = false;
    resolutionChanged = false;
  };

  const onPause = () => {
    bufferStart = false;

    if (this.player.scrubbing()) {
      scrubbing = true;
      timer = setTimeout(function() {
        scrubbing = false;
      }, 200);
    }
  };

  const onResolutionChange = () => {
    resolutionChanged = true;
  };

  const onPlayerWaiting = () => {
    if (resolutionChanged === false && bufferStart === false && scrubbing === false &&
      this.player.currentTime() > 0) {
      bufferStart = new Date();
      bufferPosition = +this.player.currentTime().toFixed(0);

      this.postTrackingEvent('reb_start');
    }
  };

  const onTimeUpdate = () => {
    const curTime = +this.player.currentTime().toFixed(0);

    if (bufferStart && curTime !== bufferPosition) {
      bufferEnd = new Date();

      const timeToLoad = (bufferEnd - bufferStart);

      bufferStart = false;
      bufferPosition = false;

      this.postTrackingEvent('reb_end', {dur2: timeToLoad});
    }
  };

  this.player.on('dispose', reset);
  this.player.on('loadstart', reset);
  this.player.on('ended', reset);
  this.player.on('pause', onPause);
  this.player.on('waiting', onPlayerWaiting);
  this.player.on('timeupdate', onTimeUpdate);
  this.player.on('resolutionchange', onResolutionChange);
};

export default bufferingTracking;
