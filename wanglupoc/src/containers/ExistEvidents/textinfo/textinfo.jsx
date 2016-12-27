import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStandardReqParams, requestShortCode, string2Unicode} from '../utils/utils';
import CryptoJS from '../../../../local_modules/crypto';
import sendHttpRequest from '../http/httpAjax';
import ActvionModal from '../dialog/actionModal';

const senderAddr = '0xbd2d69e3e68e1ab3944a865b3e566ca5c48740da';

class TextInfo extends Component {
  static propTypes = {
    onChildChange: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      desc: '',
      txhash: '',
      short_code_link: '',
    };
  }

  componentWillMount() {
    this.props.onChildChange(380);
  }

  componentWillUpdate() {
    if (__DEVELOPMENT__) console.log('textinfo-componentDidUpdate');
    const txHash = this.state.txhash;
    if (__DEVELOPMENT__) console.log('txHash=' + txHash);
    if (txHash !== 'undefined' && txHash !== '') {
      // exsited txHash
      const shortCode = this.state.short_code_link;
      if (shortCode === 'undefined' || shortCode === '' || shortCode === null) {
        // doesn't shortCode
        // this.reqShortCode(REQ_SHORT_CODE_TIMES, txHash);
        const reqTimes = 15;
        requestShortCode(reqTimes, txHash, (sc)=>{
          this.setState({
            short_code_link: sc,
          });
        });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const description = ReactDOM.findDOMNode(this.refs.text_area).value.trim();

    const uDec = string2Unicode(description);

    if (__DEVELOPMENT__) console.log('uDec=' + uDec);
    this.setState({
      desc: uDec,
      txhash: '',
      short_code_link: '',
    });

    const sha256 = CryptoJS.algo.SHA256.create();
    const text = CryptoJS.enc.Utf8.parse(description);
    sha256.update(text);
    const hashedText = sha256.finalize().toString();

    const txFileInfo = {
      hash: hashedText,
      desc: uDec
    };
    const createMethod = {
      'name': 'add',
      'type': 'text'
    };

    const addTxParams = createStandardReqParams(txFileInfo, senderAddr, createMethod);

    if (__DEVELOPMENT__) console.log('addTxParams=' + addTxParams);

    if (addTxParams === null) {
      console.log('Add-Params is null');
      return;
    }

    sendHttpRequest(addTxParams, 2, (result)=>{
      if (__DEVELOPMENT__) {
        console.log('result=' + result);
        console.log('result-json=' + JSON.stringify(result));
        console.log('id=' + result.id);
        console.log('tx_hash=' + result.result);
        console.log('add-typeof(result)=' + typeof (result));
      }
      this.setState({
        txhash: result.result,
      });
    }, (error)=>{
      console.log('addtx-error=' + error);
    }, 0);
  }

  render() {
    const alert = require('../../img/ic_alert.png');
    const icsubmit = require('../../img/ic_submit.png');
    const dec = this.state.desc;
    let modalDalog;
    if (dec !== 'undefined' && dec !== '') {
      modalDalog = (
        <ActvionModal toggleType="action" shortCodeValue={this.state.short_code_link}
                      txhash={this.state.txhash} />);
    } else {
      modalDalog = <ActvionModal toggleType="alert" content="请输入文本后再提交"/>;
    }

    return (
      <div>
        <div className="alert-content " >
          <p>
            <img src={alert}/>&nbsp;&nbsp;
            提示：请输入您要存储的文本，文本内容和文本的哈希值都将被记录与区块链中
          </p>
        </div>
        <form name="textinfo_form" className="" action="" method="post" role="form">
          <div className="ele-layout form-group">
            <label className="text-title" >文本：</label>
            <textarea id="text-info-description" className="form-control" ref="text_area"
                      name="text-info-description" rows="5" placeholder="请输入输入文本数据">

                        </textarea>
          </div>
          <div className="submit-area">
            <a className="btn submit-button " data-toggle="modal" data-target=".bs-example-modal-lg"
                onClick={this.handleSubmit}>
              <span>
                  <img src={icsubmit}/>&nbsp;&nbsp;提交
              </span>
            </a>

          </div>
          <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              {modalDalog}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default TextInfo;
