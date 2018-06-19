import { geoCode, initialiseMapsApi } from "./geocode";

import { createMockGeocoder } from "./__mocks__/geocode";

describe("geocode api", () => {
  afterEach(() => {
    global.google = undefined;
  });

  it("resolves coordinates from an address", async () => {
    global.google = {
      maps: {
        Geocoder: createMockGeocoder("OK", 53.6980027, -2.476654)
      }
    };

    await expect(geoCode("Tockholes Rd, Darwen BB3, UK")).resolves.toEqual({
      lat: 53.6980027,
      lng: -2.476654
    });
  });

  it("resolves subsequent address lookups from the cache", async () => {
    global.google = {
      maps: {
        Geocoder: jest.fn()
      }
    };

    await expect(geoCode("Tockholes Rd, Darwen BB3, UK")).resolves.toEqual({
      lat: 53.6980027,
      lng: -2.476654
    });

    expect(global.google.maps.Geocoder).toHaveBeenCalledTimes(0);
  });

  it("errors if coordinates cannot be resolved from address", async () => {
    global.google = {
      maps: {
        Geocoder: createMockGeocoder("ERROR", 53.6980027, -2.476654)
      }
    };

    await expect(geoCode("17 Anchor Ave, Darwen BB3 0AZ, UK")).rejects.toEqual(
      "Geocode error: ERROR"
    );
  });

  it("initialises map api via callback if required", async () => {
    process.nextTick(() => {
      global.google = jest.fn();
      expect(window.initMaps).toBeDefined();
      window.initMaps();
    });

    const google = await initialiseMapsApi();
    expect(window.initMaps).toBeUndefined();
    expect(google).toBe(global.google);
  });

  it("reuses the map api if previously initialised", async () => {
    global.google = jest.fn();
    const google = await initialiseMapsApi();
    expect(window.initMaps).toBeUndefined();
    expect(google).toBe(global.google);
  });
});
