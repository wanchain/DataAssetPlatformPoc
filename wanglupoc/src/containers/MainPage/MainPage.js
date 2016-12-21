/**
 * Created by jishiwu on 12/19/16.
 */
import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import {connect} from 'react-redux';
import * as depositActions from 'redux/modules/deposit';

@connect(
  (state) => ({
    userbalance: state.deposit.userbalance,
  }),
  depositActions
)
export default class MainPage extends Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    userbalance: React.PropTypes.object,
    getbalance: React.PropTypes.func
  };

  componentWillMount() {
    // this.props.getbalance();
  }

  render() {
    const styles = require('./MainPage.scss');
    const totalcash = this.props.userbalance.cash;
    let totalstockmoney = 0;
    // const currentDate = new Date();

    const assetslist = [];

    if (this.props.userbalance && this.props.userbalance.assets && this.props.userbalance.assets.length > 0) {
      this.props.userbalance.assets.map((item1) => {
        const stockmoney = item1.unitPrice * item1.hold;
        totalstockmoney = totalstockmoney + stockmoney;
        assetslist.push(
          <li><h6>{item1.assetsName + '(' + item1.assetsTitle + ')'}</h6></li>);
        assetslist.push(
          <h5>￥{stockmoney}&nbsp;&nbsp;|&nbsp;&nbsp;{item1.hold}股</h5>);
      });
    }
    const totalmoney = totalcash + totalstockmoney;

    return (
      <div className={'container ' + styles.main} >
        <div className={'row' + styles.content}>
          <div className={'col-md-2 ' + styles.mainleft}>
            <h4>资产总额</h4>
            <h4>￥{totalmoney}</h4>
            <h6>人民币</h6>
            <h4>￥{totalcash}</h4>
            <h6><small>2016-12-21</small></h6>
            <Nav activeKey="1" >
              <hr className={styles.divider}/>
              <LinkContainer to="/deposit">
                <NavItem eventKey={1}>充值</NavItem>
              </LinkContainer>
              <LinkContainer to="/withdraw">
                <NavItem eventKey={2}>提现</NavItem>
              </LinkContainer>
              <LinkContainer to="/main">
                <NavItem eventKey={3}>资产</NavItem>
              </LinkContainer>
              <hr className={styles.divider}/>
            </Nav>

            <ul>
              {/* {item && <li><h6>{item.assetsName + '(' + item.assetsTitle + ')'}</h6></li>}*/}
              {/* {item && <h5>￥{stockmoney}&nbsp;&nbsp;|&nbsp;&nbsp;{item.hold}股</h5>};*/}
              {assetslist}
            </ul>

            <Nav>
              <hr className={styles.divider}/>
              <LinkContainer to="/tmarket">
                <NavItem eventKey={4}>交易市场</NavItem>
              </LinkContainer>
              <LinkContainer to="/trecords">
                <NavItem eventKey={5}>交易记录</NavItem>
              </LinkContainer>
              <LinkContainer to="/setting" disabled>
                <NavItem eventKey={6}>设置</NavItem>
              </LinkContainer>
              <LinkContainer to="/ee">
                <NavItem eventKey={7}>存证</NavItem>
              </LinkContainer>
              <LinkContainer to="/am">
                <NavItem eventKey={399}>资产发行</NavItem>
              </LinkContainer>
            </Nav>
          </div>
          <div className={'col-md-10 ' + styles.mainright}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
