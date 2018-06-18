const mockData = [
  {
    id: 0,
    name: "Oleta Level",
    phone_number: "+442032960159",
    address: "10 London Wall, London EC2M 6SA, UK"
  },
  {
    id: 6,
    name: "Stanley Vanderhoof",
    phone_number: "+442032960000",
    address: "17 Anchor Ave, Darwen BB3 0AZ, UK"
  }
];

const api = jest.fn().mockImplementation(() => {
  return Promise.resolve(mockData);
});

export { api as default, mockData };
