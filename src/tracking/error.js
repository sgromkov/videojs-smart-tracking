/**
 * Tracks when the error event fired.
 *
 * @function errorTracking
 * @param {Object} [options={}]
 *        A plain object containing options for the tracker
 */
const errorTracking = function(options = {}) {
  const player = this.player;

  player.on('error', (event) => {
    event.stopImmediatePropagation();

    const error = player.error();
    let params = {};

    if (error) {
      /* eslint camelcase: ["error", {properties: "never"}] */
      params = {
        err_type: 'player',
        err_code: error.code,
        err_msg: error.message
      };
    }

    this.postTrackingEvent('err', params);
  });
};

export default errorTracking;
