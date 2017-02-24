import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import ActvionModal from '../dialog/actionModal';
// import sendHttpRequest from '../http/httpAjax';
import { fileHash, string2Unicode, getFileType } from '../utils/utils';
import getFileObject from '../utils/obtainBlob';
import { configFile, updateFileInfo, add, getShortLink } from '../../../redux/modules/poeRemote';
const FILE_FETCH_SERVICE_API = 'http://localhost:8090/RemoteFileHashRelay/fs?fn=';
const TX_TYPE_HASHLINK = 'L';
// let fileUri;
class RemoteFile extends Component {

  static propTypes = {
    fileInfo: PropTypes.object.isRequired,
    txHash: PropTypes.string.isRequired,
    shortLink: PropTypes.string.isRequired,
    configFile: PropTypes.func.isRequired,
    updateFileInfo: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    getShortLink: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.fileInfo;
    if (id && id !== this.props.fileInfo.id) {
      getFileObject(FILE_FETCH_SERVICE_API + id, (fileObj) => {
        fileHash(fileObj, (hash) => {
          this.props.updateFileInfo({
            ...this.props.fileInfo,
            hash: hash,
            filename: fileObj.name,
            filesize: fileObj.size,
            filetype: getFileType(this.props.fileInfo.uri)
          });
        });
      });
    }

    if (nextProps.fileInfo.hash && !this.props.fileInfo.hash) {
      const params = {
        'id': 'CHAINY',
        'version': 1,
        'type': TX_TYPE_HASHLINK,
        'url': nextProps.fileInfo.uri,
        'hash': nextProps.fileInfo.hash,
        'filetype': nextProps.fileInfo.filetype,
        'filesize': nextProps.fileInfo.filesize,
        'description': nextProps.fileInfo.description
      };
      this.props.add(params);
    }

    if (!this.props.txHash && nextProps.txHash) {
      const { txHash } = nextProps;
      this.props.getShortLink({txHash});
    }
  }

  createFileServerParam(url) {
    const params = {
      'id': new Date().valueOf(),
      'url': url
    };
    return JSON.stringify(params);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { url, description } = this.refs;
    const params = {};
    params.uri = url.value.trim();
    params.description = string2Unicode(description.value.trim());
    params.default = this.createFileServerParam(params.uri);
    this.props.configFile(params);
  }

  render() {
    const styles = require('../localfile/localfile.scss');
    const { txHash, shortLink } = this.props;
    return (
      <div className={'remote-file'}>
        <div className={styles['alert-content']}>
          <p>
            {/* <img src={alert} className={styles.nomargin}/>&nbsp;&nbsp; */}
            提示：请选择远程文件，区块链将记录文件的哈希值，但并不存储源文件，源文件请妥善保存以便于验证
          </p>
        </div>
        <form>
          <div className="form-group">
            <label className={styles['text-title']}>URL：</label>
            <input ref="url" name="net-addr" type="text" className="form-control" id="remote-file-address" placeholder="请输入网址"/>
          </div>
          <div className="form-group">
            <label className={styles['text-title']}>描述：</label>
            <textarea ref="description" id="remote-file-description" className="form-control"
                      name="net-description" rows="3" placeholder="请输入描述，字数500字以内"/>
          </div>
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
          <div className={styles['submit-area']}>
            <a className="btn btn-lg btn-success pull-right" data-toggle="modal" data-target=".bs-example-modal-lg"
                  onClick={(event) => this.handleSubmit(event)}>
                <i className="fa fa-sign-in"/>{' '}提交
              </a>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {...state.poeRemote};
};

const mapDispatchToProps = (dispatch) => {
  return {
    configFile: (params) => {
      dispatch(configFile(params));
    },
    updateFileInfo: (val) => {
      dispatch(updateFileInfo(val));
    },
    add: (params) => {
      dispatch(add(params));
    },
    getShortLink: (hash) => {
      dispatch(getShortLink(hash));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoteFile);

