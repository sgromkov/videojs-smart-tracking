/**
 * Timer instance.
 * Contains time information to calculate the seconds viewed.
 */
const timer = {
  _started: 0,
  _total: 0,
  _sended: 0
};

Object.defineProperty(timer, 'started', {
  get() {
    return this._started;
  },
  set(value) {
    this._started = value;
  }
});

Object.defineProperty(timer, 'total', {
  get() {
    return this._total;
  },
  set(value) {
    const startedTime = this.started;
    const measuredTime = value - startedTime;

    if (measuredTime > 0) {
      this._total += measuredTime;
    }
  }
});

Object.defineProperty(timer, 'sended', {
  get() {
    return this._sended;
  },
  set(value) {
    this._sended = value;
  }
});

/**
 * Tracks every 30 seconds and save the time viewed by the user.
 *
 * @function playPingTracking
 */
const playPingTracking = function() {
  let playPingTimer = null;
  let sum = 0;

  const stopPlayPingTimer = () => {
    clearInterval(playPingTimer);
    playPingTimer = null;
  };

  const startPlayPingTimer = () => {
    playPingTimer = setInterval(() => {
      const currentTime = Date.now();
      const sendedTime = timer.sended;
      let fullTime = 0;
      let resultTime = 0;
      let resultSeconds = 0;
      let differenceTime = 0;

      if (!this.player.paused()) {
        timer.total = currentTime;
        timer.started = currentTime;
      }

      fullTime = timer.total;
      resultTime = fullTime - sendedTime;
      resultSeconds = Math.floor(resultTime / 1000);

      if (resultSeconds > 0) {
        differenceTime = resultTime % 1000;
        timer.sended = fullTime - differenceTime;
        this.postTrackingEvent('play_ping', {secs: resultSeconds});

        sum += resultSeconds;
        console.log('secs', resultSeconds);
        console.log('sum', sum);
        console.log('diff', differenceTime);
      }

      if (this.player.ended()) {
        stopPlayPingTimer();
      }
    }, 5000);
  };

  this.player.on('play', () => {
    timer.started = Date.now();
    if (playPingTimer === null) {
      startPlayPingTimer();
    }
  });

  this.player.on('pause', () => {
    timer.total = Date.now();
  });

};

export default playPingTracking;
