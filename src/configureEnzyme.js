import { configure, mount, render, shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const flushPromises = async () =>
  new Promise(resolve => process.nextTick(resolve));

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.flushPromises = flushPromises;
