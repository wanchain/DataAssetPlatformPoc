import React from 'react';

class AlertDialog extends React.Component {
  static propTypes = {
    content: React.PropTypes.string
  };
  render() {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
          <h4 className="modal-title" id="myModalLabel">提示</h4>
        </div>
        <div className="modal-body">
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
}

export default AlertDialog;
