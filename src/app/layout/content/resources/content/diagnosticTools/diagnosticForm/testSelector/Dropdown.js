import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/pro-regular-svg-icons';

class Dropdown extends React.Component {
  handleClickOutside(event) {
    this.props.handleClickOutside();
  }

  render() {
    var list = this.props.availableTests;
    var listOpen = this.props.listOpen;
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
      <div className="test-selector">
        <div>
          <select
            className="hidden-select"
            onChange={this.props.handleChange}
            value={this.props.selectedTestID}
            label={this.props.selectedTest}
            data-id={this.props.selectedTestID}
          >
            {availableTestsList}
          </select>
        </div>

        <div
          className="displayed-select"
          ref={node => {
            this.node = node;
          }}
        >
          <div
            className={listOpen ? 'selected-option open' : 'selected-option'}
            onClick={this.props.toggleList}
          >
            <div className="selected-option-name">
              {this.props.selectedTestName
                ? this.props.selectedTestName
                : 'Select a test'}
            </div>
            <FontAwesomeIcon
              className="arrow"
              icon={listOpen ? faAngleUp : faAngleDown}
            />
          </div>
          {listOpen && (
            <ul className="option-list">
              {list.map(test => (
                <li
                  className="option-item"
                  key={test.id}
                  value={test.id}
                  onClick={this.props.handleClick}
                >
                  {test.test_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default onClickOutside(Dropdown);