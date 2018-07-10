/*

  TODO:
  * Rename everything sanely, comment all the code, run final tests
  * Start working on Results component

*/

//MODULES
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router';
//COMPONENTS
import TestSelector from './diagnosticForm/TestSelector';
import DiagnosticFormSection from './diagnosticForm/DiagnosticFormSection';
import SATResults from './diagnosticForm/SATResults';
//ACTIONS
import loadTestToStore from '../../../../../../redux/actions/diagnosticForm/load_test_to_store';
import loadSATConversionToStore from '../../../../../../redux/actions/diagnosticForm/load_sat_conversion_to_store';
import getAvailableTests from '../../../../../../redux/actions/diagnosticForm/get_available_tests';
import setLoadingTestStatus from '../../../../../../redux/actions/diagnosticForm/set_loading_test_status';
import setDiagnosticInProgressStatus from '../../../../../../redux/actions/diagnosticForm/set_diagnostic_in_progress_status';
import logUserAnswer from '../../../../../../redux/actions/diagnosticForm/log_user_answer';
import postUserAnswers from '../../../../../../redux/actions/diagnosticForm/post_user_answers';

class DiagnosticForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // API Compliant: NA
      // Redux Aligned: ✔
      // Tested: WARNING
      step: -1,
      cursor: 0,
      subCursor: 0,
      selectedTestName: '',
      selectedTestID: '',
      encoder_string: '97e42aY9spjdQQ&',
      completedTest: []
    };

    // API Compliant: NA
    // Redux Aligned: NA
    // Tested: WARNING
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleStartOver = this.handleStartOver.bind(this);
    this.handleTestSelect = this.handleTestSelect.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBubbleClick = this.handleBubbleClick.bind(this);
    this.handleGridInClick = this.handleGridInClick.bind(this);
    this.handleGridInChange = this.handleGridInChange.bind(this);
  }

  componentDidMount() {
    // API Compliant: ✔
    // Redux Aligned: ✔
    // Tested: WARNING
    this.props.getAvailableTests();
    var defaultSelectedTest = '';
    var defaultSelectedTestID = 0;
    this.setState({
      selectedTestName: defaultSelectedTest,
      selectedTestID: defaultSelectedTestID
    });
  }

  logMultiChoiceKeyDown(cursor, input) {
    // API Compliant: R4R
    // Redux Aligned: ✔
    // Tested: WARNING
    var step = this.state.step;
    var sections = this.props.sections; // REDUX PROPS - sections
    var question = cursor;
    var subCursor = this.state.subCursor;
    var isSameAnswerChoice = sections[step][question].user_answer === input;
    var user_answer = isSameAnswerChoice ? undefined : input;
    this.props.logUserAnswer(step, question, user_answer); // REDUX DISPATCH - logUserAnswer
    var newCursor = isSameAnswerChoice ? cursor : cursor * 1 + 1;
    var rowtype = this.returnRowType(newCursor);
    var newSubCursor = rowtype === 'gridin' ? 0 : subCursor;
    this.setState({
      cursor: newCursor,
      subCursor: newSubCursor
    });
  }

  logBubbleClick(question_num, input) {
    // API Compliant: R4R
    // Redux Aligned: ✔
    // Tested: WARNING
    var step = this.state.step;
    var sections = this.props.sections; // REDUX PROPS - Sections
    var question = question_num * 1 - 1;
    var isSameAnswerChoice = sections[step][question].user_answer === input;
    var user_answer = isSameAnswerChoice ? undefined : input;
    this.props.logUserAnswer(step, question, user_answer); // REDUX DISPATCH - logUserAnswer
    var newCursor = isSameAnswerChoice
      ? question_num * 1 - 1
      : question_num * 1;
    this.setState(() => ({
      cursor: newCursor
    }));
  }

  logGridInClick(question_num, key) {
    // API Compliant: NA
    // Redux Aligned: NA
    // Tested: WARNING
    var newCursor = question_num * 1 - 1;
    var newSubCursor = key * 1;
    this.setState({
      cursor: newCursor,
      subCursor: newSubCursor
    });
  }

  logGridInChange(question_num, key, input) {
    // API Compliant: R4R
    // Redux Aligned: ✔
    // Tested: WARNING
    var sections = this.props.sections; // REDUX PROPS - sections
    var step = this.state.step;
    var section = sections[step];
    var cursor = this.state.cursor;
    var subCursor = this.state.subCursor;
    var subCursorLimit =
      cursor >= section.length ? 0 : sections[step][cursor].num_inputs * 1;
    var newCursor;
    var user_answer =
      section[cursor].user_answer === ''
        ? new Array(subCursorLimit)
        : section[cursor].user_answer;
    user_answer.splice(key, 1, input);
    this.props.logUserAnswer(step, cursor, user_answer); // REDUX DISPATCH - logUserAnswer

    if (input == null) {
      newCursor = subCursor === 0 ? question_num * 1 - 1 : question_num * 1;
      var prevrowtype = this.returnRowType(newCursor);
      var newSubCursor = 0;
      if (prevrowtype === 'gridin') {
        newSubCursor = subCursor === 0 ? subCursorLimit * 1 - 1 : key * 1 - 1;
      }
      this.setState({
        cursor: newCursor,
        subCursor: newSubCursor
      });
    } else {
      newCursor =
        subCursor === subCursorLimit * 1 - 1
          ? question_num * 1 + 1
          : question_num * 1;
      newSubCursor = subCursor === subCursorLimit * 1 - 1 ? 0 : key * 1 + 1;
      this.setState({
        cursor: newCursor,
        subCursor: newSubCursor
      });
    }
  }

  returnRowType(cursor) {
    // API Compliant: R4R
    // Redux Aligned: ✔
    // Tested: WARNING
    var sections = this.props.sections; // REDUX ACCESS PROPS - sections
    var step = this.state.step;
    if (cursor >= sections[step].length) {
      return undefined;
    }
    return sections[step][cursor].input_type === undefined
      ? undefined
      : sections[step][cursor].input_type;
  }

  encodeTestUserAnswers(cleanedTestUserAnswers) {
    // API Compliant: R4R
    // Redux Aligned: NA
    // Tested: WARNING
    var encoder_string = this.state.encoder_string;
    return cleanedTestUserAnswers.join(encoder_string);
  }

  handleBubbleClick(event) {
    // API Compliant: NA
    // Redux Aligned: NA
    // Tested: WARNING
    this.logBubbleClick(
      event.target.dataset.question,
      event.target.dataset.choice
    );
    event.preventDefault();
  }

  handleGridInClick(event) {
    // API Compliant: NA
    // Redux Aligned: NA
    // Tested: WARNING
    this.logGridInClick(
      event.target.dataset.question,
      event.target.dataset.box
    );
    event.preventDefault();
  }

  handleGridInChange(event) {
    // API Compliant: NA
    // Redux Aligned: NA
    // Tested: WARNING
    this.logGridInChange(
      event.target.dataset.question,
      event.target.dataset.box,
      event.target.value
    );
    event.preventDefault();
  }

  handleSubmit(event) {
    // API Compliant: WARNING
    // Redux Aligned: R4R
    // Tested: WARNING
    if (this.state.step === -1) {
      if (this.state.selectedTestID === 0) {
        alert('Please select a test first!');
      } else {
        this.props.setDiagnosticInProgressStatus(true); // REDUX DISPATCH - setDiagnosticInProgressStatus
        this.setState(prevState => ({
          step: 0
        }));
      }
    } else if (this.state.step < this.props.sections.length) {
      this.setState(prevState => ({
        step: prevState.step * 1 + 1,
        cursor: 0
      }));
    }
    event.preventDefault();
  }

  handleBack(event) {
    // API Compliant: NA
    // Redux Aligned: NA
    // Tested: WARNING
    this.setState(prevState => ({
      step: prevState.step * 1 - 1,
      cursor: 0
    }));
  }

  // WARNING: Does not gracefully handle clearing the answers from sections in
  // Redux store
  handleStartOver(event) {
    // API Compliant: NA
    // Redux Aligned: R4R
    // Tested: WARNING
    this.props.setDiagnosticInProgressStatus(false); // REDUX DISPATCH - setDiagnosticInProgressStatus
    this.setState({
      selectedTestID: 0,
      step: -1,
      cursor: 0,
      subCursor: 0
    });
    event.preventDefault();
  }

  handleTestSelect(event) {
    // API Compliant: NA
    // Redux Aligned: R4R
    // Tested: WARNING
    if (event.target.value * 1 === 0) {
      this.setState({
        selectedTestName: 0,
        selectedTestID: 0
      });
    } else {
      var selectedTestID = event.target.value;
      var availableTests = this.props.available_tests; // REDUX ACCESS PROPS - available_tests
      var selectedTestName = availableTests.filter(
        test => test.id === event.target.value * 1
      )[0].test_name;
      this.props.loadTestToStore(selectedTestID); // REDUX DISPATCH - loadTestToStore
      this.props.loadSATConversionToStore(selectedTestID); // REDUX DISPATCH - loadSATConversionToStore
      this.setState({
        selectedTestName: selectedTestName,
        selectedTestID: selectedTestID
      });
    }
  }

  handleKeyDown(event) {
    // API Compliant: WARNING
    // Redux Aligned: Pending
    // Tested: WARNING
    var sections = this.props.sections; // REDUX PROPS - sections
    var step = this.state.step;
    var section = sections[step];
    var cursor = this.state.cursor;
    var subCursor = this.state.subCursor;
    var subCursorLimit =
      cursor >= section.length ? 0 : sections[step][cursor].num_inputs * 1;
    var newCursor;
    var newSubCursor;
    if (
      // UP ARROW
      event.keyCode === 38 &&
      cursor < section.length * 1 + 1 &&
      cursor > 0
    ) {
      newCursor = cursor * 1 - 1;
      newSubCursor =
        this.returnRowType(cursor) !== this.returnRowType(newCursor)
          ? 0
          : subCursor;
      this.setState({
        cursor: newCursor,
        subCursor: newSubCursor
      });
    } else if (
      // DOWN ARROW
      event.keyCode === 40 &&
      cursor < section.length * 1 - 1 &&
      cursor >= 0
    ) {
      newCursor = cursor * 1 + 1;
      newSubCursor =
        this.returnRowType(cursor) !== this.returnRowType(newCursor)
          ? 0
          : subCursor;
      this.setState({
        cursor: newCursor,
        subCursor: newSubCursor
      });
    } else if (event.keyCode === 13 && cursor === section.length * 1) {
      console.log('Firing inside "cursor = 52" if');
      this.handleSubmit(event);
    } else if (this.returnRowType(cursor) === 'bubble') {
      // BUBBLE
      if (
        // 1 / A
        (event.keyCode === 49 || event.keyCode === 65) &&
        cursor < section.length
      ) {
        this.logMultiChoiceKeyDown(cursor, 'A');
      } else if (
        // 2 / B
        (event.keyCode === 50 || event.keyCode === 66) &&
        cursor < section.length
      ) {
        this.logMultiChoiceKeyDown(cursor, 'B');
      } else if (
        // 3 / C
        (event.keyCode === 51 || event.keyCode === 67) &&
        cursor < section.length
      ) {
        this.logMultiChoiceKeyDown(cursor, 'C');
      } else if (
        // 4 / D
        (event.keyCode === 52 || event.keyCode === 68) &&
        cursor < section.length
      ) {
        this.logMultiChoiceKeyDown(cursor, 'D');
      } else if (
        // DELETE
        event.keyCode === 8 &&
        cursor <= section.length * 1 + 1 &&
        cursor >= 0
      ) {
        if (cursor === 0) {
          newCursor = 0;
        } else {
          newCursor = cursor * 1 - 1;
        }
        this.logMultiChoiceKeyDown(cursor, undefined);
        this.setState({
          cursor: newCursor
        });
      }
    } else if (this.returnRowType(cursor) === 'gridin') {
      const charcodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 190, 191];
      if (
        // 0-9 . /
        charcodes.includes(event.keyCode)
      ) {
        this.logGridInChange(cursor, subCursor, event.key);
      } else if (event.keyCode === 13) {
        if (cursor <= section.length) {
          newCursor = cursor * 1 + 1;
        } else if (cursor === section.length * 1) {
          this.handleSubmit(event);
        }
        this.setState({
          cursor: newCursor,
          subCursor: 0
        });
      } else if (event.keyCode === 8) {
        this.logGridInChange(cursor, subCursor, null);
      } else if (event.keyCode === 37) {
        if (subCursor === 0) {
          newCursor = cursor * 1 - 1;
          newSubCursor = subCursorLimit * 1 - 1;
          this.setState({
            cursor: newCursor,
            subCursor: newSubCursor
          });
        } else {
          newSubCursor = subCursor * 1 - 1;
          this.setState({ subCursor: newSubCursor });
        }
      } else if (event.keyCode === 39) {
        if (subCursor === subCursorLimit * 1 - 1) {
          newCursor = cursor * 1 + 1;
          newSubCursor = 0;
          this.setState({
            cursor: newCursor,
            subCursor: newSubCursor
          });
        } else {
          newSubCursor = subCursor * 1 + 1;
          this.setState({ subCursor: newSubCursor });
        }
      }
    }
  }

  render() {
    // API Compliant: WARNING
    // Redux Aligned: WARNING
    // Tested: WARNING
    // if (this.state.step === -1) {
    //   return (
    //     <TestSelector
    //       handleSubmit={this.handleSubmit}
    //       handleChange={this.handleTestSelect}
    //       availableTests={this.props.available_tests}
    //       selectedTestName={this.state.selectedTestName}
    //       selectedTestID={this.state.selectedTestID}
    //       loadingTestStatus={this.props.loading_test_status}
    //     />
    //   );
    // } else if (this.state.step < this.props.sections.length) {
    //   this.props.push('/resources/diagnostic-tools/section/' + this.state.step);
    //   return (
    //     <DiagnosticFormSection
    //       handleBubbleClick={this.handleBubbleClick}
    //       handleGridInClick={this.handleGridInClick}
    //       handleGridInChange={this.handleGridInChange}
    //       handleKeyDown={this.handleKeyDown}
    //       handleSubmit={this.handleSubmit}
    //       handleBack={this.handleBack}
    //       handleStartOver={this.handleStartOver}
    //       step={this.state.step}
    //       cursor={this.state.cursor}
    //       subCursor={this.state.subCursor}
    //       selectedTestName={this.state.selectedTestName}
    //       selectedTestID={this.state.selectedTestID}
    //       sections={this.props.sections}
    //       sectionNames={this.props.section_names}
    //     />
    //   );
    // } else {
    return (
      <SATResults
        sections={this.props.sections}
        sectionNames={this.props.section_names}
        selectedTestName={this.state.selectedTestName}
        conversionChart={this.props.conversion_chart}
      />
    );
    // }
  }
}

// BOILERPLATE
function mapStateToProps(state) {
  return {
    auth: state.auth,
    section_names: state.diagnostic_form.section_names,
    sections: state.diagnostic_form.sections,
    available_tests: state.diagnostic_form.available_tests,
    loading_test_status: state.diagnostic_form.loading_test_status,
    diagnostic_in_progress_status:
      state.diagnostic_form.diagnostic_in_progress_status,
    conversion_chart: state.diagnostic_form.conversion_chart
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      push: push,
      loadTestToStore: loadTestToStore,
      loadSATConversionToStore: loadSATConversionToStore,
      getAvailableTests: getAvailableTests,
      setLoadingTestStatus: setLoadingTestStatus,
      setDiagnosticInProgressStatus: setDiagnosticInProgressStatus,
      logUserAnswer: logUserAnswer,
      postUserAnswers: postUserAnswers
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticForm);
