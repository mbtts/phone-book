import { ERROR, LOADED, LOADING } from "../api/status";
import React, { Fragment, PureComponent } from "react";

import PropTypes from "prop-types";

class Detail extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { status, contact } = this.props;

    let view;
    if (status === LOADING) {
      view = <p>Loading…</p>;
    } else if (status === ERROR) {
      view = <p>Error</p>;
    } else if (status === LOADED && contact) {
      view = (
        <Fragment>
          <h3>{contact.name}</h3>
          <p>
            <a href={`tel:${contact.phone_number}`}>{contact.phone_number}</a>
          </p>
          <p>{contact.address}</p>
        </Fragment>
      );
    }

    return view;
  }
}

Detail.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
  })
};

export default Detail;
