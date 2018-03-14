/**
 * Tracks when the video is paused or resumed by user.
 *
 * @function pauseResumeTracking
 */
const pauseResumeTracking = function() {
  const player = this.player;
  let paused = false;
  let resumed = false;

  const onUserPlayPauseClick = () => {
    if (player.paused()) {
      paused = true;
      resumed = false;
      this.postTrackingEvent('pause');
    } else if (paused && !resumed) {
      paused = false;
      resumed = true;
      this.postTrackingEvent('resume');
    }
  };

  player.controlBar.playToggle.on('click', onUserPlayPauseClick);

  player.tech_.el().addEventListener('click', onUserPlayPauseClick);

  // When user changed video quality:
  player.on('resolutionchange', onUserPlayPauseClick);
};

export default pauseResumeTracking;
