import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ERROR, LOADED, LOADING } from "../api/status";
import React, { Component } from "react";

import ContactList from "./ContactList";
import Detail from "./Detail";
import NoMatch from "./NoMatch";
import Repository from "../repository";
import Search from "./Search";
import api from "../api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: LOADING
    };
  }

  async componentDidMount() {
    try {
      const items = await api();
      this.setState(oldState => ({
        ...oldState,
        status: LOADED,
        items: new Repository(items)
      }));
    } catch (e) {
      this.setState(oldState => ({
        ...oldState,
        status: ERROR
      }));
    }
  }

  onSearch = value => {
    this.setState(oldState => ({
      ...oldState,
      items: oldState.items.filter(item =>
        item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )
    }));
  };

  render() {
    const { status, items } = this.state;
    const onSearch = this.onSearch;

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <div>
              <Search onChange={onSearch} disabled={status !== LOADED} />
              <ContactList status={status} repository={items} {...props} />
            </div>
          )}
        />
        <Route path="/user/:id(\\d+)/" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

export default App;
