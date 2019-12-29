import React, { Component } from "react";
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
          className="artists-tab tab-content fx fxdc faifs"
          style={windowWidth}
        ></div>
        <div
          id="tab-content3"
          className="albums-tab tab-content fx fxdc faifs"
          style={windowWidth}
        ></div>
        <div
          id="tab-content4"
          className="songs-tab tab-content fx fxdc faifs"
          style={windowWidth}
        >
          {this.props.musicsList.map(obj => (
            <div
              className=" songs fx fxdr  w-100"
              key={obj.title}
              onClick={() => {
                this.props.onSelectSong(obj.title);
              }}
            >
              <div className="song-cover fx-cc ">
                {obj.coverUrl != "" && (
                  <img src={obj.coverUrl} alt="" width="100%" height="100%" />
                )}
              </div>
              <div className="song-name fx fxdc fjcfs">
                <div className="song-title"> {obj.title}</div>
                <div className="song-artist"> {obj.artist}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Tabs;
