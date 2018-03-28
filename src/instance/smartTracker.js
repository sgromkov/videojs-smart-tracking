import sendXMLHttpRequest from '../helpers/sendXMLHttpRequest';
import getStickedParams from '../helpers/getStickedParams';
import getHostName from '../helpers/getHostName';
import getUrl from '../helpers/getUrl';

import videoStartTracking from '../tracking/videoStart';
// import playerShowTracking from '../tracking/playerShow';
// import pauseResumeTracking from '../tracking/pauseResume';
// import bufferTracking from '../tracking/buffering';
// import errorTracking from '../tracking/error';
// import newBitrateTracking from '../tracking/newBitrate';

/* eslint camelcase: ["error", {properties: "never"}] */

/**
 * Tracker instance.
*/
const smartTracker = {
  /**
   * @param {Player} player
   *        A Video.js player object
   */
  player: null,

  /**
   * @param {Object} [options={}]
   *        A plain object containing options for the plugin
   */
  options: null,

  /**
   * Will return the current version of the player if it exists.
   *
   * @function getPlayerVersion
   * @return {string}
   *          Player version
   */
  getPlayerVersion() {
    return (this.player.hasOwnProperty('VERSION')) ? this.player.VERSION : null;
  },

  /**
   * Set values of the params that should be initialized when loading the player.
   *
   * @function setInitialParams
   */
  setInitialParams() {
    const params = this.options.params;

    if (!params.hasOwnProperty('player_version') || params.player_version === null) {
      params.player_version = this.getPlayerVersion();
    }

    if (!params.hasOwnProperty('mid') || params.mid === null) {
      params.mid = 1;
    }
  },

  /**
   * Returns updated params with values of the params
   * that should be updated every tracking event.
   *
   * @function getUpdatedParams
   * @return {Object}
   *         params wich should be sends to server.
   * @todo make params definition
   *
   * {number} null
   * has_a_block: 0,
   *
   * Порядковый номер проигрываемого видео в рамках сессии (pid),
   * инкрементируется при переходе к другому видео в рамках сессии (pid)
   * {number} 1
   * mid: 1,
   *
   * Current bitrate
   * {number} null
   * birt: null
   */
  getUpdatedParams() {
    const player = this.player;
    const params = this.options.params;
    const currentTime = Math.floor(player.currentTime());
    let hostName = null;
    let bandwidth = null;
    let resolution = null;
    let quality = null;
    let playlistsMedia = null;

    if (player.hasOwnProperty('tech_') && player.tech_.hasOwnProperty('hls')) {
      if (player.tech_.hls.hasOwnProperty('playlists') &&
      typeof player.tech_.hls.playlists.media === 'function') {
        playlistsMedia = player.tech_.hls.playlists.media();
        if (playlistsMedia && playlistsMedia.hasOwnProperty('uri')) {
          hostName = getHostName(playlistsMedia.uri);
        }
      }
      if (player.tech_.hls.hasOwnProperty('bandwidth')) {
        bandwidth = player.tech_.hls.bandwidth;
        if (bandwidth > 0) {
          bandwidth = Math.floor(bandwidth / 1000);
        }
      }
    }

    if (typeof player.currentResolution === 'function') {
      resolution = player.currentResolution();
      if (resolution.hasOwnProperty('sources') && resolution.sources.length > 0) {
        quality = resolution.sources[0].res;
      }
    }

    params.bw = bandwidth;
    params.edge = hostName;
    params.playeri = quality;
    params.curr_ts = currentTime;
    params.n++;

    return params;
  },

  /**
   * Will send tracking event data to server
   *
   * @function postTrackingEvent
   * @param    {string} actionName
   *           Event name
   * @param    {Object} individualParams
   *           Event individual params
   */
  postTrackingEvent(actionName, individualParams = {}) {
    const server = this.options.serverUrl;
    const site = this.options.site;
    const version = this.options.version;
    const commonParams = this.getUpdatedParams();
    const url = getUrl(server, site, actionName, version);
    const data = getStickedParams(commonParams, individualParams);

    sendXMLHttpRequest(url, data);
  },

  /**
   * Will set event listeners
   *
   * Should be called when tracker is init
   *
   * @function startTracking
   */
  startTracking() {
    // playerShowTracking.apply(this);
    videoStartTracking.apply(this);
    // pauseResumeTracking.apply(this);
    // bufferTracking.apply(this);
    // errorTracking.apply(this);
    // newBitrateTracking.apply(this);
  },

  /**
   * Should be called when player is ready
   *
   * @function init
   * @param    {Player} player
   *           A Video.js player object.
   * @param    {Object} [options={}]
   *           A plain object containing options for the plugin.
   */
  init(player, options) {
    this.player = player;
    this.options = options;
    this.setInitialParams();
    this.startTracking();
  }
};

export default smartTracker;
