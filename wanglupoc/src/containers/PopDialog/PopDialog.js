/**
 * Created by jishiwu on 12/23/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as depositAction from '../../redux/modules/deposit';

@connect(
  () => ({}),
  depositAction
)
export default class PopDialog extends React.Component {
  static propTypes = {
    receipt: React.PropTypes.object,
    setReceipt: React.PropTypes.func
  };
  closePop(event) {
    console.log(event);
    this.props.setReceipt(null);
  }
  render() {
    const {receipt} = this.props;
    console.log(receipt);
    return (
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={this.closePop.bind(this)} type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
          <h4 className="modal-title" id="myModalLabel">details</h4>
        </div>
        <div className="modal-body">
          <div className="inline-div">
            交易：&nbsp;&nbsp;&nbsp;
          </div>
          <div className="inline-div">
            blockHash:{receipt.blockHash} <br/>
            blockNumber:{receipt.blockNumber} <br/>
            contractAddress:{receipt.contractAddress} <br/>
            from:{receipt.from} <br/>
            to:{receipt.to} <br/>
            transactionHash:{receipt.transactionHash} <br/>
            transactionIndex:{receipt.transactionIndex} <br/>
          </div>
        </div>
        {/* <div className="modal-footer">*/}
          {/* <button type="button" className="btn btn-primary" data-clipboard-text={this.props.shortCodeValue}*/}
                  {/* data-dismiss="modal">复制到剪切板</button>*/}
        {/* </div>*/}
      </div>
    );
  }
}
