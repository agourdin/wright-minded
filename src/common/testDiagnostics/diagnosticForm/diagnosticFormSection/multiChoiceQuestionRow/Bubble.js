import React from 'react';

class Bubble extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.rowAnswer === this.props.choice
            ? 'bubble button is-rounded is-active'
            : 'bubble button is-rounded'
        }
        onClick={this.props.onClick}
        data-choice={this.props.choice}
        data-question={this.props.questionNumber}
        id={this.props.questionNum + this.props.choice}
      >
        {this.props.choice}
      </div>
    );
  }
}

export default Bubble;
