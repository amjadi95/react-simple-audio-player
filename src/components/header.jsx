import React, { Component } from "react";
import SearchBox from "./searchBox.jsx";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    let selectedTab = this.props.selectedTab;
    return (
      <div className="head">
        <div className=" header fx fxdr fjcsb faic">
          <h5>
            <span className="badge badge-outline-warning">React Player</span>
          </h5>
          <SearchBox></SearchBox>
        </div>
        <div className="tab-items fx-cc fxdr ">
          <button
            className={
              "tab-item fx-cc " +
              (selectedTab == "PLAYLISTS" ? " tab-item-selected" : "")
            }
            onClick={this.props.onSelectTab}
          >
            PLAYLISTS
          </button>
          <button
            className={
              "tab-item fx-cc " +
              (selectedTab == "ARTISTS" ? " tab-item-selected" : "")
            }
            onClick={this.props.onSelectTab}
          >
            ARTISTS
          </button>
          <button
            className={
              "tab-item fx-cc " +
              (selectedTab == "ALBUMS" ? " tab-item-selected" : "")
            }
            onClick={this.props.onSelectTab}
          >
            ALBUMS
          </button>
          <button
            className={
              "tab-item fx-cc " +
              (selectedTab == "SONGS" ? " tab-item-selected" : "")
            }
            onClick={this.props.onSelectTab}
          >
            SONGS
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
