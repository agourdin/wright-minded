import React from 'react';

export default class LetsGoButton extends React.Component {
  render() {
    return (
      <div
        className={
          // 'lets-go button'
          this.props.loadingTestStatus
            ? 'lets-go button is-loading'
            : 'lets-go button'
        }
        onClick={this.props.handleSubmit}
        value="Let's Go!"
      >
        Let's Go!
      </div>
    );
  }
}
