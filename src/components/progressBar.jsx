import React, { Component } from "react";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.ProgressBar = React.createRef();
  }
  componentDidMount() {}
  convertToTime(number) {
    let min = parseInt(number / 60),
      sec = parseInt(number % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    return min + ":" + sec;
  }
  render() {
    //console.log(this.props.seekerLength);
    let seekerValueStyle = {
      width: this.props.data.seekerLength
    };
    let currentTime = this.props.data.currentTime,
      endTime = this.props.data.endTime;
    return (
      <div className="audio-length">
        <div
          className="progres-bar-container fx-cc"
          ref={el => {
            this.progressbar = el;
          }}
          onClick={event => {
            this.props.onChangeSeeker(event, this.progressbar);
          }}
        >
          <div className="progres-bar">
            <div className="value fx-cc" style={seekerValueStyle}>
              {currentTime / endTime > 0.001 && (
                <div className="seeker-tomb"></div>
              )}
            </div>
          </div>
        </div>
        <div className="time fx fxdr fjcsb">
          <span className="current-time">
            {this.convertToTime(currentTime)}
          </span>
          <span className="end-time">{this.convertToTime(endTime)}</span>
        </div>
      </div>
    );
  }
}
export default ProgressBar;
