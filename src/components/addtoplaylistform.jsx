import React, { Component } from "react";

class AddToPlayListFrom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.addToPlayListData;
    return (
      <React.Fragment>
        <div
          className="close-addnewplaylist fx w-100 h-100 position-fixed"
          onClick={() => this.props.onShowAddToPlayList(null)}
        ></div>
        <div className="addnewplaylist-form fx fxdc bg-light border border-warning">
          <div className="bg-warning fx-cc p-2">Add to PlayList</div>

          <div className=" h-100 fx fxdc fjcc p-3" style={{ width: 200 }}>
            <div className="list-ofplaylists p-1 fx fxdc overflow-scroll">
              {this.props.PlayLists.map(pl => (
                <div
                  className="p-1 overflow-hidden"
                  onClick={() => this.props.onAddToPlayList(pl.title, data)}
                >
                  {pl.title}
                </div>
              ))}
            </div>
            <button
              type="submit"
              class="btn btn-warning mt-2"
              onClick={() => this.props.onShowAddNewPlayListForm()}
            >
              New
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AddToPlayListFrom;
