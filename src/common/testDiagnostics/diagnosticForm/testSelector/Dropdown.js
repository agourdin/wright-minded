import React from 'react';
import onClickOutside from 'react-onclickoutside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/pro-regular-svg-icons';

import Collapse from '@material-ui/core/Collapse';

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
        </div>
        <Collapse
          in={listOpen}
          timeout={200}
          mountOnEnter
          unmountOnExit
          style={{
            position: 'absolute',
            zIndex: '30',
            width: '13em',
            cursor: 'pointer',
            fontSize: '1.25em',
            fontWeight: '600',
            border: '1px solid',
            borderColor: 'var(--grey)',
            borderTop: 'none',
            borderBottomLeftRadius: '0.2em',
            borderBottomRightRadius: '0.2em',
            maxHeight: '325px',
            overflowY: 'auto',
            marginBottom: 'auto',
            marginLeft: '0',
            marginTop: '0',
            marginRight: 'auto',
            marginLeft: 'auto',
            backgroundColor: 'var(--white)',
            boxShadow: '0px 1px 5px var(--light-grey)'
          }}
        >
          <div className="selectList">
            {list &&
              list.map(test => (
                <option
                  className="option-item"
                  key={test.id}
                  value={test.id}
                  onClick={this.props.handleClick}
                >
                  {test.test_name}
                </option>
              ))}
          </div>
        </Collapse>
      </div>
    );
  }
}

export default onClickOutside(Dropdown);
