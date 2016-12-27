import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ActvionModal from '../dialog/actionModal';
import sendHttpRequest from '../http/httpAjax';
import {fileHash, createStandardReqParams, requestShortCode, string2Unicode} from '../utils/utils';
// import requestRemoteFile from '../../../../local_modules/http/requestStream';
import getFileObject from '../utils/obtainBlob';
const fileServerReq = 'http://localhost:8090/rfh';
const fileServerGet = 'http://localhost:8090/fs?fn=';
const senderAddr = '0xbd2d69e3e68e1ab3944a865b3e566ca5c48740da';

class RemoteFile extends Component {
  static propTypes = {
    onChildChange: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      targetUrl: '',
      description: '',
      txHash: '',
      short_code_link: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.modifyState = this.modifyState.bind(this);
  }

  componentWillMount() {
    this.props.onChildChange(440);
  }

  componentDidMount() {
  }

  componentWillUpdate() {
    if (__DEVELOPMENT__) console.log('remote_file-componentDidUpdate');
    const txHash = this.state.txHash;

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

  createFileServerParam(url) {
    const params = {
      'id': new Date().valueOf(),
      'url': url
    };

    return JSON.stringify(params);
  }

  modifyState(hash) {
    this.setState({
      txHash: hash
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit');

    this.setState({
      targetUrl: '',
      description: '',
      txHash: '',
      short_code_link: '',
    });

    const tagUrl = ReactDOM.findDOMNode(this.refs.input_url).value;
    const desc = ReactDOM.findDOMNode(this.refs.ta_desc).value;

    const uDec = string2Unicode(desc);

    this.setState({
      targetUrl: tagUrl,
      description: desc
    });

    const self = this;
    const params = this.createFileServerParam(tagUrl);
    sendHttpRequest(params, 2, (result)=>{
      if (__DEVELOPMENT__) {
        console.log('result=' + result);
        console.log('result-json=' + JSON.stringify(result));
        console.log('id=' + result.id);
        console.log('result.result=' + result.result);
        console.log('add-typeof(result)=' + typeof (result));
      }

      getFileObject(fileServerGet + result.result, function NONAME(fileObject) {
        if (__DEVELOPMENT__) {
          console.log('fileObject=' + fileObject);
          console.log('fileObject.name=' + fileObject.name);
          console.log('fileObject.size=' + fileObject.size);
        }

        fileHash(fileObject, (fh)=>{
          if (__DEVELOPMENT__) console.log('hash=' + fh);

          const txFileInfo = {
            url: tagUrl,
            size: fileObject.size,
            hash: fh,
            desc: uDec
          };

          const createMethod = {
            'name': 'add',
            'type': 'remote'
          };

          const addTxParams = createStandardReqParams(txFileInfo, senderAddr, createMethod);
          if (__DEVELOPMENT__) console.log('addTxParams=' + addTxParams);

          if (addTxParams === null) {
            console.log('Add-Params is null');
            return;
          }

          sendHttpRequest(addTxParams, 2, (rs)=>{
            // result.result =>> Tx Hash
            // this.setState({
            //     txHash:result.result,
            // });
            if (__DEVELOPMENT__) console.log('result.result=' + rs.result);
            self.modifyState(rs.result);
          }, (error)=>{
            console.log('remotefile-addtx-error=' + error);
          }, 0);
        });
      });
    }, (error)=>{
      if (__DEVELOPMENT__) console.error('result.result=' + error);
    }, 0, fileServerReq);

    // requestRemoteFile('http://localhost:8600/test_file.png');
    /* const param = {
     'id':123456,
     'url':'http://img.zcool.cn/community/01f75e5774e2de0000012e7eb20ffd.png'
     };

     sendHttpRequest(JSON.stringify(param),2,(result)=> {
     if (__DEVELOPMENT__) {
     console.log('result=' + result);
     console.log('result-json=' + JSON.stringify(result));
     console.log('id=' + result.id);
     console.log('result.result=' + result.result);
     console.log('add-typeof(result)=' + typeof (result));
     }

     getFileObject(fileServerGet+result.result,function (fileObject) {
     console.log('fileObject='+fileObject);
     console.log('fileObject.name='+fileObject.name);
     console.log('fileObject.size='+fileObject.size);

     FileHash(fileObject,(hash)=>{
     console.log('hash='+hash);
     })

     });

     },(error)=>{

     console.log('addTx-error='+error);
     },0,fileServerReq);*/
  }

  render() {
    let modalDalog;
    const styles = require('../localfile/localfile.scss');
    const tagUrl = this.state.targetUrl;
    const icsubmit = require('../../img/ic_submit.png');

    if (tagUrl !== 'undefined' && tagUrl !== '') {
      modalDalog = (
        <ActvionModal toggleType="action" shortCodeValue={this.state.short_code_link}
                      txhash={this.state.txHash} />
      );
    } else {
      modalDalog = <ActvionModal toggleType="alert" content="请输入URL后再提交"/>;
    }

    return (
      <div className={'remote-file'}>
        <div className={styles['alert-content']}>
          <p>
            <img src={alert}/>&nbsp;&nbsp;
            提示：请选择远程文件，区块链将记录文件的哈希值，但并不存储源文件，源文件请妥善保存以便于验证
          </p>
        </div>
        <form name="form" className="" action="" method="post" role="form">
          <div className={styles['ele-layout'] + 'form-group'}>
            <label className={styles['text-title']}>URL：</label>
            <input ref="input_url" name="net-addr" type="text" className="form-control" id="remote-file-address" placeholder="请输入网址"/>
          </div>
          <div className={styles['ele-layout'] + 'form-group'}>
            <label className={styles['text-title']}>描述：</label>
            <textarea ref="ta_desc" id="remote-file-description" className="form-control"
                      name="net-description" rows="3" placeholder="请输入描述，字数500字以内"/>
          </div>

          <div className={styles['submit-area']}>
            <a className={'btn' + styles['submit-button']} data-toggle="modal" data-target=".popup-dialog" onClick={this.handleSubmit}>
              <span>
                  <img src={icsubmit}/>&nbsp;&nbsp;提交
              </span>
            </a>

          </div>
        </form>
        <div className="modal fade popup-dialog" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            {modalDalog}
          </div>
        </div>
      </div>
    );
  }
}

export default RemoteFile;
