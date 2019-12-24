import React, { Component } from "react";
import SearchBox from "./searchBox.jsx";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="head">
        <div className=" header fx fxdr fjcsb faic">
          <h5>
            <span className="badge badge-outline-warning">React Player</span>
          </h5>
          <SearchBox></SearchBox>
        </div>
        <div className="tabs"></div>
      </div>
    );
  }
}

export default Header;
