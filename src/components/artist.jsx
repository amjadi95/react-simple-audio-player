import React, { Component } from "react";

import DotOoption from "./dotOption";
class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let artist = this.props.data;
    return (
      <div className="artist-album fx fxdc faic">
        <div className="artist-album-cover fx-cc">
          {artist.coverUrl != "" && (
            <img src={artist.coverUrl} alt="" width="100%" height="" />
          )}
          <button
            className=" list-play-button btn btn-secondary fx-cc text-white"
            onClick={() => {
              this.props.onArtistMusicsPlay(artist.title);
            }}
          >
            play
          </button>
        </div>
        <div className="artist-album-name fx faic">
          <span className="w-100 h-100">{artist.title}</span>
          <DotOoption
            onShowSongsOption={this.props.onShowSongsOption}
            data={{
              type: "artist",
              artist: artist.title,
              albums: artist.albums,
              track: ""
            }}
          ></DotOoption>
        </div>
      </div>
    );
  }
}
export default Artists;
