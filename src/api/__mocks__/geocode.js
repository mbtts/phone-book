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

const initialiseMapsApi = jest.fn().mockImplementation(() => {
  return Promise.resolve({});
});

const geoCode = jest.fn().mockImplementation(() => {
  return Promise.resolve({
    lat: 53.6980027,
    lng: -2.476654
  });
});

export { geoCode, initialiseMapsApi, createMockGeocoder };
