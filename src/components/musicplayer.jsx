import React, { Component } from "react";
import AudioPlayer from "./audioPlayer.jsx";
import Header from "./header.jsx";

import Tabs from "./tabs";
import SongsOption from "./songsoption";
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
      isPlaying: false,
      isSongInProgress: false,
      songsOptionData: {
        type: "",
        albums: [],
        artist: "",
        track: ""
      },
      isShowSongsOption: false,
      isShowNowPlaying: false,
      isReapeatQueue: true,
      isReapeatOne: false,
      isShowNowPlaying: false
    };
    this.audio = new Audio(soundfile);
  }

  componentDidMount() {
    this.setState({ selectedTab: "SONGS", queue: [] });
  }
  onSelectTab = event => {
    this.setState({ selectedTab: event.target.innerHTML });
  };

  startPlayingAudio = (url, callback) => {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    this.audio = new Audio(url);

    this.audio.ontimeupdate = this.onSeekerUpdate;
    if (typeof callback == "function") {
      callback();
    }
  };

  onChangeSeeker = (event, progressbar) => {
    if (this.audio.currentTime != this.audio.duration) {
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
    for (var i = 0; i < list.length; i++) {
      if (i < list.length - 1) {
        console.log(i);
        if (list[i] == this.state.selectedSong) {
          this.setState(
            {
              selectedSong: list[i + 1],
              isPlaying: true,
              isSongInProgress: true
            },
            () => {
              this.startPlayingAudio(this.state.selectedSong.url, () => {
                this.audio.play();
              });
            }
          );
          break;
        }
      } else {
        if (this.state.isReapeatQueue) {
          this.setState(
            {
              isPlaying: true,
              isSongInProgress: true,
              selectedSong: this.state.queue[0]
            },
            () => {
              this.startPlayingAudio(this.state.selectedSong.url, () => {
                this.audio.play();
              });
            }
          );
        } else if (this.state.isReapeatOne) {
          this.setState(
            {
              isPlaying: true,
              isSongInProgress: true
            },
            () => {
              this.startPlayingAudio(this.state.selectedSong.url, () => {
                this.audio.play();
              });
            }
          );
        } else {
          this.setState(
            {
              isPlaying: false,
              isSongInProgress: false,
              selectedSong: this.state.queue[0]
            },
            () => {
              this.startPlayingAudio(this.state.selectedSong.url);
            }
          );
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
        this.setState({
          isSongInProgress: true
        });
      }
    }
    this.setState({ isPlaying: playing });
  };
  onSelectSongInSongs = trackTitle => {
    let list = this.state.queue;
    if (list != null && this.state.selectedSong != null) {
      let previousSong = list.find(song => song.title == trackTitle);
      if (this.state.selectedSong == previousSong) {
        return;
      }
    }
    let song = LocalMusics.find(obj => obj.title == trackTitle);

    this.startPlayingAudio(song.url, () => {
      this.audio.play();
    });

    this.setState({ isSongSelected: false }, () => {
      let list = this.state.queue;
      if (list != LocalMusics) {
        list = LocalMusics;
        this.setState({
          selectedSong: song,
          isPlaying: true,
          isSongInProgress: true,
          queue: list
        });
      } else {
        this.setState({
          selectedSong: song,
          isPlaying: true,
          isSongInProgress: true
        });
      }
    });
  };
  onArtistMusicsPlay = artistTitle => {
    let ArtistMusics = Artists.find(artist => artist.title == artistTitle);
    this.setState({ queue: ArtistMusics.list }, () => {
      this.startPlayingAudio(ArtistMusics.list[0].url, () => {
        this.audio.play();
      });
      this.setState({
        selectedSong: ArtistMusics.list[0],
        isPlaying: true,
        isSongInProgress: true
      });
    });
  };
  onAlbumMusicsPlay = albumTitle => {
    let AlbumsMusics = Albums.find(album => album.title == albumTitle);
    this.setState({ queue: AlbumsMusics.list }, () => {
      this.startPlayingAudio(AlbumsMusics.list[0].url, () => {
        this.audio.play();
      });
      this.setState({
        selectedSong: AlbumsMusics.list[0],
        isPlaying: true,
        isSongInProgress: true
      });
    });
  };
  onShowSongsOption = data => {
    this.setState({ isShowSongsOption: true, songsOptionData: data });
  };
  onCloseSongsOption = () => {
    this.setState({ isShowSongsOption: false });
  };
  onAddToQueue = optionData => {
    switch (optionData.type) {
      case "song": {
        this.onAddSongToQueue(optionData.track);
        break;
      }
      case "album": {
        this.onAddAlbumToQueue(optionData.albums[0], optionData.artist);
        break;
      }
      case "artist": {
        this.onAddArtistToQueue(optionData.artist);
        break;
      }

      default:
        break;
    }
  };
  onAddSongToQueue = title => {
    let song = LocalMusics.find(song => song.title == title);

    let list = this.state.queue;
    let isQueueEmpty = true;
    if (list != [] && list.length > 0) {
      isQueueEmpty = false;
    }
    list.push(song);
    this.setState({ queue: list }, () => {
      if (isQueueEmpty) {
        this.startPlayingAudio(this.state.queue[0].url, () => {
          this.audio.play();
          this.setState({
            selectedSong: this.state.queue[0],
            isPlaying: true,
            isSongInProgress: true
          });
        });
      }
    });
  };
  onAddArtistToQueue = title => {
    let artist = Artists.find(artist => artist.title == title);
    let newQueue = this.state.queue;
    let isQueueEmpty = true;
    if (newQueue != [] && newQueue.length > 0) {
      isQueueEmpty = false;
    }
    artist.list.map(song => {
      newQueue.push(song);
    });
    this.setState({ queue: newQueue }, () => {
      if (isQueueEmpty) {
        this.startPlayingAudio(this.state.queue[0].url, () => {
          this.audio.play();

          this.setState({
            selectedSong: this.state.queue[0],
            isPlaying: true,
            isSongInProgress: true
          });
        });
      }
    });
  };
  onAddAlbumToQueue = (title, artist) => {
    let album = Albums.find(
      album => album.title == title && album.artist == artist
    );
    let newQueue = this.state.queue;
    let isQueueEmpty = true;
    if (newQueue != [] && newQueue.length > 0) {
      isQueueEmpty = false;
    }
    album.list.map(song => {
      newQueue.push(song);
    });
    this.setState({ queue: newQueue }, () => {
      if (isQueueEmpty) {
        this.startPlayingAudio(this.state.queue[0].url, () => {
          this.audio.play();

          this.setState({
            selectedSong: this.state.queue[0],
            isPlaying: true,
            isSongInProgress: true
          });
        });
      }
    });
  };
  onPlaySongsFromOption = optionData => {
    switch (optionData.type) {
      case "song": {
        this.onSelectSongInSongs(optionData.track);
        break;
      }
      case "album": {
        this.onAlbumMusicsPlay(optionData.albums[0]);
        break;
      }
      case "artist": {
        this.onArtistMusicsPlay(optionData.artist);
        break;
      }

      default:
        break;
    }
  };
  onNextSong = next => {
    let list = this.state.queue;
    let currentsong = this.state.selectedSong;
    if (list != []) {
      if (list.length == 1) {
        this.startPlayingAudio(this.state.queue[0].url, () => {
          this.audio.play();
        });
        return;
      }
      if (next == 1) {
        if (currentsong != list[list.length - 1]) {
          let index = 0;
          for (; index < list.length; index++) {
            if (currentsong == list[index]) {
              this.setState({ selectedSong: list[index + 1] }, () => {
                this.startPlayingAudio(this.state.selectedSong.url, () => {
                  this.audio.play();
                });
              });
            }
          }
        } else {
          this.startPlayingAudio(this.state.queue[0].url, () => {
            this.audio.play();
            this.setState({ selectedSong: this.state.queue[0] });
          });
        }
      } else {
        if (currentsong == list[0]) {
          this.startPlayingAudio(this.state.queue[0].url, () => {
            this.audio.play();
          });
        } else {
          let index = 0;
          for (; index < list.length; index++) {
            if (currentsong == list[index]) {
              this.setState({ selectedSong: list[index - 1] }, () => {
                this.startPlayingAudio(this.state.selectedSong.url, () => {
                  this.audio.play();
                });
              });
            }
          }
        }
      }
    }
  };
  onReapeat = repeat => {
    if (repeat == "one") {
      if (this.state.isReapeatOne) {
        this.setState({ isReapeatOne: false, isReapeatQueue: false });
      } else {
        this.setState({ isReapeatOne: true, isReapeatQueue: false });
      }
    } else {
      if (this.state.isReapeatQueue) {
        this.setState({ isReapeatOne: false, isReapeatQueue: false });
      } else {
        this.setState({ isReapeatOne: false, isReapeatQueue: true });
      }
    }
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
            onSelectSongInSongs={this.onSelectSongInSongs}
            onArtistMusicsPlay={this.onArtistMusicsPlay}
            onAlbumMusicsPlay={this.onAlbumMusicsPlay}
            onShowSongsOption={this.onShowSongsOption}
          ></Tabs>
        </div>

        <AudioPlayer
          progressbar={this.state.progressbar}
          songInfo={this.state.selectedSong}
          onPlay={this.onPlay}
          onChangeSeeker={this.onChangeSeeker}
          isPlaying={this.state.isPlaying}
          onNextSong={this.onNextSong}
          onReapeat={this.onReapeat}
          isReapeatOne={this.state.isReapeatOne}
          isReapeatAll={this.state.isReapeatQueue}
        ></AudioPlayer>
        {this.state.isShowSongsOption && (
          <SongsOption
            data={this.state.songsOptionData}
            onCloseSongsOption={this.onCloseSongsOption}
            onAddToQueue={this.onAddToQueue}
            onPlaySongsFromOption={this.onPlaySongsFromOption}
          ></SongsOption>
        )}
        <div className="ss"></div>
      </div>
    );
  }
}

export default MusicPalyer;
