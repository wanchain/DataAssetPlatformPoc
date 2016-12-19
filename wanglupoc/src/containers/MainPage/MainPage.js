/**
 * Created by jishiwu on 12/19/16.
 */
import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

export default class MainPage extends Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
  };
  render() {
    const styles = require('./MainPage.scss');

    return (
      <div className={'container ' + styles.main} >
        <div className="row">
          <div className={'col-md-2 ' + styles.mainleft}>
            <h4>资产总额</h4>
            <h4>￥789,789</h4>
            <h6>人民币</h6>
            <h4>￥789,789</h4>
            <h6><small>2016-12-23</small></h6>
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
            </Nav>

            <ul>
              <hr className={styles.divider}/>
              <li><h6>网录币（WLC)</h6><h5>Y438,999&nbsp;&nbsp;|&nbsp;&nbsp;1,700&nbsp;股</h5></li>
              <li><h6>网录币（WLC)</h6><h5>Y438,999&nbsp;&nbsp;|&nbsp;&nbsp;1,700&nbsp;股</h5></li>
              <li><h6>新海股份（XH）</h6><h5>Y438,999&nbsp;&nbsp;|&nbsp;&nbsp;1,700&nbsp;股</h5></li>
            </ul>

            <Nav>
              <hr className={styles.divider}/>
              <LinkContainer to="/tmarket">
                <NavItem eventKey={4}>交易市场</NavItem>
              </LinkContainer>
              <LinkContainer to="/trecords">
                <NavItem eventKey={5}>交易记录</NavItem>
              </LinkContainer>
              <LinkContainer to="/setting">
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
