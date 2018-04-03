/**
 * Tracks when the player change quality.
 *
 * @function newBitrateTracking
 * @param {Object} [options={}]
 *        A plain object containing options for the tracker
 */
const newBitrateTracking = function(options = {}) {
  this.player.one('resolutionchange', () => {
    this.postTrackingEvent('new_bitrate');
  });
};

export default newBitrateTracking;
