import React, { Component } from "react";
class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let album = this.props.data;
    return (
      <div className="artist-album fx fxdc faic">
        <div className="artist-album-cover fx-cc">
          {album.coverUrl != "" && (
            <img src={album.coverUrl} alt="" width="100%" height="" />
          )}
          <button
            className=" list-play-button btn btn-secondary fx-cc text-white"
            onClick={() => {
              this.props.onAlbumMusicsPlay(album.title);
            }}
          >
            play
          </button>
        </div>
        <div className="artist-album-name fx faic fxdc">
          <span className="w-100 h-100">{album.title}</span>
          <span className="w-100 h-100">{album.artist}</span>
        </div>
      </div>
    );
  }
}
export default Album;