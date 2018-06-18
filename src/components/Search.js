import React, { Fragment, PureComponent } from "react";

import PropTypes from "prop-types";
import SVGInline from "react-svg-inline";
import cancel from "../../assets/svg/round-cancel-24px.svg";

class Search extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <input
          name="search"
          type="text"
          placeholder="Search…"
          autoComplete="off"
          disabled={this.props.disabled}
          value={this.props.value}
          onChange={this.props.onChange}
          className={this.props.className}
        />
        <button
          onClick={this.props.onClearClick}
          className={this.props.clearClassName}
          disabled={this.props.value === ""}
        >
          <SVGInline width="24" svg={cancel} />
        </button>
      </Fragment>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  onClearClick: PropTypes.func.isRequired,
  clearClassName: PropTypes.string.isRequired
};

export default Search;
