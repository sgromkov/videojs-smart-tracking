import videoStartTracking from '../tracking/videoStart';
import playerShowTracking from '../tracking/playerShow';
import pauseResumeTracking from '../tracking/pauseResume';
import bufferingTracking from '../tracking/buffering';
import errorTracking from '../tracking/error';
import newBitrateTracking from '../tracking/newBitrate';
import playPingTracking from '../tracking/playPing';

/* eslint camelcase: ["error", {properties: "never"}] */

const trackerHandler = (function() {
  const trackers = {
    player_show(options) {
      playerShowTracking.call(this, options);
    },
    video_start(options) {
      videoStartTracking.call(this, options);
    },
    err(options) {
      errorTracking.call(this, options);
    },
    reb(options) {
      bufferingTracking.call(this, options);
    },
    seek(options) {

    },
    new_bitrate(options) {
      newBitrateTracking.call(this, options);
    },
    pause_resume(options) {
      pauseResumeTracking.call(this, options);
    },
    // reb_start(options) {
    //   bufferingTracking.call(this, options);
    // },
    // reb_end(options) {
    //   bufferingTracking.call(this, options);
    // },
    // pause(options) {
    //   pauseResumeTracking.call(this, options);
    // },
    // resume(options) {
    //   pauseResumeTracking.call(this, options);
    // },
    play_ping(options) {
      playPingTracking.call(this, options);
    },
    a_err(options) {

    },
    a_no(options) {

    },
    a_view_start(options) {

    },
    a_view_end(options) {

    }
  };

  return {
    facade(smartTracker, trackerList = {}) {
      for (const key in trackerList) {
        if (trackerList.hasOwnProperty(key) &&
            trackerList[key] !== false &&
            trackers.hasOwnProperty(key)
          ) {
          const options = (typeof trackerList[key] === 'object') ? trackerList[key] : {};

          trackers[key].call(smartTracker, options);
        }
      }
    }
  };
}());

export default trackerHandler;
