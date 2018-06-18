import { Gmaps, InfoWindow, Marker } from "react-gmaps";
import React, { PureComponent } from "react";
import { geoCode, initialiseMapsApi } from "../api/geocode";

import PropTypes from "prop-types";

class ContactMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await initialiseMapsApi();
    const coords = await geoCode(this.props.contact.address);
    this.setState({ coords });
  }

  render() {
    const map = this.state.coords ? (
      <Gmaps
        height={"30vh"}
        lat={this.state.coords.lat}
        lng={this.state.coords.lng}
        zoom={17}
        loadingMessage={"Loading…"}
      >
        <Marker
          lat={this.state.coords.lat}
          lng={this.state.coords.lng}
          draggable={true}
        />
      </Gmaps>
    ) : null;

    return <div className="map__container">{map}</div>;
  }
}

ContactMap.propTypes = {
  contact: PropTypes.shape({
    address: PropTypes.string.isRequired
  })
};

export default ContactMap;
