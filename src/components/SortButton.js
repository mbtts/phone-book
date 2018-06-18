import React, { PureComponent } from "react";

import PropTypes from "prop-types";
import SVGInline from "react-svg-inline";
import arrowDropDown from "../../assets/svg/round-arrow_drop_down-24px.svg";
import arrowDropUp from "../../assets/svg/round-arrow_drop_up-24px.svg";

class SortButton extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const asc = this.props.order === "asc";
    const label = asc ? "Asc" : "Desc";
    const icon = asc ? arrowDropUp : arrowDropDown;
    return (
      <button onClick={this.props.onClick} className={this.props.className}>
        <SVGInline width="24" svg={this.props.icon} />
        <span>{label}</span>
        <SVGInline width="24" svg={icon} />
      </button>
    );
  }
}

SortButton.propTypes = {
  icon: PropTypes.string.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

export default SortButton;
