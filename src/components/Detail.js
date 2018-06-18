import { ERROR, LOADED, LOADING } from "../api/status";
import React, { PureComponent } from "react";

import ContactMap from "./ContactMap";
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
        <div className="contact">
          <h3 className="contact__name">{contact.name}</h3>
          <ContactMap contact={contact} />
          <p className="contact__field contact__field--phone">
            <a className="contact__link" href={`tel:${contact.phone_number}`}>
              {contact.phone_number}
            </a>
          </p>
          <p className="contact__field contact__field--address">
            {contact.address}
          </p>
        </div>
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
