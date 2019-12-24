import React, { Component } from "react";
import AudioPlayer from "./audioPlayer.jsx";
import Header from "./header.jsx";
class MusicPalyer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <div className="container"></div>
        <AudioPlayer></AudioPlayer>
      </React.Fragment>
    );
  }
}

export default MusicPalyer;
