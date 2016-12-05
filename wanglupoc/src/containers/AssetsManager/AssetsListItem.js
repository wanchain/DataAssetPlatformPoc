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
    delOne: React.PropTypes.func
  };

  modify(event) {
    event.preventDefault();
  }

  delOne(event) {
    event.preventDefault();
    this.props.delOne(this.props.item);
  }

  render() {
    return (
      <tr>
        <td>{ this.props.item.corporation}</td>
        <td>{ this.props.item.property}</td>
        <td>{ this.props.item.stocktotalnumber}</td>
        <td>{ this.props.item.totalvalue}</td>
        <td>{ this.props.item.exchangestate}</td>
        <td>{ this.props.item.createtime}</td>
        <td>
          <table>
            <tbody>
              <tr>
                <td><a >暂停交易&nbsp;</a></td>
                <td><a onClick={this.modify.bind(this)} >&nbsp;修改</a></td>
              </tr>
              <tr>
                <td><a >名称修改&nbsp;</a></td>
                <td><a onClick={this.delOne.bind(this)} >&nbsp;删除</a></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    );
  }
}


