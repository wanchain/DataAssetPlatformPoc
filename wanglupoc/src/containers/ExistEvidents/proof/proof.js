import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fileHash } from '../utils/utils';
import { LAYOUT_PROOF } from '../constants';
import {browserHistory} from 'react-router';
import { getFileInfo, verify } from '../../../redux/modules/proof';

const styles = require('./proof.scss');
class Proof extends Component {
  static propTypes = {
    senderAddress: PropTypes.string.isRequired,
    txHash: PropTypes.string.isRequired,
    timeStamp: PropTypes.string.isRequired,
    fileInfo: PropTypes.object.isRequired,
    verify: PropTypes.func.isRequired,
    getFileInfo: PropTypes.func.isRequired
  };

  handleChange(event) {
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

  handleSubmit(event) {
    event.preventDefault();
    const { code } = this.refs;
    this.props.verify(code.value.trim());
  }

  inputSubmit() {
    const shortCodeTmp = this.refs.input_short_code.value.trim();
    const link = LAYOUT_PROOF + '/' + shortCodeTmp;
    browserHistory.push(link);
    this.toggleSearch(shortCodeTmp);
  }

  formatTime(timeStr) {
    return new Date(parseInt(timeStr, 10) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  }

  render() {
    const upload = require('../../img/ic_upload.png');
    const { fileInfo, senderAddress } = this.props;
    const { hash, filetype } = fileInfo;
    const { filename, description } = fileInfo;
    console.log(filename);
    let { timeStamp } = this.props;
    if (timeStamp) timeStamp = this.formatTime(timeStamp);
    // description = unicode2String(description);
    // filename = unicode2String(filename);
    return (
      <div>
        <div className="col-lg-12">
          <div className="input-group">
            <input type="text" className="form-control" ref="code" placeholder="请输入存证交易短码" />
            <span className="input-group-btn">
              <button className="btn btn-success" type="button" onClick={(event) => this.handleSubmit(event)}>验证</button>
            </span>
          </div>
        </div>
        {hash &&
            <div className="text-left">
              File MD: {'  '}<span>{hash}</span>
            </div>
        }
        {filename &&
            <div className="text-left">
              Filename: {'  '}<span>{filename}</span>
            </div>
        }
        {description &&
            <div className="text-left">
              File description: {'  '}<span>{description}</span>
            </div>
        }
        {filetype &&
            <div className="text-left">
              File type: {'  '}<span>{filetype}</span>
            </div>
        }
        {timeStamp &&
            <div className="text-left">
              Transaction timestamp: {'  '}<span>{timeStamp}</span>
            </div>
        }
        {senderAddress &&
            <div className="text-left">
              Sender Address: {'  '}<span>{senderAddress}</span>
            </div>
        }
        <div className={styles['proof-file-area']}>
          <div className={'upload-bg ' + styles['proof-upload-bg'] }>
            <a className={'btn ' + styles.file + ' ' + styles['upload-a']}>
              <input type="file" name="" id="" onDrop={(event) => this.handleDrop(event)} onChange={(event) => this.handleChange(event)}/>
              <img src={upload} />
              <p>
                请将需要存证的<br/>文件拖放于框内<br/>（小于5MB，格式不限）
              </p>
            </a>
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    senderAddress: state.proof.senderAddress,
    txHash: state.proof.txHash,
    fileInfo: state.proof.fileInfo,
    timeStamp: state.proof.timeStamp
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verify: (code) => {
      dispatch(verify(code));
    },
    getFileInfo: (code) => {
      dispatch(getFileInfo(code));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Proof);
