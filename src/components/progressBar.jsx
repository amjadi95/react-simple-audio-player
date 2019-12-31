import React, { Component } from "react";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.ProgressBar = React.createRef();
  }
  componentDidMount() {}
  convertToTime(number) {
    if (number == 0 || number == undefined) {
      return "00:00";
    }
    let min = parseInt(number / 60),
      sec = parseInt(number % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    return min + ":" + sec;
  }
  render() {
    //console.log(this.props.seekerLength);
    let seekerValueStyle = {},
      currentTime = 0,
      endTime = 0,
      showSeekerTomb = false;
    let myStyle = {};
    if (this.props.data != null) {
      seekerValueStyle = {
        width: this.props.data.seekerValue
      };
      currentTime = this.props.data.currentTime;
      endTime = this.props.data.endTime;
      showSeekerTomb = currentTime / endTime > 0.001 ? true : false;
    }
    if (this.props.setStyle) {
      myStyle = this.props.setStyle;
    }
    return (
      <div className="audio-length" style={myStyle}>
        <div className="time fx fxdr fjcsb">
          <span className="current-time">
            {this.convertToTime(currentTime)}
          </span>
          <span className="end-time">{this.convertToTime(endTime)}</span>
        </div>
        <div
          className="progres-bar-container fx fjcc faifs"
          ref={el => {
            this.progressbar = el;
          }}
          onClick={event => {
            this.props.onChangeSeeker(event, this.progressbar);
          }}
        >
          <div className="progres-bar">
            <div className="value fx-cc" style={seekerValueStyle}>
              {showSeekerTomb && (
                <div
                  className="seeker-tomb"
                  onClick={() => {
                    console.log("tomb clicked");
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProgressBar;
