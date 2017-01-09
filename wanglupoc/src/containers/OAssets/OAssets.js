/**
 * Created by jishiwu on 12/19/16.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as assetsActions from 'redux/modules/assets';
import * as depositAction from 'redux/modules/deposit';
import PopDialog from '../PopDialog/PopDialog';

@connect(
  () => ({}),
  depositAction
)
class ActiveTransactionItem extends Component {
  static propTypes = {
    item: React.PropTypes.object,
    assetsName: React.PropTypes.string,
    setReceipt: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onReceipt = this.onReceipt.bind(this);
  }

  onReceipt(event) {
    event.preventDefault();
    if (this.props.item.receipt) {
      this.props.setReceipt(this.props.item.receipt);
    }
  }

  render() {
    const {item, assetsName} = this.props;
    return (
      <tr>
        <td>{item.timestamp}</td>
        <td>{assetsName}</td>
        <td>转出</td>
        <td>-{item.transferQuantity}</td>
        <td>{item.status}</td>
        <td><a onClick={this.onReceipt}>查证</a></td>
      </tr>
    );
  }
}

@connect(
  state => ({
    focusIndex: state.assets.oassetsFocusIndex,
    activeAssets: state.deposit.activeAssets,
    transactionItems: state.deposit.transactions,
    receipt: state.deposit.receipt,
  }),
  Object.assign({}, assetsActions, depositAction)
)
export default class OAssets extends Component {
  static propTypes = {
    focusIndex: React.PropTypes.number,
    activeAssets: React.PropTypes.object,
    transactionItems: React.PropTypes.array,
    getTransactions: React.PropTypes.func,
    receipt: React.PropTypes.object,
    setReceipt: React.PropTypes.func
  };
  componentDidMount() {
    console.log('.............OAssets willMount');
    this.props.getTransactions();
  }

  // getdata from current active item
  render() {
    // filter the date we want;
    const styles = require('./OAssets.scss');
    const zhuanzhangpng = require('../img/zhuanzhang.png');
    const {activeAssets, transactionItems, receipt} = this.props;
    const stockMoney = activeAssets ? activeAssets.hold * activeAssets.unitPrice : 0;

    const activeTransactionItems = [];
    if (transactionItems && activeAssets) {
      if (transactionItems.length !== 0) {
        transactionItems.map(
          item => {
            if (item.assetContract === activeAssets.contractAddress) {
              activeTransactionItems.push(<ActiveTransactionItem key={item._id} item={item} assetsName={activeAssets.assetsName}/>);
            }
          }
        );
      }
    }
    const time = new Date();
    return (
      <div>
        { receipt && <PopDialog receipt={receipt} /> }
        {activeAssets &&
        <div>
          <div className="row">
            <div className={'col-md-6 ' + styles.padding0}>
              <div className={styles.title}>
                {activeAssets.assetsName}({activeAssets.assetsTitle})
              </div>
              <div className={styles.subtitle}>
                {activeAssets.hold}&nbsp;{activeAssets.assetsTitle}=￥{stockMoney}
              </div>
              <div className={styles.currenttime}>
                {time.toLocaleTimeString()}
              </div>
            </div>
            <div className="col-md-6">
              <ul className="nav navbar-nav navbar-right navbar-right-item">
                <li className={(this.props.focusIndex === 1) ? 'active' : ''}>
                  <Link to="/OAstore" className="header-nav-link" activeClassName="active">
                    <img width={'30px'} height={'30px'} className={styles.zzpng} src={zhuanzhangpng}/><br/>
                    <p>存入</p>
                  </Link>
                </li>
                <li className={(this.props.focusIndex === 2) ? 'active' : ''}>
                  <Link to="/OAtransfer" className="header-nav-link" activeClassName="active">
                    <img width={'30px'} height={'30px'} className={styles.zzpng} src={zhuanzhangpng}/><br/>
                    <p>转账</p>
                  </Link>
                </li>
                <li className={(this.props.focusIndex === 3) ? 'active' : ''}>
                  <Link to="/OAintransfer" className="header-nav-link" activeClassName="active">
                    <img width={'30px'} height={'30px'} className={styles.zzpng} src={zhuanzhangpng}/><br/>
                    <p>内部转账</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <hr/>
          <div className={styles.assetsDetail}>资产详情</div>
          <hr/>
          <div className="panel panel-default">
            <div className="panel-body">
              <table className="table table-hover">
                <thead>
                  <tr><th>账号名称</th><th>资产余额</th><th>资产价值</th><th>资产盈亏</th><th>区块浏览</th></tr>
                </thead>
                <tbody>
                  <tr><td>区块连账户</td><td>1,500</td><td>￥28,778</td><td>￥2,000</td><td><a>进入</a></td></tr>
                  <tr><td>交易账户</td><td>500</td><td>￥23,992</td><td>-￥1,000</td><td><a>进入</a></td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr/>
          <div className={styles.assetsDetail}>交易记录</div>
          <hr/>
          <div className="panel panel-default">
            <div className="panel-body">
              <table className="table table-hover">
                <thead>
                <tr><th>交易时间</th><th>资产名称</th><th>交易数量</th><th>交易类型</th><th>交易状态</th></tr>
                </thead>
                <tbody>{activeTransactionItems}</tbody>
              </table>
            </div>
          </div>
        </div>
        }
        {!activeAssets &&
          <div>
            等待数据中....
          </div>
        }
      </div>
    );
  }
}
