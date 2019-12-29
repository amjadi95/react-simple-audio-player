import React, { Component } from "react";
import ProgressBar from "./progressBar.jsx";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
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
      <div className="audio-player">
        <ProgressBar
          data={progress}
          onChangeSeeker={this.props.onChangeSeeker}
        ></ProgressBar>
        <div className="audio-controller fx fxdr fjcsb">
          <div className="mini-song-info fx fxdr ">
            <div className="mini-song-cover fx-cc ">
              <img src={coverUrl} alt="" width="100%" height="100%" />
            </div>
            <div className="mini-song-name fx fxdc fjcfs">
              <div className="mini-song-title"> {title}</div>
              <div className="mini-song-artist"> {artist}</div>
            </div>
          </div>
          <button
            className="btn  btn-warning fx-cc"
            onClick={() => {
              this.props.onPlay(!isPlaying);
            }}
          >
            {isPlaying ? "pause" : "play"}
          </button>
        </div>
      </div>
    );
  }
}
export default AudioPlayer;
