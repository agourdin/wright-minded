import React from 'react';
import LetsGoButton from './testSelector/LetsGoButton';
import Dropdown from './testSelector/Dropdown';

export default class TestSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false
    };

    this.toggleList = this.toggleList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event) {
    this.setState({
      listOpen: false
    });
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  handleClick(event) {
    this.props.handleChange(event);
    this.setState({
      listOpen: false
    });
  }

  render() {
    return (
      <div className="test-selection-window hero is-fullheight">
        <div className="section">
          <div>
            Welcome to the diagnostic tools section. Here you can select a test,
            enter your answers, and get a breakdown of how you did. Start by
            selecting a test from the list below:
          </div>
          <Dropdown
            title={'Select a test...'}
            selectedTestName={this.props.selectedTestName}
            selectedTestID={this.props.selectedTestID}
            availableTests={this.props.availableTests}
            handleChange={this.props.handleChange}
            handleClick={this.handleClick}
            handleClickOutside={this.handleClickOutside}
            toggleList={this.toggleList}
            listOpen={this.state.listOpen}
            value={this.props.selectedTestID}
            label={this.props.selectedTest}
            data-id={this.props.selectedTestID}
          />
          <div className="divider" />
          <LetsGoButton
            loadingTestStatus={this.props.loadingTestStatus}
            handleSubmit={this.props.handleSubmit}
          />
        </div>
      </div>
    );
  }
}
