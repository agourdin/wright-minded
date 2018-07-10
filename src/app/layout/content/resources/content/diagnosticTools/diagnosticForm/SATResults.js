// MODULES //
import React from 'react';

// TESTING DATA //
import _sections from './sections.json';
import conversionChart from './satResults/conversion_chart';

// COMPONENTS //
import SATResultsLayout from './satResults/SATResultsLayout';
// import StartOverButton from './diagnosticFormSection/navButtons/StartOverButton';

// FUNCTIONS //
import scoreTest from './satResults/scoreTest';
import aggregateTest from './satResults/aggregateTest';
import calculateOverallScores from './satResults/calculateOverallScores';

export default class SATResults extends React.Component {
  render() {
    // TESTING
    var selectedTestName = 'SAT Practice Test #1';
    var scoredTest = scoreTest(_sections);
    // REAL
    // var selectedTestName = this.props.selectedTestName;
    // var conversionChart = this.props.conversionChart;
    // var scoredTest = scoreTest(this.props.sections);
    var aggregatedTest = aggregateTest(scoredTest);
    var overallScores = calculateOverallScores(aggregatedTest, conversionChart);
    return (
      <SATResultsLayout
        selectedTestName={selectedTestName}
        overallScores={overallScores}
        /////////////
        // TESTING //
        /////////////
        reading={aggregateTest(scoreTest(_sections)).find(
          x => x.section === 'Reading'
        )}
        writing={aggregateTest(scoreTest(_sections)).find(
          x => x.section === 'Writing'
        )}
        mathNoCalc={aggregateTest(scoreTest(_sections)).find(
          x => x.section === 'Math No Calculator'
        )}
        mathCalc={aggregateTest(scoreTest(_sections)).find(
          x => x.section === 'Math Calculator'
        )}
        mathCombined={aggregateTest(scoreTest(_sections)).find(
          x => x.section === 'Math Combined'
        )}
        //////////
        // REAL //
        //////////
        // reading={aggregateTest(scoreTest(this.props.sections)).find(
        //   x => x.section === 'Reading'
        // )}
        // writing={aggregateTest(scoreTest(this.props.sections)).find(
        //   x => x.section === 'Writing'
        // )}
        // mathNoCalc={aggregateTest(scoreTest(this.props.sections)).find(
        //   x => x.section === 'Math No Calculator'
        // )}
        // mathCalc={aggregateTest(scoreTest(this.props.sections)).find(
        //   x => x.section === 'Math Calculator'
        // )}
        // mathCombined={aggregateTest(scoreTest(this.props.sections)).find(
        //   x => x.section === 'Math Combined'
        // )}
      />
    );
  }
}
