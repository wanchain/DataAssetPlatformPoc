import React, {Component} from 'react';
import uploadFileAction from '../http/fileUploadAjax';
import {fileHash, createStandardReqParams, requestShortCode, string2Unicode} from '../utils/utils';
import ActvionModal from '../dialog/actionModal';
import sendHttpRequest from '../http/httpAjax';

let willUploadFile = null;

const TAG = 'upload-file:';

const senderAddr = '0xbd2d69e3e68e1ab3944a865b3e566ca5c48740da';

class UploadFile extends Component {
  static propTypes = {
    onChildChange: React.PropTypes.func,
    onChange: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value: '',
      txhash: '',
      short_code_link: '',
      fileinfo: {
        name: '',
        size: '',
        hash: '',
        ipfsid: ''
      },
    };
  }


  componentDidUpdate() {
    const txHash = this.state.txhash;

    if (txHash !== 'undefined' && txHash !== '') {
      // exsited txHash
      const shortCode = this.state.short_code_link;
      if (shortCode === 'undefined' || shortCode === '' || shortCode === null) {
        // doesn't shortCode
        // this.reqShortCode(REQ_SHORT_CODE_TIMES, txHash);
        const reqTimes = 15;
        const self = this;
        requestShortCode(reqTimes, txHash, (sc)=>{
          self.setState({
            short_code_link: sc,
          });
        });
      }
    }
  }

  handleDrop() {
    if (__DEVELOPMENT__) console.log('handleDrop');
  }

  createFormData() {
    if (willUploadFile !== null && willUploadFile !== 'undefined') {
      const formData = new FormData();
      formData.set('upload-file', willUploadFile, willUploadFile.name);
      console.log('formData----------', formData['upload-file']);
      // return formData;
      return willUploadFile;
    }
    return null;
  }

  handleSubmit() {
    this.setState({
      short_code_link: '',
      txhash: '',
    });

    const formData = this.createFormData();

    const description = this.refs.area_descriptor.value.trim();

    const uDec = string2Unicode(description);
    const uFilename = string2Unicode(this.state.fileinfo.name);

    if (formData !== null) {
      console.log('formData---------------------------\n');
      console.log(JSON.stringify(formData));
      uploadFileAction(formData, (result)=> {
        console.log('result-------', result);
        // if (__DEVELOPMENT__) console.log(TAG + 'handleSubmit-result:' + result.result);

        const txFileInfo = {
          name: uFilename,
          size: this.state.fileinfo.size,
          hash: this.state.fileinfo.hash,
          ipfsid: result.result,
          desc: uDec
        };

        const createMethod = {
          'name': 'add',
          'type': 'upload'
        };

        const addTxParams = createStandardReqParams(txFileInfo, senderAddr, createMethod);
        if (__DEVELOPMENT__) console.log('addTxParams=' + addTxParams);

        if (addTxParams === null) {
          console.log('Add-Params is null');
          return;
        }

        sendHttpRequest(addTxParams, 2, (resultTx)=> {
          if (__DEVELOPMENT__) {
            console.log('result=' + resultTx);
            console.log('result-json=' + JSON.stringify(resultTx));
            console.log('id=' + resultTx.id);
            console.log('tx_hash=' + resultTx.result);
            console.log('add-typeof(result)=' + typeof (resultTx));
          }
          this.setState({
            txhash: resultTx.result,
          });
        }, (error)=>{
          console.log('addtx-error=' + error);
        }, 0);
      }, (error)=>{
        console.log(TAG + 'ipfs-error:' + error);
      }, 0);

      if (__DEVELOPMENT__) console.log(TAG + 'handleSubmit:' + formData);
    }
  }

  handleChange(event) {
    willUploadFile = event.target.files[0];
    const filename = willUploadFile.name;
    fileHash(willUploadFile, function NONAME(hash) {
      console.log('file hash------', hash);
      this.setState({
        fileinfo: {
          name: filename,
          size: willUploadFile.size,
          hash: hash
        }
      });
    }.bind(this));

    // original
    if (this.props.onChange) this.props.onChange(event);
  }

  render() {
    const styles = require('../localfile/localfile.scss');
    const alert = require('../../img/ic_alert.png');
    const upload = require('../../img/ic_upload.png');
    const icsubmit = require('../../img/ic_submit.png');
    const filename = this.state.fileinfo.name;
    let descContent;
    let modalDalog;
    if (filename !== 'undefined' && filename !== '') {
      // console.log('if-existedFile=' + filename);
      modalDalog = (
        <ActvionModal toggleType="action" shortCodeValue={this.state.short_code_link}
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
          <div className="form-group">
            <label className={styles['text-title']} >描述：</label>
            <textarea id="file-info-description" className="form-control"
                      name="upload-file-info-description" rows="3" placeholder="请输入描述，字数请控制在500字以内"
                      onChange={this.handleTexareaChange} ref="area_descriptor"
            >

                        </textarea>
          </div>
        </div>
      );
    } else {
      descContent = (<div></div>);
      modalDalog = <ActvionModal toggleType="alert" content="请选择文件后再提交"/>;
    }

    return (
      <form method="post" >
        <div className={styles['local-file']}>
          <div className={styles['alert-content']} >
            <p>
              <img src={alert} className={styles.nomargin}/>&nbsp;&nbsp;
              提示：请选择本地文件，文件将被存储于网录的分布式存储中，区块链将同时记录文件的哈希值。
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
          <div>
          </div>
          <div className={styles['submit-area']}>
            <a className={'btn ' + styles['submit-button']} data-toggle="modal" data-target=".bs-example-modal-lg" onClick={this.handleSubmit}>
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

export default UploadFile;
