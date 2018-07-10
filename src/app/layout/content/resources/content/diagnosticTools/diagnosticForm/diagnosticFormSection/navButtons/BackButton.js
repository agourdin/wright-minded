import React from 'react';

export default class BackButton {
  render() {
    return (
      <div className="button" onClick={this.props.handleBack} value="Back">
        Back
      </div>
    );
  }
}
