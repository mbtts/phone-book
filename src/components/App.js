import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ERROR, LOADED, LOADING } from "../api/status";
import React, { Component, Fragment } from "react";

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

  findItem = match => {
    const id = parseInt(match.params.id);
    const repository =
      this.state.items && this.state.items.filter(item => item.id === id);

    return repository && repository.selection.length === 1
      ? repository.selection[0]
      : null;
  };

  render() {
    const { status, items } = this.state;
    const onSearch = this.onSearch;
    const findItem = this.findItem;

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <Fragment>
              <Search onChange={onSearch} disabled={status !== LOADED} />
              <ContactList status={status} repository={items} {...props} />
            </Fragment>
          )}
        />
        <Route
          path="/user/:id(\d+)"
          render={props => (
            <Detail
              status={status}
              contact={findItem(props.match)}
              {...props}
            />
          )}
        />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

export default App;
