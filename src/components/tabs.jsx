import React, { Component } from "react";
import Artist from "./artist";
import Album from "./album";
import Song from "./song";

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
    return (
      <div
        className="content h-100 fx fxdr"
        style={{ width: window.innerWidth * 4, left: -leftPX }}
      >
        <div
          id="tab-content1"
          className="playlists-tab tab-content fx fxdc faifs"
          style={windowWidth}
        ></div>
        <div
          id="tab-content2"
          className="artists-tab tab-content fx fxdr fxww fjcsb "
          style={windowWidth}
        >
          <div className="tab-contetnt-wrapper fx fxdr fxww fjcsb w-100">
            {this.props.artistsList.map(artist => (
              <Artist
                data={artist}
                key={artist.id}
                onArtistMusicsPlay={this.props.onArtistMusicsPlay}
                onShowSongsOption={this.props.onShowSongsOption}
              ></Artist>
            ))}
          </div>
        </div>
        <div
          id="tab-content3"
          className="albums-tab tab-content fx fxdc faifs"
          style={windowWidth}
        >
          <div className="tab-contetnt-wrapper fx fxdr fxww fjcsb w-100">
            {this.props.albumsList.map(album => (
              <Album
                data={album}
                key={album.id}
                onAlbumMusicsPlay={this.props.onAlbumMusicsPlay}
                onShowSongsOption={this.props.onShowSongsOption}
              ></Album>
            ))}
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
                onSelectSongInSongs={this.props.onSelectSongInSongs}
                onShowSongsOption={this.props.onShowSongsOption}
              ></Song>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Tabs;
