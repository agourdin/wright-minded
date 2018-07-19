import React from 'react';

class WhoIAm extends React.Component {
  componentDidMount() {
    document.title = 'Who I Am';
  }
  render() {
    return (
      <div className="hero is-fullheight">
        <p style={{ marginTop: '10em' }}>This is the Who I Am page</p>
      </div>
    );
  }
}

export default WhoIAm;
