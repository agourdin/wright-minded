import { expect } from 'chai';
import sinon from 'sinon';
import { expect as expectJ } from 'jest';
import { mount, render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.expect = expect;
global.expectJ = expectJ;

global.sinon = sinon;

global.mount = mount;
global.render = render;
global.shallow = shallow;
