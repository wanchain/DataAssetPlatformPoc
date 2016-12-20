/**
 * Created by jishiwu on 12/19/16.
 */
import React, { Component } from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
import BankCard from './BankCard';

export default class Withdraw extends Component {
  render() {
    const styles = require('./Withdraw.scss');

    return (
      <div>
        <div className="row">
          <label className={styles.renminbi}>人民币提现</label>
        </div>
        <hr/>
        <div className="row">
          <div className="col-md-5">
            <label className={styles.yue}>余额</label>
          </div>
          <div className="col-md-7">
            <label className={styles.yue}>提现金额&nbsp;&nbsp;&nbsp;<small className={styles.redfont}>手续费：Y89.00</small></label>
          </div>
          <div className="col-md-5">
            <label className={styles.yuenumber}>￥209,999.00</label>
          </div>
          <div className="col-md-7">
            <input className={styles.inputmoney} placeholder="请输入提现金额" />
          </div>
        </div>
        <hr/>
        <div>
          <h6>根据您绑定的银行卡，提现账号如下，确认请提交，新增银行卡请点击[<a>这里</a>]</h6>
          <BankCard name="杨涛" bank="北京银行中关村支行" number="8888 8888 8888 8888" />
        </div>
      </div>
    );
  }
}
