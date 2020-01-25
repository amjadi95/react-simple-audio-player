import React, { Component } from "react";

class NewPlayListFrom extends Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
  }
  onChange = event => {
    this.setState({ input: event.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <div
          className="close-addnewplaylist fx w-100 h-100 position-fixed"
          onClick={() => this.props.onShowAddNewPlayListForm()}
        ></div>
        <div className="addnewplaylist-form fx fxdc bg-light border border-warning">
          <div className="bg-warning fx-cc p-2">New PlayList</div>
          <div class="form-inline fx fxdc fjcc p-3">
            <div class="form-group mx-sm-3 mb-2 fx fxdc fjcfs">
              <input
                type="text"
                class="form-control"
                id="inputPassword2"
                placeholder="playlist name"
                onChange={this.onChange}
              />
            </div>
            <button
              type="submit"
              class="btn btn-warning mt-2"
              onClick={() => this.props.onAddNewPlayList(this.state.input)}
            >
              ADD
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default NewPlayListFrom;
