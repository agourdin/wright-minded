// MODULES //
import React from 'react';

// TESTING DATA //
// import _sections from './sections.json';
// import conversionChart from './satResults/conversion_chart';

// COMPONENTS //
import SATResultsLayout from './satResults/SATResultsLayout';
// import StartOverButton from './diagnosticFormSection/navButtons/StartOverButton';

// FUNCTIONS //
import scoreTest from './satResults/scoreTest';
import aggregateTest from './satResults/aggregateTest';
import calculateOverallScores from './satResults/calculateOverallScores';

export default class SATResults extends React.Component {
  componentDidMount() {
    var scoredTest = scoreTest(this.props.sections);
    var aggregatedTest = aggregateTest(scoredTest);
    let user = null;
    if (this.props.user) {
      user = this.props.user.id;
    }
    this.props.postUserAnswers(
      user,
      this.props.selectedTestID,
      JSON.stringify(aggregatedTest)
    );
  }
  render() {
    // TESTING
    // var selectedTestName = 'SAT Practice Test #1';
    // var scoredTest = scoreTest(_sections);
    // REAL
    var selectedTestName = this.props.selectedTestName;
    var scoredTest = scoreTest(this.props.sections);
    var aggregatedTest = aggregateTest(scoredTest);
    var conversionChart = this.props.conversionChart;
    var overallScores = calculateOverallScores(aggregatedTest, conversionChart);
    return (
      <SATResultsLayout
        selectedTestName={selectedTestName}
        overallScores={overallScores}
        /////////////
        // TESTING //
        /////////////
        // reading={aggregateTest(scoreTest(_sections)).find(
        //   x => x.section === 'Reading'
        // )}
        // writing={aggregateTest(scoreTest(_sections)).find(
        //   x => x.section === 'Writing'
        // )}
        // mathNoCalc={aggregateTest(scoreTest(_sections)).find(
        //   x => x.section === 'Math No Calculator'
        // )}
        // mathCalc={aggregateTest(scoreTest(_sections)).find(
        //   x => x.section === 'Math Calculator'
        // )}
        // mathCombined={aggregateTest(scoreTest(_sections)).find(
        //   x => x.section === 'Math Combined'
        // )}
        //////////
        // REAL //
        //////////
        reading={aggregatedTest.find(x => x.section === 'Reading')}
        writing={aggregatedTest.find(x => x.section === 'Writing')}
        mathNoCalc={aggregatedTest.find(
          x => x.section === 'Math No Calculator'
        )}
        mathCalc={aggregatedTest.find(x => x.section === 'Math Calculator')}
        mathCombined={aggregatedTest.find(x => x.section === 'Math Combined')}
      />
    );
  }
}
