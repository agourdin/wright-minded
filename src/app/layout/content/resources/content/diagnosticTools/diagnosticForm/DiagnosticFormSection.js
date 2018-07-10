import React from 'react';

import MultiChoiceQuestionRow from './diagnosticFormSection/MultiChoiceQuestionRow';
import GridInQuestionRow from './diagnosticFormSection/GridInQuestionRow';
import StartOverButton from './diagnosticFormSection/navButtons/StartOverButton';

export default class DiagnosticFormSection extends React.Component {
  componentDidMount() {
    document.body.addEventListener('keydown', this.props.handleKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.props.handleKeyDown);
  }

  render() {
    var section = this.props.sections[this.props.step];
    var rows = [];
    for (var q in section) {
      var question = section[q];
      var className =
        this.props.cursor === question.question_num * 1 - 1
          ? 'question-row is-active'
          : 'question-row';
      var choices = ['A', 'B', 'C', 'D', 'E'].slice(0, question.num_inputs * 1);
      var boxes = question.num_inputs * 1;
      if (question.input_type === 'bubble') {
        rows.push(
          <div key={question.question_num} className={className}>
            {question.question_num}.&nbsp;
            <MultiChoiceQuestionRow
              id={question.id}
              onClick={this.props.handleBubbleClick}
              questionNumber={question.question_num}
              rowAnswer={question.user_answer}
              choices={choices}
            />
          </div>
        );
      } else if (question.input_type === 'gridin') {
        rows.push(
          <div key={question.question_num} className={className}>
            {question.question_num}.&nbsp;
            <GridInQuestionRow
              id={question.id}
              onClick={this.props.handleGridInClick}
              onChange={this.props.handleGridInChange}
              questionNumber={question.question_num}
              cursor={this.props.cursor}
              subCursor={this.props.subCursor}
              rowAnswer={question.user_answer}
              boxes={boxes}
            />
          </div>
        );
      }
    }
    // Decide to Render Back button or not
    var backbutton;
    if (this.props.step === 0) {
      backbutton = <div />;
    } else {
      backbutton = (
        <div className="button" onClick={this.props.handleBack} value="Back">
          Back
        </div>
      );
    }
    return (
      <div>
        <p>Test: {this.props.selectedTestName}</p>
        <p>Section: {this.props.sectionNames[this.props.step]}</p>
        <form onSubmit={this.props.handleSubmit}>
          <div className="answer-grid">{rows}</div>
          {backbutton}
          <input className="button" type="submit" value="Save & Continue" />
          <StartOverButton handleStartOver={this.props.handleStartOver} />
        </form>
      </div>
    );
  }
}
