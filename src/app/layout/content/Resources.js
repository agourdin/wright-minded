import React from 'react';

import Content from './resources/Content';
import ResourcesSplash from './resources/content/ResourcesSplash';

export default class Resources extends React.Component {
  componentDidMount() {
    document.title = 'Resources';
  }
  render() {
    return (
      <div>
        <Content>
          <ResourcesSplash />
        </Content>
      </div>
    );
  }
}
