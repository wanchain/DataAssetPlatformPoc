import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {fileHash, createStandardReqParams, requestShortCode, string2Unicode} from '../utils/utils';
import sendHttpRequest from '../http/httpAjax';
import ActvionModal from '../dialog/actionModal';

const senderAddr = '0xbd2d69e3e68e1ab3944a865b3e566ca5c48740da';

const REQ_SHORT_CODE_TIMES = 15;

class LocalFile extends Component {
  static propTypes = {
    onChange: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.reqShortCode = this.reqShortCode.bind(this);
    this.state = {
      value: '',
      txhash: '',
      short_code_link: '',
      fileinfo: {
        name: '',
        size: '',
        hash: '',
      }
    };

    // this._clipboard = null;
  }

  // get clipboard() {
  //   return this._clipboard;
  // }
  // set clipboard(clb) {
  //   this._clipboard = clb;
  // }

  componentWillMount() {
    this.props.onChildChange(420);
  }

  componentDidMount() {
    // console.log(Clipboard);
    const Clipboard = require('clipboard');
    const clipboard = new Clipboard('.btn');
    clipboard.on('success', function NoName(info) {
      console.log(info);
    });
    clipboard.on('error', function NoName1(err) {
      console.log(err);
    });
  }

  componentWillUpdate() {
    if (__DEVELOPMENT__) console.log('localfile-componentWillUpdate');
  }
  componentDidUpdate() {
    if (__DEVELOPMENT__) console.log('localfile-componentDidUpdate');
    const txHash = this.state.txhash;

    if (txHash !== 'undefined' && txHash !== '') {
      // exsited txHash
      const shortCode = this.state.short_code_link;
      if (shortCode === 'undefined' || shortCode === '' || shortCode === null) {
        // doesn't shortCode
        // this.reqShortCode(REQ_SHORT_CODE_TIMES, txHash);
        const self = this;
        requestShortCode(REQ_SHORT_CODE_TIMES, txHash, (shrtCd)=>{
          self.setState({
            short_code_link: shrtCd,
          });
        });
      }
    }
  }

  handleDrop() {
    console.log('handleDrop');
  }

  handleChange(event) {
    const eResult = event.target.result;
    console.log('eResult=' + eResult);

    const file = event.target.files[0];

    fileHash(file, function NONAME(hash) {
      this.setState({
        fileinfo: {
          name: file.name,
          size: file.size,
          hash: hash
        }

      });
    }.bind(this));

    this.props.onChildChange(650);

    // original
    if (this.props.onChange) this.props.onChange(event);

    console.log('filename=' + this.state.fileinfo.name);
  }

  handleSubmit(event) {
    // repeat submit
    // shortCodeContent = <CProgress/>;
    this.setState({
      short_code_link: '',
      txhash: '',
    });

    const description = ReactDOM.findDOMNode(this.refs.area_descriptor).value.trim();
    const uDec = string2Unicode(description);
    const uFilename = string2Unicode(this.state.fileinfo.name);

    if (__DEVELOPMENT__) {
      console.log('filename=' + this.state.fileinfo.name);
      console.log('size=' + this.state.fileinfo.size);
      console.log('hash=' + this.state.fileinfo.hash);
      // console.log('type=' + filetype);
      console.log('descriptor=' + description);
      console.log('handleSubmit-event=' + event);
    }

    const txFileInfo = {
      name: uFilename,
      size: this.state.fileinfo.size,
      hash: this.state.fileinfo.hash,
      desc: uDec
    };

    const createMethod = {
      'name': 'add',
      'type': 'local'
    };

    const addTxParams = createStandardReqParams(txFileInfo, senderAddr, createMethod);
    if (__DEVELOPMENT__) console.log('addTxParams=' + addTxParams);

    if (addTxParams === null) {
      console.log('Add-Params is null');
      return;
    }

    // add a transaction
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
    const styles = require('./localfile.scss');
    const alert = require('../../img/ic_alert.png');
    const upload = require('../../img/ic_upload.png');
    const icsubmit = require('../../img/ic_submit.png');
    const filename = this.state.fileinfo.name;
    if (__DEVELOPMENT__) console.log('render-filename=' + filename);
    let descContent;
    let modalDalog;
    if (filename !== 'undefined' && filename !== '') {
      console.log('render-if-existedFile=' + filename);
      modalDalog = (<ActvionModal toggleType="action" shortCodeValue={this.state.short_code_link}
                      txhash={this.state.txhash} />);

      descContent = (
        <div className={styles['ele-layout']}>
          <span className={styles['text-title']}>文件名:</span>
          <span id="file-info-name" className={styles['text-content']}>&nbsp;&nbsp;{this.state.fileinfo.name}</span>
          <br/>
          <span className={styles['text-title']}>字节数:</span>
          <span id="file-info-size" className={styles['text-content']}>&nbsp;&nbsp;{this.state.fileinfo.size} BYTES</span>
          <br/>
          <span className={styles['text-title']}>哈希值:</span>
          <span id="file-info-hash" className={styles['text-content']}>&nbsp;&nbsp;{this.state.fileinfo.hash}</span>
          <br/>
          <div className={styles['form-group']}>
            <label className={styles['text-title']}>描述：</label>
            <textarea id="file-info-description" className={styles['form-control']}
                      name="upload-file-info-description" rows="3" placeholder="请输入描述，字数请控制在500字以内"
                      ref="area_descriptor" maxLength="500" />
          </div>
        </div>
      );
    } else {
      descContent = (<div></div>);
      modalDalog = <ActvionModal toggleType="alert" content="请选择文件后再提交"/>;
      // <AlerDialog content="请选择文件后再提交"/>;
    }

    return (
      <form method="post">
        <div className={styles['local-file']}>
          <div className={styles['alert-content']} >
            <p>
              <img src={alert} className={styles.nomargin}/>&nbsp;&nbsp;
              提示：请选择本地文件，区块链将记录文件的哈希值，但并不存储源文件，源文件请妥善保存以便于验证
            </p>
          </div>
          <div className={styles['file-area']}>

            <div className={styles['upload-bg']}>
              <a className={'btn ' + styles.file + ' ' + styles['upload-a']}>
                <input type="file" name="" id="" onDrop={this.handleDrop} onChange={this.handleChange}/>
                <img src={upload} />
                <p>
                  请将需要存证的文件拖放于框内（小于5MB，格式不限）
                </p>
              </a>
            </div>
          </div>
          {descContent}
          <div />
          <div className={styles['submit-area']}>
            <a className={'btn ' + styles['submit-button']} data-toggle="modal" data-target=".bs-example-modal-lg"
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
        </div>
      </form>
    );
  }
}

LocalFile.propTypes = {
  onChildChange: React.PropTypes.func,
};

export default LocalFile;

