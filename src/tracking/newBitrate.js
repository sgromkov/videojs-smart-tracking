/**
 * Tracks when the player change quality.
 *
 * @function newBitrateTracking
 */
const newBitrateTracking = function() {
  this.player.one('resolutionchange', () => {
    this.postTrackingEvent('new_bitrate');
  });
};

export default newBitrateTracking;
