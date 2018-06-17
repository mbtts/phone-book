import { ERROR, LOADING } from "../api/status";
import React, { PureComponent } from "react";

import PropTypes from "prop-types";
import Repository from "../repository";

class ContactList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { status, repository } = this.props;

    let view;
    if (status === LOADING) {
      view = <p>Loading…</p>;
    } else if (status === ERROR) {
      view = <p>Error</p>;
    } else {
      view = repository.selection.map((item, index) => (
        <p key={index}>{item.name}</p>
      ));
    }

    return view;
  }
}

ContactList.propTypes = {
  status: PropTypes.string.isRequired,
  repository: PropTypes.instanceOf(Repository)
};

export default ContactList;
