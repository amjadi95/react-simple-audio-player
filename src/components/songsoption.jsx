import React, { Component } from "react";

class SongsOption extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = { title: "", artist: "", albums: [], track: "" };
    if (this.props.data) {
      data = this.props.data;
    }
    return (
      <React.Fragment>
        <div
          className="close-songs-option  position-fixed h-100 w-100  fx fjcc"
          onClick={this.props.onCloseSongsOption}
        >
          <div className=" songs-option-info fx-cc fxdc ">
            {data.type != "" && (
              <span className="songs-option-type w-100 fx fxdr faic fjcsb">
                <span className="fx fjcfs w-100">type:</span>
                <span className="badge badge-warning fx fjcc w-100">
                  {data.type}
                </span>
              </span>
            )}
            {data.artist != "" && (
              <span className="songs-option-artist w-100 fx fxdr faic fjcsb">
                <span className="fx fjcfs w-100">artist:</span>
                <span className="badge badge-warning fx fjcc w-100">
                  {data.artist}
                </span>
              </span>
            )}
            {data.albums != [] && (
              <span className="songs-option-album w-100 fx fxdr faic fjcsb">
                <span className="fx fjcfs w-100">albums:</span>
                <span className="fx fxdc fjcc w-100">
                  {data.albums.map(str => (
                    <span key={str} className="badge badge-warning">
                      {str}
                    </span>
                  ))}
                </span>
              </span>
            )}
            {data.track != "" && (
              <span className="songs-option-track w-100 fx fxdr faic fjcsb">
                <span className="fx fjcfs w-100">track:</span>
                <span className="badge badge-warning fx fjcc w-100">
                  {data.track}
                </span>
              </span>
            )}
          </div>
        </div>
        <div className="songs-option fx-cc fxdc ">
          <div
            className="songs-option-menu fx fxdc faifs fjcc"
            onClick={() => {
              return false;
            }}
          >
            <button
              className="option-item fx-cc btn btn-warning"
              onClick={() => {
                this.props.onPlaySongsFromOption(data);
              }}
            >
              Play
            </button>
            <button
              className="option-item fx-cc btn btn-warning"
              onClick={() => {
                this.props.onAddToQueue(data);
              }}
            >
              Add Queue
            </button>
            <button
              className="option-item fx-cc btn btn-warning"
              onClick={() => this.props.onShowAddToPlayList(data)}
            >
              Add to PlayList
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default SongsOption;
