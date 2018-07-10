import React from 'react';

class WhoIAm extends React.Component {
  componentDidMount() {
    document.title = 'Who I Am';
  }
  render() {
    return (
      <div style={{ marginTop: '5em' }}>
        <p>This is the Who I Am page</p>
      </div>
    );
  }
}

export default WhoIAm;
