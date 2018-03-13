/**
 * Tracks once when the player is loaded.
 *
 * @function playerShowTracking
 */
const playerShowTracking = function() {
  this.player.one('loadstart', () => {
    this.postTrackingEvent('player_show', {file: this.options.videoUrl || null});
  });
};

export default playerShowTracking;
