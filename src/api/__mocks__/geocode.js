const createResults = (lat, lang) => [
  {
    geometry: {
      location: {
        lat: () => lat,
        lng: () => lang
      }
    }
  }
];

const createMockGeocoder = (status, lat, lang) => {
  const results = createResults(lat, lang);
  return function() {
    return {
      geocode: (address, callback) => callback(results, status)
    };
  };
};

export { createMockGeocoder };
