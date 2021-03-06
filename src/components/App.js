import { ERROR, LOADED, LOADING } from "../api/status";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { sortByLastNameAsc, sortByLastNameDesc } from "../api/contactSort";

import ContactList from "./ContactList";
import Detail from "./Detail";
import NoMatch from "./NoMatch";
import Repository from "../repository";
import Search from "./Search";
import SortButton from "./SortButton";
import api from "../api/contacts";
import sortByAlpha from "../../assets/svg/round-sort_by_alpha-24px.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: LOADING,
      search: "",
      sortOrder: "asc"
    };
  }

  async componentDidMount() {
    try {
      const items = await api();
      this.setState({
        status: LOADED,
        items: new Repository(items)
      });
    } catch (e) {
      this.setState({
        status: ERROR
      });
    }
  }

  onSearch = e => {
    const search = e.target.value;

    this.setState(oldState => ({
      search,
      items: oldState.items.filter(item =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    }));
  };

  onClearSearch = () => {
    this.setState(oldState => ({
      search: "",
      items: oldState.items.reset()
    }));
  };

  onSortOrder = () => {
    this.setState(oldState => {
      const asc = oldState.sortOrder === "asc";
      const sortOrder = asc ? "desc" : "asc";
      const sortFn = asc ? sortByLastNameDesc : sortByLastNameAsc;
      return {
        sortOrder,
        items: oldState.items.sort(sortFn)
      };
    });
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

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <div className="contactlist">
              <div className="toolbar">
                <div className="toolbar__panel toolbar__panel--search">
                  <Search
                    value={this.state.search}
                    onChange={this.onSearch}
                    onClearClick={this.onClearSearch}
                    disabled={status !== LOADED}
                    className="toolbar__search"
                    clearClassName="toolbar__clearsearch"
                  />
                </div>
                <div className="toolbar__panel toolbar__panel--buttons">
                  <SortButton
                    icon={sortByAlpha}
                    order={this.state.sortOrder}
                    onClick={this.onSortOrder}
                    className="toolbar__button toolbar__button--wide"
                  />
                </div>
              </div>
              <ContactList status={status} repository={items} {...props} />
            </div>
          )}
        />
        <Route
          path="/user/:id(\d+)"
          render={props => (
            <Detail
              status={status}
              contact={this.findItem(props.match)}
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
