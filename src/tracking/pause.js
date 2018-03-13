/**
 * Tracks when the video is paused.
 *
 * @function pauseTracking
 */
const pauseTracking = function() {
  this.player.on('pause', () => {
    this.postTrackingEvent('pause');
  });
};

export default pauseTracking;
