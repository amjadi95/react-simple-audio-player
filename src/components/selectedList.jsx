import React, { Component } from "react";
import Song from "./song";
class SelectedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let list = this.props.list;
    return (
      <div className="selected-list fx fxdc">
        <div
          className="back-button fx-cc"
          onClick={() =>
            this.props.onShowSelectedGroup(this.props.mode, list.title)
          }
        >
          {" "}
          back
        </div>
        <div className="album-info fx-cc">
          <div className="artist-album-cover fx-cc">
            {list.coverUrl != "" && (
              <img src={list.coverUrl} alt="" width="100%" height="" />
            )}
          </div>
        </div>
        <div className="album-artist-info fx-cc fxdc p-1 m-1">
          {this.props.mode == "album" ? (
            <React.Fragment className="fx-cc fxdc">
              <span>{list.title} </span> <span>{list.artist}</span>
            </React.Fragment>
          ) : (
            list.title
          )}
        </div>
        {list.list.map(song => (
          <Song
            key={song.title}
            data={song}
            onSelectSong={() =>
              this.props.onSelectSongFromList(
                this.props.mode,
                list.title,
                song.title
              )
            }
            onShowSongsOption={this.props.onShowSongsOption}
          ></Song>
        ))}
      </div>
    );
  }
}

export default SelectedList;
