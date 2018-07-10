import React from 'react';

import Box from './gridInQuestionRow/Box';

export default class GridInQuestionRow extends React.Component {
  render() {
    var boxes = [];
    for (var i = 0; i < this.props.boxes * 1; i++) {
      boxes.push(i);
    }
    return boxes.map(box => (
      <Box
        key={box}
        box={box}
        onClick={this.props.onClick}
        onChange={this.props.onChange}
        questionNumber={this.props.questionNumber}
        rowAnswer={this.props.rowAnswer}
        cursor={this.props.cursor}
        subCursor={this.props.subCursor}
      />
    ));
  }
}
