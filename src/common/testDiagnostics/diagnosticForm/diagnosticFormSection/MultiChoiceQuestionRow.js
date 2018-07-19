import React from 'react';

import Bubble from './multiChoiceQuestionRow/Bubble';

export default class MultiChoiceQuestionRow extends React.Component {
  render() {
    var choices = this.props.choices;
    return choices.map(choice => (
      <Bubble
        key={choice}
        onClick={this.props.onClick}
        choice={choice}
        questionNumber={this.props.questionNumber}
        rowAnswer={this.props.rowAnswer}
      />
    ));
  }
}
