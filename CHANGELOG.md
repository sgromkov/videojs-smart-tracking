# CHANGELOG

<a name="0.6.1"></a>
## [0.6.1](https://github.com/sgromkov/videojs-smart-tracking/compare/v0.6.0...v0.6.1) (2018-04-17)
* [@sgromkov](https://github.com/sgromkov/): Fix `Cannot read property 'hasOwnProperty' of undefined` in resolution.

<a name="0.6.0"></a>
## [0.6.0](https://github.com/sgromkov/videojs-smart-tracking/compare/v0.5.0...v0.6.0) (2018-04-03)
* [@sgromkov](https://github.com/sgromkov/): Add `trackers` option into plugin. This option allows you to control trackers from the outside.

<a name="0.5.0"></a>
## [0.5.0](https://github.com/sgromkov/videojs-smart-tracking/compare/v0.4.0...v0.5.0) (2018-04-02)
* [@sgromkov](https://github.com/sgromkov/): Add `play_ping` tracker.

<a name="0.4.0"></a>
## 0.4.0 (2018-03-28)
* [@sgromkov](https://github.com/sgromkov/):
    * Add `new_bitrate` tracker.
    * Add `birt` to common params.

<a name="0.3.3"></a>
## 0.3.3 (2018-03-22)
* [@sgromkov](https://github.com/sgromkov/): Rounded `bandwidth` to whole numbers.

<a name="0.3.@"></a>
## 0.3.2 (2018-03-22)
* [@sgromkov](https://github.com/sgromkov/): Converted bits to kilobits in `bandwidth`.

<a name="0.3.1"></a>
## 0.3.1 (2018-03-22)
* [@sgromkov](https://github.com/sgromkov/): Divided the plugin into modules.

<a name="0.3.0"></a>
## 0.3.0 (2018-03-15)
* [@sgromkov](https://github.com/sgromkov/):
    * Off trackers except for `video_start` tracker.
    * Rewrite url generating with new rules.

<a name="0.2.1"></a>
## 0.2.1 (2018-03-14)
* [@sgromkov](https://github.com/sgromkov/): Add stopPropagation to `err` tracker.

<a name="0.2.0"></a>
## 0.2.0 (2018-03-14)
* [@sgromkov](https://github.com/sgromkov/): Add `err` tracker.

<a name="0.1.2"></a>
## 0.1.2 (2018-03-14)
* [@sgromkov](https://github.com/sgromkov/):
    * Fix `pause` tracker.
    * Add `resume` tracker.

<a name="0.1.1"></a>
## 0.1.1 (2018-03-13)
* [@sgromkov](https://github.com/sgromkov/):
    * Fix hls error in `player_show` tracker.
    * Add resolutionchange checker in `buffering` tracker.

<a name="0.1.0"></a>
## 0.1.0 (2018-03-13)
* [@sgromkov](https://github.com/sgromkov/): Add new trackers:
    * `pause`
    * `player_show`
    * `reb_start`
    * `reb_end`

<a name="0.0.4"></a>
## 0.0.4 (2018-03-02)
* [@sgromkov](https://github.com/sgromkov/): Fix `resolutuion.sources[0]` error when only one source.

<a name="0.0.3"></a>
## 0.0.3 (2018-03-02)
* [@sgromkov](https://github.com/sgromkov/): Fix `resolutuion is not defined` error.

<a name="0.0.2"></a>
## 0.0.2 (2018-03-02)
* [@sgromkov](https://github.com/sgromkov/): Remove wating for `ready` when start the plugin.

<a name="0.0.1"></a>
## 0.0.1 (2018-03-02)
* [@sgromkov](https://github.com/sgromkov/): Add `video_start` tracker.
