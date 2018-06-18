const GLOBAL_INIT = "initMaps";

const cache = {};

const processResults = (address, results, resolve, reject) => {
  if (results[0]) {
    const location = results[0].geometry.location;
    const coords = { lat: location.lat(), lng: location.lng() };
    cache[address] = coords;
    resolve(coords);
  } else {
    reject("No results found");
  }
};

const geoCode = address => {
  return new Promise((resolve, reject) => {
    if (cache[address]) {
      return resolve(cache[address]);
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      status === "OK"
        ? processResults(address, results, resolve, reject)
        : reject(`Geocode error ${status}`);
    });
  });
};

const createInitialiser = resolve => () => {
  window[GLOBAL_INIT] = undefined;
  resolve(google);
};

const initialiseMapsApi = () => {
  return new Promise(resolve => {
    if (typeof google !== "undefined") {
      return resolve(google);
    }

    window[GLOBAL_INIT] = createInitialiser(resolve);
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      `https://maps.googleapis.com/maps/api/js?key=${
        process.env.GOOGLE_MAPS_API
      }&callback=${GLOBAL_INIT}`
    );
    document.body.appendChild(script);
  });
};

export { geoCode, initialiseMapsApi };
