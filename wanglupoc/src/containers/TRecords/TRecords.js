/**
 * Created by jishiwu on 12/19/16.
 * All Trade Records
 */
import React, { Component } from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
import {connect} from 'react-redux';
import * as depositActions from 'redux/modules/deposit';
import TRecordsItem from './TRecordsItem';

@connect(
  (state) => ({
    items: state.deposit.transactions
  }),
  depositActions
)
export default class TRecords extends Component {
  static propTypes = {
    items: React.PropTypes.array,
    user: React.PropTypes.object,
    getTransactions: React.PropTypes.func,
  };

  componentDidMount() {
    // this.props.getTransactions();
    const self = this;
    global.dataRefreshNotifier.on('updateData', function NoName() {
      // console.log('***TRecords updateData');
      self.props.getTransactions();
    });
  }

  render() {
    // const styles = require('./OAssets.scss');
    const items = [];
    if (this.props.items) {
      if (this.props.items.length !== 0) {
        this.props.items.map(
          item => items.push(<TRecordsItem key={item._id} item={item} />)
        );
      }
    }

    return (
      <div>
        <h4>交易记录</h4>
        <div className="panel panel-default">
          <div className="panel-body">
            <table className="table table-hover">
              <thead>
              <tr>
                <th>交易时间</th>
                <th>资产名称</th>
                <th>交易类型</th>
                <th>金额</th>
                <th>数量</th>
                <th>单价</th>
                <th>手续费</th>
                <th>状态</th>
              </tr>
              </thead>
              <tbody>{items}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
