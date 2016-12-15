/**
 * Created by jishiwu on 12/5/16.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as assetsActions from 'redux/modules/assets';

@connect(
  () => ({}),
  assetsActions
)
export default class AssetsListItem extends React.Component {
  static propTypes = {
    item: React.PropTypes.object,
    delOne: React.PropTypes.func,
    modify: React.PropTypes.func,
  };

  modify(event) {
    event.preventDefault();
    const item = this.props.item;
    item.assetsName = 'wanglutech' + Math.random();
    this.props.modify(this.props.item);
  }

  delOne(event) {
    event.preventDefault();
    this.props.delOne(this.props.item);
  }

  render() {
    let assetsType = '公开交易';
    if (this.props.item.assetsType === 1) {
      assetsType = '联盟内发行';
    } else if (this.props.item.assetsType === 2) {
      assetsType = '私有发行';
    }

    const exchangeState = this.props.item.exchangeState ? '交易中' : '暂停交易';
    return (
      <tr>
        <td>{ this.props.item.assetsName}</td>
        <td>{ assetsType}</td>
        <td>{ this.props.item.stockNumber}</td>
        <td>{ this.props.item.totalValue}</td>
        <td>{ exchangeState}</td>
        <td>{ this.props.item.publishTime}</td>
        <td>
          <table>
            <tbody>
              <tr>
                <td><button >暂停交易&nbsp;</button></td>
                <td><button onClick={this.modify.bind(this)} >&nbsp;修改</button></td>
              </tr>
              <tr>
                <td><button >名称修改&nbsp;</button></td>
                <td><button onClick={this.delOne.bind(this)} >&nbsp;删除</button></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    );
  }
}


