import React from 'react';
import { Select } from 'react-select';
import LetsGoButton from './testSelector/LetsGoButton';
import Dropdown from './testSelector/Dropdown';

export default class TestSelector extends React.Component {
  render() {
    return (
      <div>
        <Dropdown
          title={'Select a test...'}
          selectedTestName={this.props.selectedTestName}
          selectedTestID={this.props.selectedTestID}
          availableTests={this.props.availableTests}
          handleChange={this.props.handleChange}
          value={this.props.selectedTestID}
          label={this.props.selectedTest}
          data-id={this.props.selectedTestID}
        />
        <br />
        <LetsGoButton
          loadingTestStatus={this.props.loadingTestStatus}
          handleSubmit={this.props.handleSubmit}
        />
      </div>
    );
  }
}
