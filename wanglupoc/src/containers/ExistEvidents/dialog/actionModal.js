import React from 'react';
import AlertDialog from './alert';
import CProgress from '../progress/circularprogress';
import {LAYOUT_PROOF} from '../constants';

class ActionModal extends React.Component {
  constructor(props) {
    super(props);
  }

  copyShortCodeClick(shortCode) {
    if (__DEVELOPMENT__) console.log('copyShortCodeClick');
    const link = '/#' + LAYOUT_PROOF + '/' + shortCode;
    window.location.href = link;
    if (__DEVELOPMENT__) console.log('link=' + link);

    return false;
  }

  render() {
    let txHashContent;
    const txHash = this.props.txhash;
    if (txHash === 'undefined' || txHash === '') {
      txHashContent = <CProgress/>;
    } else {
      txHashContent = txHash;
    }

    let shortCodeContent;
    const shortCode = this.props.shortCodeValue;
    if (shortCode === 'undefined' || shortCode === '') {
      shortCodeContent = <CProgress/>;
    } else {
      shortCodeContent = (
        <a onClick={this.copyShortCodeClick.bind(this, shortCode)} data-dismiss="modal" >
          {shortCode}
        </a>
      );
    }

    if (this.props.toggleType === 'action') {
      return (
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="modal-title" id="myModalLabel">生成短码</h4>
          </div>
          <div className="modal-body">
            <div className="inline-div">
              交易：&nbsp;&nbsp;&nbsp;
            </div>
            <div className="inline-div">
              {txHashContent}
            </div>
            <div >
              <div className="inline-div">
                短码：&nbsp;&nbsp;&nbsp;
              </div>
              <div id="short_code" className="inline-div progress-div">
                {shortCodeContent}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-clipboard-text={this.props.shortCodeValue}
                    data-dismiss="modal">复制到剪切板</button>
          </div>
        </div>
      );
    } else if (this.props.toggleType === 'alert') {
      return <AlertDialog content={this.props.content}/>;
    }
  }
}

ActionModal.propTypes = {
  content: React.PropTypes.string,
  toggleType: React.PropTypes.string,
  txhash: React.PropTypes.string,
  shortCodeValue: React.PropTypes.string
};

export default ActionModal;
