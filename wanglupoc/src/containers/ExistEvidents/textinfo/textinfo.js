import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { string2Unicode } from '../utils/utils';
import { setDesc, add, getShortLink } from '../../../redux/modules/poe';
import CryptoJS from '../../../../local_modules/crypto';
// import ActvionModal from '../dialog/actionModal';

// const senderAddr = '0x9da26fc2e1d6ad9fdd46138906b0104ae68a65d8';

const TX_TYPE_TEXT = 'T';
class TextInfo extends Component {

  static propTypes = {
    txHash: PropTypes.string.isRequired,
    shortLink: PropTypes.string.isRequired,
    setDesc: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    getShortLink: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { txHash } = nextProps;
    if (txHash.length === 66) {
      this.props.getShortLink({txHash});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const desc = this.refs.text_area.value.trim();
    const uDesc = string2Unicode(desc);
    this.props.setDesc(desc);
    const sha256 = CryptoJS.algo.SHA256.create();
    const text = CryptoJS.enc.Utf8.parse(desc);
    sha256.update(text);
    const hashedText = sha256.finalize().toString();
    const txFileInfo = {
      id: 'CHAINY',
      version: 1,
      type: TX_TYPE_TEXT,
      desc: uDesc,
      hash: hashedText
    };

    this.props.add(txFileInfo);
  }

  render() {
    const styles = require('../localfile/localfile.scss');
    const alert = require('../../img/ic_alert.png');
    const { txHash, shortLink } = this.props;
    // let modalDalog;
    // if (dec !== 'undefined' && dec !== '') {
    //   modalDalog = (
    //     <ActvionModal toggleType="action" shortCodeValue={short_code_link}
    //                   txhash={txhash} />);
    // } else {
    //   modalDalog = <ActvionModal toggleType="alert" content="请输入文本后再提交"/>;
    // }

    return (
      <div>
        <div className={styles['alert-content']} >
          <p>
            <img src={alert} className={styles.nomargin}/>&nbsp;&nbsp;
            提示：请输入您要存储的文本，文本内容和文本的哈希值都将被记录与区块链中
          </p>
          <div>
            <p className="text-danger">txHash: {txHash}</p>
            <p className="text-danger">Short Link: {shortLink}</p>
          </div>
        </div>
        <form name="textinfo_form" className="" action="" method="post" role="form">
          <div className={styles['ele-layout'] + ' form-group'}>
            <label className={styles['text-title']} >文本：</label>
            <textarea id="text-info-description" className="form-control" ref="text_area" name="text-info-description" rows="5" placeholder="请输入文本数据"></textarea>
          </div>
          {/* <div className={styles['submit-area']}> */}
          <div className="text-center">
            <a className="btn btn-lg btn-success" data-toggle="modal" data-target=".bs-example-modal-lg"
                onClick={(event) => this.handleSubmit(event)}>
              <i className="fa fa-sign-in"/>{' '}提交
            </a>
          </div>
        </form>
        { /* <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            {modalDalog}
          </div>
        </div> */ }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    description: state.poe.description,
    txHash: state.poe.txHash,
    shortLink: state.poe.shortLink
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDesc: (val) => {
      dispatch(setDesc(val));
    },
    add: (val) => {
      dispatch(add(val));
    },
    getShortLink: (val) => {
      dispatch(getShortLink(val));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextInfo);
