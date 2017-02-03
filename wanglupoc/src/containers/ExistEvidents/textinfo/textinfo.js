import React, { Component, PropTypes } from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
// import {createStandardReqParams, requestShortCode, string2Unicode} from '../utils/utils';
import { setDesc } from 'redux/modules/textInfo';
// import CryptoJS from '../../../../local_modules/crypto';
// import sendHttpRequest from '../http/httpAjax';
// import ActvionModal from '../dialog/actionModal';

// const senderAddr = '0xbd2d69e3e68e1ab3944a865b3e566ca5c48740da';

class TextInfo extends Component {

  static propTypes = {
    setDesc: PropTypes.func.isRequired,
    desc: PropTypes.string.isRequired,
    txhash: PropTypes.string.isRequired,
    short_code_link: PropTypes.string.isRequired
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.setDesc);
    this.props.setDesc(this.refs.text_area.value);
    // let { desc, txhash, short_code_link } = this.props;
    // const description = ReactDOM.findDOMNode(this.refs.text_area).value.trim();
    // const uDec = string2Unicode(description);
    // this.setState({
    //   desc: uDec,
    //   txhash: '',
    //   short_code_link: '',
    // });
    // const sha256 = CryptoJS.algo.SHA256.create();
    // const text = CryptoJS.enc.Utf8.parse(description);
    // sha256.update(text);
    // const hashedText = sha256.finalize().toString();
    // const txFileInfo = {
    //   hash: hashedText,
    //   desc: uDec
    // };
    // const createMethod = {
    //   'name': 'add',
    //   'type': 'text'
    // };

    // const addTxParams = createStandardReqParams(txFileInfo, senderAddr, createMethod);

    // if (addTxParams === null) {
    //   console.log('Add-Params is null');
    //   return;
    // }

    // sendHttpRequest(addTxParams, 2, (result)=>{
    //   this.setState({
    //     txhash: result.result,
    //   });
    // }, (error)=>{
    //   console.log('addtx-error=' + error);
    // }, 0);
  }

  render() {
    const styles = require('../localfile/localfile.scss');
    const alert = require('../../img/ic_alert.png');
    // const { desc, txhash, short_code_link } = this.props;
    let modalDalog;
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
        <div className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            {modalDalog}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    desc: state.textInfo.desc,
    txhash: state.textInfo.txhash,
    short_code_link: state.textInfo.short_code_link
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDesc: (val) => {
      dispatch(setDesc(val));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextInfo);
