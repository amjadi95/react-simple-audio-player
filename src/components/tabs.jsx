import React, { Component } from "react";
import Artist from "./artist";
import Album from "./album";
import Song from "./song";
import SelectedList from "./selectedList";
import PlayList from "./playlist";
import { Artists } from "./musicURLs";

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    let leftPX = 1;
    switch (this.props.tabName) {
      case "PLAYLISTS": {
        leftPX = 0;
        break;
      }
      case "ARTISTS": {
        leftPX = window.innerWidth;
        break;
      }
      case "ALBUMS": {
        leftPX = window.innerWidth * 2;
        break;
      }
      case "SONGS": {
        leftPX = window.innerWidth * 3;
        break;
      }
    }
    let windowWidth = { width: window.innerWidth };

    let selectedSong = { title: "", url: "" };
    if (this.props.selectedSong) {
      selectedSong = this.props.selectedSong;
    }
    return (
      <div
        className="content h-100 fx fxdr"
        style={{ width: window.innerWidth * 4, left: -leftPX }}
      >
        <div
          id="tab-content1"
          className="playlists-tab tab-content fx fxdr faifs"
          style={windowWidth}
        >
          <div className="tab-contetnt-wrapper fx fxdr fxww fjcsb w-100">
            {!this.props.isShowSelectedPlayList &&
              this.props.playListsList.map(playlist => (
                <PlayList
                  data={playlist}
                  key={playlist.title}
                  onArtistMusicsPlay={this.props.onPlayListMusicsPlay}
                  onShowSongsOption={this.props.onShowSongsOption}
                  onShowSelectedGroup={this.props.onShowSelectedGroup}
                ></PlayList>
              ))}
            {this.props.isShowSelectedPlayList && (
              <SelectedList
                list={this.props.selectedPlayList}
                onShowSongsOption={this.props.onShowSongsOption}
                onSelectSongFromList={this.props.onSelectSongFromGroup}
                mode={"playlist"}
                onShowSelectedGroup={this.props.onShowSelectedGroup}
              ></SelectedList>
            )}
          </div>
        </div>
        <div
          id="tab-content2"
          className="artists-tab tab-content fx fxdr fxww fjcsb "
          style={windowWidth}
        >
          <div className="tab-contetnt-wrapper fx fxdr fxww fjcsb w-100">
            {!this.props.isShowSelectedArtist &&
              this.props.artistsList.map(artist => (
                <Artist
                  data={artist}
                  key={artist.id}
                  onArtistMusicsPlay={this.props.onArtistMusicsPlay}
                  onShowSongsOption={this.props.onShowSongsOption}
                  onShowSelectedGroup={this.props.onShowSelectedGroup}
                ></Artist>
              ))}
            {this.props.isShowSelectedArtist && (
              <SelectedList
                list={this.props.selectedArtist}
                onShowSongsOption={this.props.onShowSongsOption}
                onSelectSongFromList={this.props.onSelectSongFromGroup}
                mode={"artist"}
                onShowSelectedGroup={this.props.onShowSelectedGroup}
              ></SelectedList>
            )}
          </div>
        </div>
        <div
          id="tab-content3"
          className="albums-tab tab-content fx fxdc faifs"
          style={windowWidth}
        >
          <div className="tab-contetnt-wrapper fx fxdr fxww fjcsb w-100">
            {!this.props.isShowSelectedAlbum &&
              this.props.albumsList.map(album => (
                <Album
                  data={album}
                  key={album.id}
                  onAlbumMusicsPlay={this.props.onAlbumMusicsPlay}
                  onShowSongsOption={this.props.onShowSongsOption}
                  onShowSelectedGroup={this.props.onShowSelectedGroup}
                ></Album>
              ))}
            {this.props.isShowSelectedAlbum && (
              <SelectedList
                list={this.props.selectedAlbum}
                onShowSongsOption={this.props.onShowSongsOption}
                onSelectSongFromList={this.props.onSelectSongFromGroup}
                mode={"album"}
                onShowSelectedGroup={this.props.onShowSelectedGroup}
              ></SelectedList>
            )}
          </div>
        </div>
        <div
          id="tab-content4"
          className="songs-tab tab-content fx fxdc faifs"
          style={windowWidth}
        >
          <div className="tab-contetnt-wrapper fx fxdr fxww fjcsb w-100">
            {this.props.musicsList.map(song => (
              <Song
                key={song.title}
                data={song}
                onSelectSong={this.props.onSelectSongInSongs}
                onShowSongsOption={this.props.onShowSongsOption}
                isSelectedSong={selectedSong.title == song.title ? true : false}
              ></Song>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs;
