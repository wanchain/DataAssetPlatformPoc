import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './localfile.scss';
import alert from '../../img/ic_alert.png';
import upload from '../../img/ic_upload.png';
import icsubmit from '../../img/ic_submit.png';
import {CryptoJS} from '../../../../local_modules/crypto'
import {FileHash, CreateStandardReqParams, RequestShortCode, String2Unicode} from '../utils/utils'
import sendHttpRequest from '../http/httpAjax'
import Clipboard from 'clipboard'
import ActvionModal from '../dialog/actionModal'

const senderAddr = '0xbd2d69e3e68e1ab3944a865b3e566ca5c48740da';

const REQ_SHORT_CODE_TIMES = 15;

// const styles = {
//   spanStyle : {
//     marginTop: 3,
//   }
// };

new Clipboard('.btn');

class LocalFile extends Component {
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
    }
  }

  handleDrop() {
    console.log('handleDrop');
  }

  handleChange(event) {
    const eResult = event.target.result;
    console.log('eResult=' + eResult);

    const file = event.target.files[0];

    FileHash(file, function(hash) {
      this.setState({
        fileinfo: {
          name: file.name,
          size: file.size,
          hash: hash
        }
      });
    }.bind(this));

    this.props.onChildChange(650);

    //original
    if (this.props.onChange) this.props.onChange(event);

    console.log('filename=' + this.state.fileinfo.name);
  }

  componentWillMount() {
    this.props.onChildChange(420);
  }

  handleSubmit(event) {
    this.setState({
      short_code_link: '',
      txhash: '',
    });

    const description = ReactDOM.findDOMNode(this.refs.area_descriptor).value.trim();
    const uDec = String2Unicode(description);
    const uFilename = String2Unicode(this.state.fileinfo.name);

    if (__DEVELOPMENT__) {
      console.log('filename=' + this.state.fileinfo.name);
      console.log('size=' + this.state.fileinfo.size);
      console.log('hash=' + this.state.fileinfo.hash);
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

    const addTxParams = CreateStandardReqParams(txFileInfo, senderAddr, createMethod);//this.createAddParams(filetype,description);
    if (__DEVELOPMENT__) console.log('addTxParams=' + addTxParams);

    if (addTxParams === null) {
      console.log('Add-Params is null');
      return;
    }

    //add a transaction
    sendHttpRequest(addTxParams, 2, (result)=> {
      if (__DEVELOPMENT__) {
        console.log('result=' + result);
        console.log('result-json=' + JSON.stringify(result));
        console.log('id=' + result.id);
        console.log('tx_hash=' + result.result);
        console.log('add-typeof(result)=' + typeof (result));
      }
      this.setState({
        txhash:result.result,
      });
    },(error)=>{

      console.log('addtx-error='+error);
    },0)

  }

  componentWillUpdate(){
    if (__DEVELOPMENT__) console.log('localfile-componentWillUpdate');
  }
  componentDidUpdate(){
    if (__DEVELOPMENT__) console.log('localfile-componentDidUpdate');
    const txHash = this.state.txhash;

    if (txHash !== 'undefined' && txHash !== '') {
      const shortCode = this.state.short_code_link;
      if (shortCode === 'undefined' || shortCode === '' || shortCode === null) {
        RequestShortCode(REQ_SHORT_CODE_TIMES,txHash,(shortCode)=>{
          this.setState({
            short_code_link: shortCode,
          });
        });
      }
    }
  }

  render() {
    const filename = this.state.fileinfo.name;
    if (__DEVELOPMENT__) console.log('render-filename=' + filename);
    var descContent;
    var modalDalog;
    if (filename !== 'undefined' && filename !== '') {
      console.log('render-if-existedFile=' + filename);
      modalDalog =
        <ActvionModal toggleType="action" shortCodeValue={this.state.short_code_link}
                      txhash={this.state.txhash} />;
      descContent = (
        <div className="ele-layout">
          <span className="text-title">文件名:</span>
          <span id="file-info-name" className="text-content">&nbsp;&nbsp;{this.state.fileinfo.name}</span>
          <br/>
          <span className="text-title">字节数:</span>
          <span id="file-info-size" className="text-content">&nbsp;&nbsp;{this.state.fileinfo.size} BYTES</span>
          <br/>
          <span className="text-title">哈希值:</span>
          <span id="file-info-hash" className="text-content">&nbsp;&nbsp;{this.state.fileinfo.hash}</span>
          <br/>
          <div className="form-group">
            <label className="text-title " >描述：</label>
            <textarea id="file-info-description" className="form-control"
                      name="upload-file-info-description" rows="3" placeholder="请输入描述，字数请控制在500字以内"
                      ref="area_descriptor" maxLength="500" >
            </textarea>
          </div>
        </div>
      )
    } else {
      descContent = (<div></div>);
      modalDalog = <ActvionModal toggleType="alert" content="请选择文件后再提交"/>;//<AlerDialog content="请选择文件后再提交"/>;
    }

    return(
      <form method="post">
        <div className="local-file">
          <div className="alert-content " >
            <p>
              <img src={alert}/>&nbsp;&nbsp;
              提示：请选择本地文件，区块链将记录文件的哈希值，但并不存储源文件，源文件请妥善保存以便于验证
            </p>
          </div>
          <div className="file-area">
            <div className="upload-bg">
              <a href="javascript:void(0)"  className="btn file upload-a">
                <input type="file" name="" id="" onDrop={this.handleDrop} onChange={this.handleChange}/>
                <img  src={upload} />
                <p>
                  请将需要存证的文件拖放于框内（小于5MB，格式不限）
                </p>
              </a>
            </div>

          </div>
          {descContent}

          <div>
          </div>
          <div className="submit-area">
            <a  className="btn submit-button "  data-toggle="modal" data-target=".bs-example-modal-lg" onClick={this.handleSubmit}>
              <span>
                  <img src={icsubmit}/>&nbsp;&nbsp;提交
              </span>
            </a>

          </div>
          <div className="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
              {modalDalog}
            </div>
          </div>
        </div>
      </form>
    )
  }
}

LocalFile.propTypes = {
  onChildChange:React.PropTypes.func,
};

export default LocalFile;

