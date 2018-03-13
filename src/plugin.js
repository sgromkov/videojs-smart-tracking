import videojs from 'video.js';
import {version as VERSION} from '../package.json';

import videoStartTracking from './tracking/videoStart';
import playerShowTracking from './tracking/playerShow';
// import pauseTracking from './tracking/pause';
import bufferTracking from './tracking/buffering';

/* eslint camelcase: ["error", {properties: "never"}] */

// Default options for the plugin.
const defaults = {
  params: {
    /**
     * @param {number} playeri
     *        Quality index.
     *        Defined each time.
     */
    playeri: null,
    /**
     * @param {string} player_version
     *        Player version.
     *        Get version from player.VERSION once when plugin load.
     */
    player_version: null,
    /**
     * @param {number} has_a_block
     *        Is adblock detected.
     *        Defined each time.
     */
    has_a_block: null,
    /**
     * @param {number} mid
     *        Serial number of the video being played during the session.
     *        Incremented when switching to another video within a session.
     */
    mid: 1,
    /**
     * @param {number} n
     *        Serial number of the log line within the session.
     *        Incremented before the postracking request is sent.
     */
    n: 0,
    /**
     * @param {number} curr_ts
     *        The current second of the video at the time of logging.
     *        Defined each time.
     */
    curr_ts: 0,
    /**
     * @param {string} edge
     *        Edge server's hostname.
     *        Defined each time.
     *        Example: "live-301.media-t.ru" from "https://live-301.media-t.ru/LIVE/.../chunklist.m3u8"
     */
    edge: null,
    /**
     * @param {number} birt
     *        Current bitrate.
     *        Defined each time.
     */
    birt: null,
    /**
     * @param {number} bw
     *        Current bandwidth.
     *        Defined each time.
     */
    bw: null
  },
  live: false,
  ads: false,
  videoUrl: null,
  serverUrl: null
};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Create XMLHttpRequest and send json data to server.
 *
 * @function sendXMLHttpRequest
 * @param {string} url
 *        Page url
 * @param {Object} data
 *        Event params
 */
const sendXMLHttpRequest = function(url, data) {
  const xhr = new XMLHttpRequest();

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.withCredentials = true;
  xhr.send(JSON.stringify(data));
};

/**
 * Will return glue encode params.
 *
 * @function getStickedParams
 * @param {Object} commonParams
 *        Plugin common params from options.params
 * @param {Object} individualParams
 *        Event individual params
 * @param {string} actionName
 *        Event name
 * @return {Object}
 *          Glue encode params
 */
const getStickedParams = function(commonParams, individualParams, actionName) {
  const params = Object.assign(
    {}, commonParams, individualParams, {action_name: actionName}
  );
  const data = {};

  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key] !== null) {
      data[key] = encodeURIComponent(params[key]);
    }
  }

  return data;
};

/**
 * Will return hostname from URL.
 *
 * @function getHostName
 * @param {string} url
 *        Media url
 * @return {string}
 *          Hostname
 */
const getHostName = function(url) {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);

  return (match !== null &&
    match.length > 2 &&
    typeof match[2] === 'string' &&
    match[2].length > 0) ? match[2] : null;
};

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
   * Set values of the params that should be updated every tracking event.
   *
   * @function setUpdatedParams
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
  setUpdatedParams() {
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
        playlistsMedia = this.player.tech_.hls.playlists.media();
        if (playlistsMedia && playlistsMedia.hasOwnProperty('uri')) {
          hostName = getHostName(playlistsMedia.uri);
        }
      }
      if (player.tech_.hls.hasOwnProperty('bandwidth')) {
        bandwidth = this.player.tech_.hls.bandwidth;
      }
    }

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
    this.setUpdatedParams();

    const data = getStickedParams(this.options.params, individualParams, actionName);

    sendXMLHttpRequest(this.options.serverUrl, data);
  },

  /**
   * Will set event listeners
   *
   * Should be called when tracker is init
   *
   * @function startTracking
   */
  startTracking() {
    playerShowTracking.apply(this);
    videoStartTracking.apply(this);
    // pauseTracking.apply(this);
    bufferTracking.apply(this);
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

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
const onPlayerReady = (player, options) => {
  videojs.log('smartTracking Plugin ENABLED!', options);

  player.addClass('vjs-videojs-smart-tracking');

  smartTracker.init(player, options);
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function smartTracking
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const smartTracking = function(options) {
  onPlayerReady(this, videojs.mergeOptions(defaults, options));
};

// Register the plugin with video.js.
registerPlugin('smartTracking', smartTracking);

// Include the version number.
smartTracking.VERSION = VERSION;

export default smartTracking;
