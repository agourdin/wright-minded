import React from 'react'
import PropTypes from 'prop-types'

import Router from './layout/Router'
import Header from './layout/Header'
import Content from './layout/Content'
import Footer from './layout/Footer'

const Layout = ({ children }) => (
  <div>
    <Header />
    <Content>
      <Router />
    </Content>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout
