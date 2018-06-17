import React, { PureComponent } from "react";

import PropTypes from "prop-types";

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.onChange(value);
  };

  render() {
    return (
      <input
        name="search"
        type="search"
        disabled={this.props.disabled}
        value={this.state.search}
        onChange={this.onChange}
      />
    );
  }
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default Search;
