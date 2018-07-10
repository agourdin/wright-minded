import React from 'react';
import LetsGoButton from './testSelector/LetsGoButton';

export default class TestSelector extends React.Component {
  render() {
    var availableTestsList = [
      <option key={0} value={0}>
        Select a test...
      </option>
    ];
    var availableTests = this.props.availableTests;
    if (availableTests) {
      for (var i = 0; i < availableTests.length; i++) {
        var test = availableTests[i];
        availableTestsList.push(
          <option key={test.id} label={test.test_name} value={test.id}>
            {test.test_name}
          </option>
        );
      }
    } else {
      availableTestsList = ['Just a moment...'];
    }
    return (
      // <form onSubmit={this.props.handleSubmit}>
      <div>
        <select
          className="test-selector Select"
          onChange={this.props.handleChange}
          value={this.props.selectedTestID}
          label={this.props.selectedTest}
          data-id={this.props.selectedTestID}
        >
          {availableTestsList}
        </select>
        <br />
        <LetsGoButton
          loadingTestStatus={this.props.loadingTestStatus}
          handleSubmit={this.props.handleSubmit}
        />
      </div>
      // </form>
    );
  }
  // render() {
  //   var availableTestsList = [
  //     <option key={0} label={'Select a test...'} value={0}>
  //       Select a test...
  //     </option>
  //   ];
  //   var availableTests = this.props.availableTests;
  //   if (availableTests) {
  //     for (var i = 0; i < availableTests.length; i++) {
  //       var test = availableTests[i];
  //       availableTestsList.push(
  //         <option key={test.id} label={test.test_name} value={test.id}>
  //           {test.test_name}
  //         </option>
  //       );
  //     }
  //   } else {
  //     availableTestsList = [<div>Just a moment...</div>];
  //   }
  //   return (
  //     <form onSubmit={this.props.handleSubmit}>
  //       <div>
  //         <select
  //           className="test-selector Select"
  //           onChange={this.props.handleChange}
  //           value={this.props.selectedTestID}
  //           label={this.props.selectedTest}
  //           data-id={this.props.selectedTestID}
  //         >
  //           {availableTestsList}
  //         </select>
  //       </div>
  //       <LetsGoButton
  //         loadingTestStatus={this.props.loadingTestStatus}
  //         handleSubmit={this.props.handleSubmit}
  //       />
  //     </form>
  //   );
  // }
}
