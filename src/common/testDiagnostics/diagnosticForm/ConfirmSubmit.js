import React from 'react';

function ConfirmSubmit(props) {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.handleModalClick} />
      <div className="modal-card">
        <header className="modal-card-head">
          <div className="modal-card-title has-text-bold">
            Submit your answers?
          </div>
        </header>
        <section className="modal-card-body">
          Are you sure you're ready to submit your answers? Once you do this you
          can't go back and edit anything!
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={props.handleConfirmSubmit}
          >
            Yes, do it!
          </button>
          <button className="button" onClick={props.handleCancelSubmit}>
            Not yet
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ConfirmSubmit;
