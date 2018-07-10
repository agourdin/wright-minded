import React from 'react';
import App from './App';
import Layout from './app/Layout';

describe('App.spec.js // App Component', () => {
  it('should render the Layout component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Layout)).to.have.lengthOf(1);
  });
});
