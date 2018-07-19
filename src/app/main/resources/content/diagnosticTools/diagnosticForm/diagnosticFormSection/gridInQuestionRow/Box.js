import React from 'react';

export default class Box extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.subCursor === this.props.box &&
          this.props.cursor === this.props.questionNumber * 1 - 1
            ? 'box button is-active'
            : 'box button'
        }
        type="text"
        maxLength="1"
        value={
          this.props.rowAnswer === undefined
            ? null
            : this.props.rowAnswer[this.props.box]
        }
        onChange={this.props.onChange}
        onClick={this.props.onClick}
        data-input={this.props.choice}
        data-box={this.props.box}
        data-question={this.props.questionNumber}
      >
        {this.props.rowAnswer === undefined
          ? null
          : this.props.rowAnswer[this.props.box]}
      </div>
    );
  }
}
