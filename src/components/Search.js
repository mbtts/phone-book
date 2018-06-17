import React, { PureComponent } from "react";

import PropTypes from "prop-types";

class Search extends PureComponent {
  render() {
    return (
      <input
        name="search"
        type="search"
        placeholder="Search…"
        autoComplete="off"
        disabled={this.props.disabled}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default Search;
