/**
 * Tracks once when the player is loaded.
 *
 * @function playerShowTracking
 * @param {Object} [options={}]
 *        A plain object containing options for the tracker
 */
const playerShowTracking = function(options = {}) {
  this.player.one('loadstart', () => {
    this.postTrackingEvent('player_show', {file: this.options.videoUrl || null});
  });
};

export default playerShowTracking;
