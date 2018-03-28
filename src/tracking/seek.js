/**
 * Tracks when the player is seeked.
 *
 * @function seekTracking
 */
const seekTracking = function() {
  this.player.on('seeked', () => {
    this.postTrackingEvent('seek');
  });
};

export default seekTracking;
