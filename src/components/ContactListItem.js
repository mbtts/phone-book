import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

const ContactListItem = ({ contact }) => (
  <p>
    <Link to={`/user/${contact.id}`}>{contact.name}</Link>
  </p>
);

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
  }).isRequired
};

export default ContactListItem;
