import React from 'react';

export default class AnswerFormStartOverButton extends React.Component {
  render() {
    return (
      <div
        className="button"
        onClick={this.props.handleStartOver}
        value="Start Over">
        Start Over
      </div>
    );
  }
}
