import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStandardReqParams, fileHash, unicode2String} from '../utils/utils';
import sendHttpRequest from '../http/httpAjax';
import {PROOF, LAYOUT_PROOF} from '../constants';
import AlertDialog from '../dialog/alert';

const senderAddr = '0xbd2d69e3e68e1ab3944a865b3e566ca5c48740da';
const browserPrfix = 'localhost:8000/#/';

let shortCode = '';
let alert = false;
class Proof extends Component {
  static propTypes = {
    params: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    console.log('proof_page=' + this.props.params.proof_page);
    // shortCode = this.props.params.proof_page;
    this.toggleSearch = this.toggleSearch.bind(this);
    this.inputSubmit = this.inputSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      alertContent: '',
      timestamp: '',
      sender: '',
      txHash: '',
      data: {
        filename: '',
        filetype: '',
        msgHash: '',
        filesize: '',
        ipfsid: '',
        description: ''
      }
    };
  }

  componentWillMount() {
    this.search();
  }

  componentDidMount() {
    // const ele = ReactDOM.findDOMNode(this.refs.display_text_td);
    // console.log('ele=' + ele);
  }

  componentWillUpdate() {
    // if(__DEVELOPMENT__)console.log('proof-componentWillUpdate');
    // shortCode = '';
    // this.search();
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    if (alert) {
      alert = false;
      $('#myModal').modal('toggle');
    }
  }

  search() {
    if (this.props.params.proof_page !== PROOF) {
      if (this.props.params.proof_page !== shortCode) {
        shortCode = this.props.params.proof_page;
        this.toggleSearch(shortCode);
      }
    }
  }

  handleChange(event) {
    // if(__DEVELOPMENT__)console.log('handleChange');
    // const node = ReactDOM.findDOMNode(this.refs.toggle_mode);
    // $(node).bootstrapToggle('on');
    // $('#myModal').modal('show');
    alert = true;

    const file = event.target.files[0];
    const msgHash = this.state.data.msgHash;
    const self = this;
    fileHash(file, function NoName(hash) {
      if (hash === msgHash) {
        self.setState({
          alertContent: '验证成功！文件没有修改'
        });
      } else {
        self.setState({
          alertContent: '验证失败！您对文件进行了修改'
        });
      }
    });
  }

  inputSubmit() {
    const shortCodeTmp = ReactDOM.findDOMNode(this.refs.input_short_code).value.trim();
    const link = LAYOUT_PROOF + '/' + shortCodeTmp;
    window.location.href = link;
    this.toggleSearch(shortCodeTmp);
  }

  toggleSearch(shortCodeTmp) {
    if (__DEVELOPMENT__) console.log('proof:toggleSearch');
    // ReactDOM.findDOMNode(this.refs.input_short_code).value.trim();
    const inputShortCode = shortCodeTmp;
    if (typeof inputShortCode !== 'undefined' && inputShortCode !== '') {
      const createMethod = {
        'name': 'get',
      };
      const self = this;
      const params = createStandardReqParams(inputShortCode, senderAddr, createMethod);
      sendHttpRequest(params, 2, function NoName1(result) {
        console.log('result:' + result);
        const jsonObjGet = result.result;
        let time = '';
        if (jsonObjGet.timestamp !== '') {
          time = new Date(parseInt(jsonObjGet.timestamp, 10) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
          if (__DEVELOPMENT__) console.log('time=' + time);
        }

        const createGetTxMethod = {
          'name': 'getTx',
        };
        const paramsTx = createStandardReqParams(inputShortCode, senderAddr, createGetTxMethod);
        sendHttpRequest(paramsTx, 2, (resultGetTx)=>{
          console.log('result:' + resultGetTx);
          const jsonObjGetTx = resultGetTx.result;
          let desc = JSON.parse(jsonObjGet.data).description;
          if (desc.indexOf('\\u') >= 0) {
            desc = unicode2String(desc);
          }

          let fName = JSON.parse(jsonObjGet.data).filename;
          if (fName === undefined || fName === '') {
            fName = '';
          } else if (fName.indexOf('\\u') >= 0) {
            fName = unicode2String(fName);
          }

          self.setState({
            timestamp: time,
            sender: jsonObjGet.sender,
            txHash: jsonObjGetTx.hash,
            data: {
              filename: fName,
              msgHash: JSON.parse(jsonObjGet.data).hash,
              filetype: JSON.parse(jsonObjGet.data).filetype,
              filesize: JSON.parse(jsonObjGet.data).filesize,
              ipfsid: JSON.parse(jsonObjGet.data).ipfsid,
              description: desc
            }
          });
        }, (errorGetTx)=>{
          console.log('error:' + errorGetTx);
        }, 0);
      }, (error)=>{
        console.log('error:' + error);
      }, 0);
    }
  }

  render() {
    const styles = require('./proof.scss');
    const upload = require('../../img/ic_upload.png');
    return (
      <div className="">
        <div className={styles['ele-layout']}>
          <label className={styles['proof-title']} >搜索存证</label>
          <div className={styles['short-code-input-group']}>
            <table>
              <tbody>
              <tr>
                <td>
                  <input type="text" ref="input_short_code" className={styles['short-code-input']} placeholder="请输入短码"/>
                </td>
                <td className="">
                  <button className={styles['proof-btn']} type="button" onClick={this.inputSubmit}>&nbsp;</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <table className={styles['proof-content-table']}>
            <tbody>
            <tr>
              <td className={styles['text-td']} ref="display_text_td">
                <table>
                <tbody>
                <tr>
                  <td>
                    <div className="">
                      <span className={styles['proof-text-title']}>对应的区块链数据：</span>
                      <br/>
                      <div className={styles['proof-text-content']}>
                        <span>交易时间：</span><span id="trasaction-time">{this.state.timestamp}</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="">
                      <span className={styles['proof-text-title']}>提示：</span>
                      <br/>
                      <div className={styles['proof-text-content']}>
                        <span >
                            当前页面包含嵌入到网录区块链的数字签名文件的信息，因为交易已经被确认，所以是被永远存证的。
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="">
                      <span className={styles['proof-text-title']}>SHA256哈希值：</span>
                      <br/>
                      <div className={styles['proof-text-content']}>
                        <span id="sha256hash">
                            {this.state.data.msgHash}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="">
                      <span className={styles['proof-text-title']}>交易ID：</span>
                      <br/>
                      <div className={styles['proof-text-content']}>
                         <a href={browserPrfix + 'transaction/' + this.state.txHash} id="transaction-id">
                          {this.state.txHash}
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="">
                      <span className={styles['proof-text-title']}>发送方：</span>
                      <br/>
                      <div className={styles['proof-text-content']}>
                        <a href={browserPrfix + 'address/' + this.state.sender} id="send-address">
                          {this.state.sender}
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                {

                  (()=>{
                    if (__DEVELOPMENT__) console.log('state.data.ipfsid=' + this.state.data.ipfsid);
                    if (typeof (this.state.data.ipfsid) === 'undefined' || this.state.data.ipfsid === '') {
                      return <tr/>;
                    }
                    return (
                      <tr>
                        <td>
                          <div className="">
                            <span className={styles['proof-text-title']}>无中心分布式存储链接：</span>
                            <br/>
                            <div className={styles['proof-text-content']}>
                              <a href={'https://ipfs.io/ipfs/' + this.state.data.ipfsid} id="storage-code">
                                {this.state.data.ipfsid}
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })()
                }
                <tr>
                  <td>
                    <div className="">
                      <span className={styles['proof-text-title']}>描述信息：</span>
                      <br/>
                      <div className={styles['proof-text-content']}>
                        <p href="#" id="description">
                          {this.state.data.description}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>

                </tbody>
                </table>
              </td>
              <td className={styles['file-area-td']}>
                <div className={styles['proof-file-area']}>
                  <div className={'upload-bg ' + styles['proof-upload-bg'] }>
                    <a className={'btn ' + styles.file + ' ' + styles['upload-a']}>
                      <input type="file" name="" id="" onDrop={this.handleDrop} onChange={this.handleChange}/>
                      <img src={upload} />
                      <p>
                        请将需要存证的<br/>文件拖放于框内<br/>（小于5MB，格式不限）
                      </p>
                    </a>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div id="myModal" className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <AlertDialog content={this.state.alertContent}/>
          </div>
        </div>

      </div>
    );
  }

}

export default Proof;
