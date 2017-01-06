/**
 * Created by jishiwu on 12/19/16.
 */
import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import {connect} from 'react-redux';
import * as depositActions from 'redux/modules/deposit';
import { push } from 'react-router-redux';

const styles = require('./MainPage.scss');

@connect(
  (state) => ({
    user: state.auth.user
  }),
  Object.assign({}, {pushState: push}, depositActions)
)
class NavAssetsList extends Component {
  static propTypes = {
    item: React.PropTypes.object,
    user: React.PropTypes.object,
    setActiveAssets: React.PropTypes.func,
    pushState: React.PropTypes.func.isRequired,
  };

  onActiveAssets(event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.setActiveAssets(this.props.item);
    this.props.pushState('/main');
  }
  render() {
    const {item} = this.props;
    const stockmoney = item.unitPrice * item.hold;
    return (
      <div >
        <div className={styles.dot}> {item.assetsName + '(' + item.assetsTitle + ')'}</div>
        <a onClick={this.onActiveAssets.bind(this)} className={styles.assets}>￥{stockmoney}&nbsp;|&nbsp;{item.hold}股</a>
      </div>
    );
  }
}

@connect(
  (state) => ({
    userbalance: state.deposit.userbalance,
    activeAssets: state.deposit.activeAssets,
  }),
  Object.assign({}, {pushState: push}, depositActions)
)
export default class MainPage extends Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    userbalance: React.PropTypes.object,
    getbalance: React.PropTypes.func,
    params: React.PropTypes.object,
    pushState: React.PropTypes.func.isRequired,
    activeAssets: React.PropTypes.object,
    setActiveAssets: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.initActiveAssets = this.initActiveAssets.bind(this);
  }

  componentDidMount() {
    // if (!this.props.userbalance) {
    console.log('.............MainPage willMount');
    this.props.getbalance();
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.activeAssets && nextProps.userbalance) {
      this.initActiveAssets(nextProps.userbalance);
    }
  }

  initActiveAssets(userbalance) {
    if (userbalance && userbalance.assets && userbalance.assets.length > 0) {
      this.props.setActiveAssets(userbalance.assets[0]);
    }
  }

  render() {
    const {userbalance} = this.props;

    let totalcash = 0;
    let totalstockmoney = 0;
    const currentDate = new Date();

    const assetslist = [];
    if (userbalance ) {
      totalcash = userbalance.cash;
      if (userbalance.assets && userbalance.assets.length > 0) {
        userbalance.assets.map((item) => {
          const stockmoney = item.unitPrice * item.hold;
          totalstockmoney = totalstockmoney + stockmoney;
          assetslist.push(<NavAssetsList key={item._id} item={item}/>);
        });
      }
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
            <h6>
              <small>{currentDate.toLocaleDateString()}</small>
            </h6>
            <Nav activeKey="1">
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

            <Nav>
              {assetslist}
            </Nav>

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
              <LinkContainer to="/LFH">
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
