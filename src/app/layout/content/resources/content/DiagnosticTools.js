import React from 'react';

import DiagnosticForm from './diagnosticTools/DiagnosticForm';

export default class DiagnosticTools extends React.Component {
  componentDidMount() {
    document.title = 'Diagnostic Tools';
  }
  render() {
    return (
      <div
        className="main container"
        style={{ marginTop: '3.5em', padding: '2em', minHeight: '600px' }}
      >
        <DiagnosticForm />
      </div>
    );
  }
}
