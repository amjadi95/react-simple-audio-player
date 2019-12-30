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
      queue: null,
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
  onSelectSongInSongs = title => {
    let song = LocalMusics.find(obj => obj.title == title);

    this.startPlayingAudio(song.url);

    this.setState({ isSongSelected: false }, () => {
      let list = this.state.queue;
      if (list != LocalMusics) {
        list = LocalMusics;
        this.setState({ selectedSong: song, isPlaying: true, queue: list });
      }
      this.setState({ selectedSong: song, isPlaying: true });
    });
  };
  startPlayingAudio = url => {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    this.audio = new Audio(url);

    this.audio.ontimeupdate = this.onSeekerUpdate;
    this.audio.play();
  };

  onChangeSeeker = (event, progressbar) => {
    if (event.target.className == "seeker-tomb") {
      this.audio.currentTime =
        -(event.target.offsetWidth / 2 - event.nativeEvent.offsetX) +
        this.audio.currentTime;
    } else {
      this.audio.currentTime = parseInt(
        (event.nativeEvent.offsetX / progressbar.offsetWidth) *
          this.audio.duration
      );
    }
  };
  onSeekerUpdate = () => {
    let seekerLength =
      this.audio.currentTime * (100 / this.audio.duration) + "%";
    let progressbar = {
      currentTime: this.audio.currentTime,
      endTime: this.audio.duration,
      seekerValue: seekerLength
    };
    if (
      this.audio.currentTime == this.audio.duration &&
      this.state.queue != null
    ) {
      this.setNextMusic();
    } else {
      this.setState({ progressbar });
    }
  };

  setNextMusic = () => {
    let list = this.state.queue;
    for (let i = 0; i < list.length; i++) {
      if (i < list.length - 1) {
        if (list[i] == this.state.selectedSong) {
          this.setState({ selectedSong: list[++i], isPlaying: true }, () => {
            this.startPlayingAudio(this.state.selectedSong.url);
          });
        }
      }
    }
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
  onArtistMusicsPlay = artistTitle => {
    let ArtistMusics = Artists.find(artist => artist.title == artistTitle);
    this.setState({ queue: ArtistMusics.list }, () => {
      this.startPlayingAudio(ArtistMusics.list[0].url);
      this.setState({ selectedSong: ArtistMusics.list[0], isPlaying: true });
    });
  };
  onAlbumMusicsPlay = albumTitle => {
    let AlbumsMusics = Albums.find(album => album.title == albumTitle);
    this.setState({ queue: AlbumsMusics.list }, () => {
      this.startPlayingAudio(AlbumsMusics.list[0].url);
      this.setState({ selectedSong: AlbumsMusics.list[0], isPlaying: true });
    });
  };
  render() {
    return (
      <div className="main  fx-cc fxdc ">
        <Header onSelectTab={this.onSelectTab}></Header>
        <div id="tab-container" className="tab-container fx  fxdc fxww">
          <Tabs
            tabName={this.state.selectedTab}
            musicsList={LocalMusics}
            artistsList={Artists}
            albumsList={Albums}
            onSelectSong={this.onSelectSongInSongs}
            onArtistMusicsPlay={this.onArtistMusicsPlay}
            onAlbumMusicsPlay={this.onAlbumMusicsPlay}
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
