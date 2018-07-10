import React from 'react';
import renderer from 'react-test-renderer';

import Router from './layout/Router';
import Header from './layout/Header';
import Content from './layout/Content';
import Footer from './layout/Footer';
import Layout from './Layout';

describe('Layout.snapshot.js // Layout Snapshot', () => {
  test('renders', () => {
    const component = renderer.create(<Layout />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
