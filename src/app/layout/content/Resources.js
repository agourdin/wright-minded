import React from 'react';

import Content from './resources/Content';

export default class Resources extends React.Component {
  componentDidMount() {
    document.title = 'Resources';
  }
  render() {
    return (
      <div className="resources hero is-fullheight">
        <Content />
      </div>
    );
  }
}
