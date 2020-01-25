import React, { Component } from "react";
import DotOoption from "./dotOption";
class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let song = this.props.data;
    return (
      <div className=" songs fx fxdr  w-100" key={song.title}>
        <div
          className="w-100 h-100 fx fxdr"
          onClick={() => {
            this.props.onSelectSong(song.title);
          }}
        >
          <div className="song-cover fx-cc ">
            {song.coverUrl != "" && (
              <img src={song.coverUrl} alt="" width="100%" height="100%" />
            )}
          </div>
          <div className="song-name fx fxdc fjcfs">
            <div className="song-title"> {song.title}</div>
            <div className="song-artist"> {song.artist}</div>
          </div>
        </div>
        <DotOoption
          data={{
            type: "song",
            track: song.title,
            artist: song.artist,
            albums: [song.album]
          }}
          onShowSongsOption={this.props.onShowSongsOption}
        ></DotOoption>
      </div>
    );
  }
}
export default Song;
