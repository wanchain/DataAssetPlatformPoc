/**
 * Created by jishiwu on 12/19/16.
 */
/**
 * Created by jishiwu on 12/19/16.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
// import { LinkContainer } from 'react-router-bootstrap';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
// import TabComponent from './Tab/TabComponent';
import * as depositActions from 'redux/modules/deposit';

const styles = require('./Deposit.scss');

@connect(
  (state) => ({
    focusindex: state.deposit.focusindex,
    userbalance: state.deposit.userbalance,
  }),
  depositActions
)
export default class Deposit extends Component {
  static propTypes = {
    focusindex: React.PropTypes.number,
    userbalance: React.PropTypes.object,
    setFocus: React.PropTypes.func,
    item: React.PropTypes.func,
    sendTransaction: React.PropTypes.func,
    doDeposit: React.PropTypes.func,
    getbalance: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.renderBank = this.renderBank.bind(this);
    this.renderTransfer = this.renderTransfer.bind(this);
    this.setFocus0 = this.setFocus0.bind(this);
    this.setFocus1 = this.setFocus1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getbalance();
  }

  setFocus0(event) {
    event.preventDefault();
    this.props.setFocus(0);
  }
  setFocus1(event) {
    event.preventDefault();
    this.props.setFocus(1);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props.focusindex);
    if ( this.props.focusindex === 0 ) {
      const youraddress = this.refs.youraddress;
      const transnumber = this.refs.transnumber;
      const theiraddress = this.refs.theiraddress;
      this.props.sendTransaction({
        contractAddress: youraddress.value,
        number: parseInt(transnumber.value, 10),
        receiverAddress: theiraddress.value
      });
    } else if ( this.props.focusindex === 1 ) {
      const addcash = this.refs.addcash;
      this.props.doDeposit({addcash: parseInt(addcash.value, 10)});
    }
  }

  renderBank() {
    return (
      <div>
        <div className="row">
          <label className={styles.renminbi}>人民币充值</label>
        </div>
        <hr/>
        <div className="row">
          <div className="col-md-6">
            <label className={styles.yue}>余额</label>
          </div>
          <div className="col-md-6">
            <label className={styles.yue}>充值金额</label>
          </div>
          <div className="col-md-6">
            <label className={styles.yuenumber}>￥{this.props.userbalance.cash}</label>
          </div>
          <div className="col-md-6">
            <input className={styles.inputmoney} ref="addcash" placeholder="请输入充值金额" type="text"/>
          </div>
        </div>
      </div>
    );
  }

  renderTransfer() {
    return (
      <div>
        <div className="row">
          <label className={styles.renminbi}>转账</label>
        </div>
        <hr/>

        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <h4>您的账户地址&nbsp;<small>网录币的地址</small></h4>
              <input style={{width: '90%'}}
                     ref="youraddress" onChange={this.onStockNumberChange} type="text" placeholder="请输入您的地址" required/>&nbsp;&nbsp;
              <h4>请输入数量&nbsp;<small>转给别人的数量</small></h4>
              <input style={{width: '90%'}}
                     ref="transnumber" onChange={this.onAssetUnitChange} type="text" placeholder="请输入转账数量" required/>&nbsp;&nbsp;
            </div>
            <div className="col-md-6">
              <h4>对方账户地址&nbsp;<small>对方网录币地址</small></h4>
              <input style={{width: '90%'}}
                     ref="theiraddress" onChange={this.onAssetUnitPriceChange} type="text" placeholder="对方的地址" required/>&nbsp;&nbsp;
              <h4><small style={{color: '#ef2332'}}>注意：一旦转账成功，无法撤销</small></h4>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.focusindex === 1 && this.renderBank()}
        {this.props.focusindex !== 1 && this.renderTransfer()}
        <hr/>
        <div className="row">
          <div className="col-md-3">
            <button type="button" onClick={this.setFocus0} className={styles.fourbtn}>转账</button>
          </div>
          <div className="col-md-3">
            <button type="button" onClick={this.setFocus1} className={styles.fourbtn}>银行卡</button>
          </div>
          <div className="col-md-3">
            <button type="button" className={styles.fourbtn}>支付宝</button>
          </div>
          <div className="col-md-3">
            <button type="button" className={styles.fourbtn}>微信</button>
          </div>
        </div>
        <hr/>
        <div className={styles.center} style={{width: '100%'}}>
           <button className="btn btn-success" onClick={this.handleSubmit}>提交</button>
        </div>
      </div>
    );
  }
}
