import React, { Component } from "react";
import soundfile from "./music.mp3";
import ProgressBar from "./progressBar.jsx";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seekerValue: "0%",
      isPlaying: false
    };
    this.audio = new Audio(soundfile);
  }
  componentDidMount() {
    // this.audio.src =
    //   "http://dl.musiclove.ir/remix-tollani/Shahin-Taha-Adine-103-2019.mp3";
    this.audio.ontimeupdate = this.onSeekerUpdate;
  }
  onChangeSeeker = (event, progressbar) => {
    this.audio.currentTime = parseInt(
      (event.nativeEvent.offsetX / progressbar.offsetWidth) *
        this.audio.duration
    );
  };
  onSeekerUpdate = () => {
    let seekerLength =
      this.audio.currentTime * (100 / this.audio.duration) + "%";
    this.setState({ seekerValue: seekerLength });
  };
  play = playing => {
    if (playing) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.setState({ isPlaying: playing });
  };
  pause = () => {
    //this.setState({ isplay: false });

    this.audio.pause();
  };
  render() {
    let isPlaying = this.state.isPlaying;
    return (
      <div className="audio-player">
        <ProgressBar
          data={{
            currentTime: this.audio.currentTime,
            endTime: this.audio.duration ? this.audio.duration : 0,
            seekerLength: this.state.seekerValue
          }}
          onChangeSeeker={this.onChangeSeeker}
        ></ProgressBar>
        <div className="audio-controller fx fxdr fjcsb">
          <div className="mini-name  p-1 ">
            mini name kjashdjas kjashdjas kjashdjaskjashdja skjashdjask
            jashdjaskjashdjaskjas hdjaskjash djaskjashdjaskjashdjas
          </div>
          <button
            className="btn btn-warning"
            onClick={() => {
              this.play(!isPlaying);
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
