import React from 'react';

export default class SATResultsLayout extends React.Component {
  rowRender(qtg, rowArray) {
    var qtg_heading = qtg.question_type_group.toUpperCase();
    rowArray.push(
      <div
        id={qtg_heading.replace(/\s/g, '').replace(/&/g, '')}
        key={qtg_heading}
        className="columns is-multiline is-mobile is-narrow bordered text-size-2 mobile-text-size-2 text-centered text-bold text-color-dark more-space-top-bottom-row"
      >
        <div className="column is-6 text-italic vertically-aligned">
          {qtg_heading}
        </div>
        <div className="column is-2 vertically-aligned">{qtg.total}</div>
        <div className="column is-2 vertically-aligned">
          {qtg.total - qtg.correct}
        </div>
        <div className="column is-2 vertically-aligned">
          {Math.round(qtg.correct / qtg.total * 100) + '%'}
        </div>
      </div>
    );
    qtg.question_types.forEach(qt => {
      var qt_heading = qt.question_type;
      rowArray.push(
        <div key={qt_heading}>
          <div className="columns is-multiline is-mobile bordered is-narrow text-size-1 mobile-text-size-1 text-centered text-color-dark more-space-top-bottom-qt-row">
            <div className="column is-6 text-bold background-color-light">
              {qt_heading}
            </div>
            <div className="column is-2 vertically-aligned">{qt.total}</div>
            <div className="column is-2 vertically-aligned">
              {qt.total - qt.correct}
            </div>
            <div className="column is-2 vertically-aligned">
              {Math.round(qt.correct / qt.total * 100) + '%'}
            </div>
          </div>
        </div>
      );
    });
    rowArray.push(
      <div
        key={qtg.question_type_group + 'divider'}
        className="columns is-gapless is-multiline is-mobile bordered is-narrow background-color-dark"
      >
        <div className="column is-12 divider" />
      </div>
    );
  }

  render() {
    var reading = this.props.reading;
    var writing = this.props.writing;
    var mathCalc = this.props.mathCalc;
    var mathNoCalc = this.props.mathNoCalc;
    var mathCombined = this.props.mathCombined;
    var readingRows = [];
    var writingRows = [];
    var mathRows = [];
    reading.question_type_groups.forEach(qtg =>
      this.rowRender(qtg, readingRows)
    );
    writing.question_type_groups.forEach(qtg =>
      this.rowRender(qtg, writingRows)
    );
    mathCombined.question_type_groups.forEach(qtg =>
      this.rowRender(qtg, mathRows)
    );

    return (
      <div className="diagnostic-results">
        <div className="section score">
          <div className="columns is-gapless is-multiline is-mobile">
            <div className="column is-12 text-centered text-bold background-color-reg less-space">
              <div className="text-size-3">{this.props.selectedTestName}</div>
              <div className="text-size-5 small-negative-space-top">
                Breakdown
              </div>
            </div>
          </div>
          <div className="columns is-gapless is-multiline is-mobile more-space-top-bottom">
            <div className="column is-6 has-text-right text-size-4 text-bold">
              Your Score:
            </div>
            <div className="column is-2 text-centered text-size-4 text-bold">
              {this.props.overallScores.overall}
            </div>
            <div className="column is-6 has-text-right text-size-3 text-bold">
              Reading & Writing:
            </div>
            <div className="column is-2 text-centered text-size-3 text-bold">
              {this.props.overallScores.readingAndWritingSectionScore}
            </div>
            <div className="column is-6 has-text-right text-size-3 text-bold">
              Math:
            </div>
            <div className="column is-2 text-centered text-size-3 text-bold">
              {this.props.overallScores.mathSectionScore}
            </div>
          </div>
        </div>

        <div className="section-divider" />

        <div className="section reading">
          <div className="columns is-multiline is-mobile bordered">
            <div className="column is-12 bordered-bottom text-centered text-size-4 text-bold background-color-reg less-space">
              READING
            </div>
          </div>
          <div className="columns is-gapless is-multiline is-mobile bordered-top text-size-3 more-space-top-bottom">
            <div className="column is-6 mobile-text-size-3 text-right text-bold text-color-dark">
              Your Score:
            </div>
            <div className="column is-2 text-centered text-semibold text-color-reg vertically-aligned-score-mobile">
              {reading.correct + '/' + reading.total}
            </div>
            <div className="column is-2 text-centered text-semibold text-color-reg vertically-aligned-score-mobile">
              {Math.round(reading.correct / reading.total * 100) + '%'}
            </div>
          </div>
          <div className="columns is-gapless is-multiline is-mobile bordered text-size-2 text-bold text-centered background-color-reg">
            <div className="column is-6">Question Type</div>
            <div className="column is-2">Total</div>
            <div className="column is-2">Missed</div>
            <div className="column is-2">Score</div>
          </div>
          {readingRows}
        </div>

        <div className="section-divider" />

        <div className="section writing">
          <div className="columns is-multiline is-mobile bordered">
            <div className="column is-12 bordered-bottom text-centered text-size-4 text-bold background-color-reg less-space">
              WRITING
            </div>
          </div>
          <div className="columns is-gapless is-multiline is-mobile bordered-top text-size-3 more-space-top-bottom">
            <div className="column is-6 mobile-text-size-3 text-right text-bold text-color-dark">
              Your Score:
            </div>
            <div className="column is-2 text-centered text-semibold text-color-reg vertically-aligned-score-mobile">
              {writing.correct + '/' + writing.total}
            </div>
            <div className="column is-2 text-centered text-semibold text-color-reg vertically-aligned-score-mobile">
              {Math.round(writing.correct / writing.total * 100) + '%'}
            </div>
          </div>
          <div className="columns is-gapless is-multiline is-mobile bordered text-size-2 text-bold text-centered background-color-reg">
            <div className="column is-6">Question Type</div>
            <div className="column is-2">Total</div>
            <div className="column is-2">Missed</div>
            <div className="column is-2">Score</div>
          </div>
          {writingRows}
        </div>

        <div className="section-divider" />

        <div className="section math">
          <div className="columns is-multiline is-mobile bordered">
            <div className="column is-12 bordered-bottom text-centered text-size-4 text-bold background-color-reg less-space">
              MATH
            </div>
          </div>
          <div className="columns is-gapless is-multiline is-mobile bordered-top more-space-top-bottom">
            <div className="column is-6 mobile-text-size-3 text-size-3 text-right text-bold text-color-dark more-space-top-bottom-smaller">
              Your Score:
            </div>
            <div className="column is-2 text-size-3 text-centered text-semibold text-color-reg vertically-aligned vertically-aligned-score-mobile-math more-space-top-bottom-smaller">
              {mathCombined.correct + '/' + mathCombined.total}
            </div>
            <div className="column is-2 text-size-3 text-centered text-semibold text-color-reg vertically-aligned vertically-aligned-score-mobile-math more-space-top-bottom-smaller">
              {Math.round(mathCombined.correct / mathCombined.total * 100) +
                '%'}
            </div>
            <div className="column is-6 text-size-2 mobile-text-size-1-plus text-right text-bold text-color-dark more-space-bottom-smaller">
              No Calculator:
            </div>
            <div className="column is-2 text-size-2 text-centered text-semibold text-color-light vertically-aligned vertically-aligned-score-mobile-math more-space-bottom-smaller">
              {mathNoCalc.correct + '/' + mathNoCalc.total}
            </div>
            <div className="column is-2 text-size-2 text-centered text-semibold text-color-light vertically-aligned vertically-aligned-score-mobile-math more-space-bottom-smaller">
              {Math.round(mathNoCalc.correct / mathNoCalc.total * 100) + '%'}
            </div>
            <div className="column is-6 text-size-2 mobile-text-size-1-plus text-right text-bold text-color-dark more-space-bottom-small more-space-bottom-smaller">
              Calculator:
            </div>
            <div className="column is-2 text-size-2 text-centered text-semibold text-color-light vertically-aligned vertically-aligned-score-mobile-math more-space-bottom-smaller">
              {mathCalc.correct + '/' + mathCalc.total}
            </div>
            <div className="column is-2 text-size-2 text-centered text-semibold text-color-light vertically-aligned vertically-aligned-score-mobile-math more-space-bottom-smaller">
              {Math.round(mathCalc.correct / mathCalc.total * 100) + '%'}
            </div>
          </div>
          <div className="columns is-gapless is-multiline is-mobile bordered text-size-2 text-bold text-centered background-color-reg">
            <div className="column is-6">Question Type</div>
            <div className="column is-2">Total</div>
            <div className="column is-2">Missed</div>
            <div className="column is-2">Score</div>
          </div>
          {mathRows}
        </div>

        <div className="section-divider" />
      </div>
    );
  }
}
