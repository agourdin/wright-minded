import React from 'react';

class HowItWorks extends React.Component {
  componentDidMount() {
    document.title = 'How It Works';
  }
  render() {
    return (
      <div>
        <p>This is the How It Works page</p>
      </div>
    );
  }
}

export default HowItWorks;
