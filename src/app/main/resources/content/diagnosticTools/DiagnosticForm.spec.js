import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import DiagnosticForm from './DiagnosticForm';

import TestSelector from './diagnosticForm/TestSelector';
import DiagnosticFormSection from './diagnosticForm/DiagnosticFormSection';
import loadTestToStore from '../../../../../../redux/actions/load_test_to_store';
import getAvailableTests from '../../../../../../redux/actions/get_available_tests';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);
const initialState = {
  diagnosticTools: {}
};

const store = mockStore(initialState);

describe('DiagnosticForm.spec.js // DiagnosticForm Integration Tests', () => {
  // describe('Internal functions tests', () => {
  //   test('')
  // })
  // describe('render()', () => {
  //   it('renders the component', () => {
  //     const wrapper = shallow(<DiagnosticForm store={store} />);
  //     const component = wrapper.dive();
  //     expect(wrapper.find('div').hasClass('is-active')).to.equal(true);
  //
  //     // expectJ(toJson(component)).toMatchSnapshot();
  //   });
  // });
});
