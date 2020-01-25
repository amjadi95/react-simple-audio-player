import React, { Component } from "react";
import ProgressBar from "./progressBar.jsx";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNowPlaying: false
    };
  }
  componentDidMount() {}
  onShowNowPlaying = isShow => {
    if (isShow) {
      this.setState({ showNowPlaying: true });
    } else {
      this.setState({ showNowPlaying: false });
    }
  };
  render() {
    let showNowPlaying = this.state.showNowPlaying;
    let mystyle = "";
    if (showNowPlaying) mystyle = { height: 400 };
    let isPlaying = false;
    let title = "",
      artist = "",
      coverUrl = "";
    let progress = null;
    if (this.props.progressbar) {
      progress = this.props.progressbar;
    }
    if (this.props.songInfo) {
      title = this.props.songInfo.title;
      artist = this.props.songInfo.artist;
      coverUrl = this.props.songInfo.coverUrl;
    }
    if (this.props.isPlaying) {
      isPlaying = this.props.isPlaying;
    }

    return (
      <div
        className={"audio-player " + mystyle}
        style={showNowPlaying ? { height: "75%" } : {}}
      >
        <div
          className="show-nowplaying fx fjcc"
          style={showNowPlaying ? { top: 0 } : {}}
          onClick={() => this.onShowNowPlaying(!showNowPlaying)}
        >
          <div
            className={
              "show-nowplayin-thumb-up fx fjcc" +
              (showNowPlaying ? " show-nowplayin-thumb-down" : "")
            }
          >
            {showNowPlaying ? "down" : "up"}
          </div>
        </div>
        <div
          className="cover fx-cc"
          style={showNowPlaying ? {} : { opacity: 0 }}
        >
          <img src={coverUrl} alt="" width="" height="100%" />
        </div>
        <div
          className="nowplaying-info fx fxdc faic"
          style={showNowPlaying ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="nowplaying-track">
            <span>{title}</span>
          </div>
          <div className="nowplaying-artist">
            <span>{artist}</span>
          </div>
        </div>
        <div className="nowPlaying">
          <ProgressBar
            data={progress}
            onChangeSeeker={this.props.onChangeSeeker}
            setStyle={showNowPlaying ? { marginTop: 100 } : {}}
          ></ProgressBar>
          <div
            className="audio-controller fx  fjcsb"
            style={showNowPlaying ? { flexDirection: "column-reverse" } : {}}
          >
            <div
              className="mini-song-info fx fxdr "
              style={showNowPlaying ? { opacity: 0 } : { opacity: 1 }}
            >
              <div className="mini-song-cover fx-cc ">
                <img src={coverUrl} alt="" width="100%" height="100%" />
              </div>
              <div className="mini-song-name fx fxdc fjcfs">
                <div className="mini-song-title"> {title}</div>
                <div className="mini-song-artist"> {artist}</div>
              </div>
            </div>
            <div className="control-buttons fx-cc">
              <button
                className={
                  showNowPlaying
                    ? this.props.isReapeatOne
                      ? " next-pre repeat btn btn-warning"
                      : " next-pre repeat btn btn-outline-warning"
                    : " position-absolute  hide-buttons "
                }
                onClick={() => {
                  this.props.onReapeat("one");
                }}
              >
                r one
              </button>
              <button
                className={
                  showNowPlaying
                    ? "next-pre "
                    : " position-absolute  hide-buttons "
                }
                onClick={() => {
                  this.props.onNextSong(-1);
                }}
              >
                pre
              </button>
              <button
                className={
                  " play-button btn  btn-warning fx-cc" +
                  (showNowPlaying ? " show-buttons" : "")
                }
                onClick={() => {
                  this.props.onPlay(!isPlaying);
                }}
              >
                {isPlaying ? "pause" : "play"}
              </button>
              <button
                className={
                  showNowPlaying
                    ? "next-pre"
                    : " position-absolute hide-buttons"
                }
                onClick={() => {
                  this.props.onNextSong(1);
                }}
              >
                next
              </button>
              <button
                className={
                  showNowPlaying
                    ? this.props.isReapeatAll
                      ? "next-pre  repeat btn btn-warning"
                      : "next-pre  repeat btn btn-outline-warning "
                    : " position-absolute  hide-buttons "
                }
                onClick={() => {
                  this.props.onReapeat("all");
                }}
              >
                r all
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AudioPlayer;
