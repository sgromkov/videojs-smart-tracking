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
  trackers: {
    player_show: false,
    video_start: false,
    err: false,
    reb_start: false,
    reb_end: false,
    seek: false,
    new_bitrate: false,
    pause: false,
    resume: false,
    play_ping: false,
    a_err: false,
    a_no: false,
    a_view_start: false,
    a_view_end: false,
    reb: false,
    pause_resume: false
  },
  videoUrl: null,
  serverUrl: null,
  site: null,
  version: 1
};

export default defaults;
