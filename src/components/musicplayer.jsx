import React, { Component } from "react";
import AudioPlayer from "./audioPlayer.jsx";
import Header from "./header.jsx";

import Tabs from "./tabs";

import soundfile from "./music.mp3";
import { LocalMusics, Artists, Albums } from "./musicURLs.jsx";
class MusicPalyer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAlbum: null,
      selectedArtist: null,
      selectedPlayList: null,
      selectedSong: null,
      listOfPlayLists: null,
      selectedTab: "",
      isSongSelected: false,
      progressbar: {
        seekerValue: "0%",
        currentTime: 0,
        endTime: 0
      },
      isPlaying: false
    };
    this.audio = new Audio(soundfile);
  }

  componentDidMount() {
    this.setState({ selectedTab: "SONGS" });
  }
  onSelectTab = event => {
    this.setState({ selectedTab: event.target.innerHTML });
  };
  onSelectSong = title => {
    let song = LocalMusics.find(obj => obj.title == title);
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    this.audio = new Audio(song.url);
    this.audio.ontimeupdate = this.onSeekerUpdate;
    this.audio.play();
    this.setState({ isSongSelected: false }, () => {
      this.setState({ selectedSong: song, isPlaying: true });
    });
  };
  onChangeSeeker = (event, progressbar) => {
    this.audio.currentTime = parseInt(
      (event.nativeEvent.offsetX / progressbar.offsetWidth) *
        this.audio.duration
    );
  };
  onSeekerUpdate = () => {
    let seekerLength =
      this.audio.currentTime * (100 / this.audio.duration) + "%";
    let progressbar = {
      currentTime: this.audio.currentTime,
      endTime: this.audio.duration,
      seekerValue: seekerLength
    };
    this.setState({ progressbar: progressbar });
  };
  onPlay = playing => {
    if (this.audio) {
      if (playing) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }
    this.setState({ isPlaying: playing });
  };
  render() {
    console.log(window.innerWidth);
    return (
      <div className="main  fx-cc fxdc ">
        <Header onSelectTab={this.onSelectTab}></Header>
        <div id="tab-container" className="tab-container fx  fxdc fxww">
          <Tabs
            tabName={this.state.selectedTab}
            musicsList={LocalMusics}
            artistsList={Artists}
            albumsLists={Albums}
            onSelectSong={this.onSelectSong}
          ></Tabs>
        </div>

        <AudioPlayer
          progressbar={this.state.progressbar}
          songInfo={this.state.selectedSong}
          onPlay={this.onPlay}
          onChangeSeeker={this.onChangeSeeker}
          isPlaying={this.state.isPlaying}
        ></AudioPlayer>
      </div>
    );
  }
}

export default MusicPalyer;
