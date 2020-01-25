import React, { Component } from "react";

import DotOoption from "./dotOption";
class PlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let playList = this.props.data;
    return (
      <div className="artist-album fx fxdc faic">
        <div
          className="artist-album-cover fx-cc"
          onClick={() =>
            this.props.onShowSelectedGroup("playlist", playList.title)
          }
        >
          {playList.coverUrl != "" && (
            <img src={playList.coverUrl} alt="" width="100%" height="" />
          )}
          <button
            className=" list-play-button btn btn-secondary fx-cc text-white"
            onClick={() => {
              this.props.onPlayListMusicsPlay(playList.title);
            }}
          >
            play
          </button>
        </div>
        <div
          className="artist-album-name fx faic"
          onClick={() =>
            this.props.onShowSelectedGroup("playlist", playList.title)
          }
        >
          <span className="w-100 h-100">{playList.title}</span>
          <DotOoption
            onShowSongsOption={this.props.onShowSongsOption}
            data={{
              type: "playlist",
              listTitle: playList.title,
              artist: "",
              albums: "",
              track: ""
            }}
          ></DotOoption>
        </div>
      </div>
    );
  }
}
export default PlayList;
