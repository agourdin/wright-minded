import React from 'react';

class RatesAndServices extends React.Component {
  componentDidMount() {
    document.title = 'Rates & Services';
  }
  render() {
    return (
      <div style={{ marginTop: '5em' }}>
        <p>This is the Rates & Services page</p>
      </div>
    );
  }
}

export default RatesAndServices;
