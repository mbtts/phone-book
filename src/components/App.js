import React, { Component } from "react";

import api from "../api";

const status = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: status.LOADING,
      items: [],
      search: ""
    };
  }

  async componentDidMount() {
    try {
      const items = await api();
      this.setState(oldState => ({
        ...oldState,
        status: status.LOADED,
        items: items
      }));
    } catch (e) {
      this.setState(oldState => ({
        ...oldState,
        status: status.ERROR
      }));
    }
  }

  render() {
    const { status } = this.state;
    let view;
    if (status === status.LOADING) {
      view = <p>Loading…</p>;
    } else if (status === status.ERROR) {
      view = <p>Error</p>;
    } else {
      view = this.state.items.map((item, index) => (
        <p key={index}>{item.name}</p>
      ));
    }

    return (
      <div>
        <input type="search" />
        {view}
      </div>
    );
  }
}

export default App;
