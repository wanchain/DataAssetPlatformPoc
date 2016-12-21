/**
 * Created by jishiwu on 12/20/16.
 */
import React, { Component } from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';

export default class TRecordsItem extends Component {
  static propTypes = {
    item: React.PropTypes.object,
  };
  // //////current reacord
  // fromAddress: String,
  // fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  // toAddress: String,
  // assetContract: String,
  // valuePerShare: {type: Number},
  // transferQuantity: {type: Number},
  // timestamp: {type: Date, default: Date.now},
  // status: {type: String, enum: ['validating', 'failed', 'completed']}

  render() {
    const totalPrice = this.props.item.valuePerShare * this.props.item.transferQuantity;
    return (
      <tr>
        <td>{ this.props.item.timestamp}</td>
        <td>网录币</td>
        <td>买入</td>
        <td>{ totalPrice }</td>
        <td>+{this.props.item.transferQuantity}</td>
        <td>￥{this.props.item.valuePerShare}</td>
        <td>￥0</td>
        <td>{ this.props.item.status}</td>
      </tr>
    );
  }
}
