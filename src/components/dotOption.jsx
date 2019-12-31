import React, { Component } from "react";

class DotOption extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let data = this.props.data;
    return (
      <div
        className="dot-option-container fx-cc"
        onClick={() => {
          this.props.onShowSongsOption(data);
        }}
      >
        <div className="dot-option fx-cc fxdc ">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    );
  }
}
export default DotOption;
