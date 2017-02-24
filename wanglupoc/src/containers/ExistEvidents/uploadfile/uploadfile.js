import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fileHash, getFileType, string2Unicode } from '../utils/utils';
import { setFileInfo, getIpfsPath, getShortLink, add } from '../../../redux/modules/poeUpload';
let file = null;
const TX_TYPE_HASHLINK = 'L';
class UploadFile extends Component {
  static propTypes = {
    txHash: PropTypes.string.isRequired,
    shortLink: PropTypes.string.isRequired,
    getIpfsPath: PropTypes.func.isRequired,
    getShortLink: PropTypes.func.isRequired,
    fileInfo: PropTypes.object.isRequired,
    setFileInfo: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const { txHash } = nextProps;
    if (txHash.length === 66) {
      this.props.getShortLink({txHash});
    }
  }

  handleChange(event) {
    event.preventDefault();
    file = event.target.files[0];
    fileHash(file, (hash) => {
      this.props.setFileInfo({
        ...this.props.fileInfo,
        hash: hash,
        filename: file.name,
        filesize: file.size,
        filetype: getFileType(file.name)
      });
    });
  }
  handleUpload(event) {
    event.preventDefault();
    const fileToUpload = new FormData();
    fileToUpload.append('file', file);
    this.props.getIpfsPath(fileToUpload);
  }

  handleDrop(event) {
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();
    const description = this.refs.description.value.trim();
    const uDec = string2Unicode(description);
    const uFilename = string2Unicode(this.props.fileInfo.filename);
    const params = {
      'id': 'CHAINY',
      'version': 1,
      'type': TX_TYPE_HASHLINK,
      'filename': uFilename,
      'hash': this.props.fileInfo.hash,
      'filetype': this.props.fileInfo.filetype,
      'filesize': this.props.fileInfo.filesize,
      'ipfsid': this.props.fileInfo.ipfsid,
      'description': uDec
    };
    this.props.add(params);
  }
  render() {
    const styles = require('../localfile/localfile.scss');
    const alert = require('../../img/ic_alert.png');
    const upload = require('../../img/ic_upload.png');
    const { fileInfo, txHash, shortLink } = this.props;

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
                <input type="file" name="" id="" onDrop={(event) => this.handleDrop(event)} onChange={(event) => this.handleChange(event)}/>
                <img src={upload} />
                <p>
                  请将需要存证的文件拖放于框内（小于5MB，格式不限）
                </p>
              </a>
            </div>
          </div>
          {fileInfo && fileInfo.filename &&
            <div className={styles['ele-layout']}>
              <div className="text-left">
                文件名: {' '}<span>{fileInfo.filename}</span>
              </div>
              <div className="text-left">
                文件大小（字节）: {' '}<span>{fileInfo.filesize}</span>
              </div>
              <div className="text-left">
                Hash: {' '}<span>{fileInfo.hash}</span>
              </div>
              {fileInfo.ipfsid &&
                <div className="text-left">
                  IPFS Server File Path: {'  '}<span>{fileInfo.ipfsid}</span>
                </div>
              }
              <div className="form-group">
                <p className="text-left">描述:</p>
                <textarea id="file-info-description" className="form-control"
                      name="upload-file-info-description" rows="3" placeholder="请输入描述，字数请控制在500字以内"
                      ref="description" maxLength="500" />
              </div>
            </div>
          }
          {txHash &&
            <div className="text-left">
              Transaction Hash: {'  '}<span>{txHash}</span>
            </div>
          }
          {shortLink &&
            <div className="text-left">
              Resource Shortlink: {'  '}<span>{shortLink}</span>
            </div>
          }
          <div>
          </div>
          <div />
            <div className="text-center">
              <a className="btn btn-lg btn-primary pull-left" data-toggle="modal" data-target=".bs-example-modal-lg"
                  onClick={(event) => this.handleUpload(event)}>
                <i className="fa fa-sign-in"/>{' '}存储
              </a>
              <a className="btn btn-lg btn-success pull-right" data-toggle="modal" data-target=".bs-example-modal-lg"
                  onClick={(event) => this.handleSubmit(event)}>
                <i className="fa fa-sign-in"/>{' '}提交
              </a>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fileInfo: state.poeUpload.fileInfo,
    txHash: state.poeUpload.txHash,
    shortLink: state.poeUpload.shortLink
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFileInfo: (val) => {
      dispatch(setFileInfo(val));
    },
    getIpfsPath: (val) => {
      dispatch(getIpfsPath(val));
    },
    getShortLink: (hash) => {
      dispatch(getShortLink(hash));
    },
    add: (val) => {
      dispatch(add(val));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile);
