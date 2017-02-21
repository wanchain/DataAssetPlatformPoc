/**
 * Created by jishiwu on 12/22/16.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as depositAction from '../../redux/modules/deposit';

const styles = require('./OAssetTransfer.scss');
@connect(
  state => ({
    // user: state.auth.user,
    activeAssets: state.deposit.activeAssets,
  }),
  depositAction
)
export default class OAssetTransfer extends Component {
  static propTypes = {
    // user: React.PropTypes.object,
    activeAssets: React.PropTypes.object,
    sendTransaction: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const youraddress = this.refs.youraddress;
    const transnumber = this.refs.transnumber;
    const theiraddress = this.refs.theiraddress;
    this.props.sendTransaction({
      contractAddress: youraddress.value,
      number: parseInt(transnumber.value, 10),
      receiverAddress: theiraddress.value,
    });
  }

  render() {
    const {activeAssets} = this.props;
    return (
      <div>
        <div className="row">
          <label className={styles.renminbi}>转账</label>
          <label className={styles.renminbi}>{activeAssets.assetsName}({activeAssets.assetsTitle})</label>
        </div>
        <hr/>

        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <h4>您的合约地址&nbsp;<small>网录币的地址</small></h4>
              <input style={{width: '90%'}}
                     ref="youraddress" type="text" placeholder="请输入您的地址" value={activeAssets.contractAddress} disabled required/>&nbsp;&nbsp;
              <h4>请输入数量&nbsp;<small>转给别人的数量</small></h4>
              <input style={{width: '90%'}}
                     ref="transnumber" type="text" placeholder="请输入转账数量" required/>&nbsp;&nbsp;
            </div>
            <div className="col-md-6">
              <h4>对方账户地址&nbsp;<small>对方网录币地址</small></h4>
              <input style={{width: '90%'}}
                     ref="theiraddress" type="text" placeholder="对方的地址" required/>&nbsp;&nbsp;
              <h4><small style={{color: '#ef2332'}}>注意：一旦转账成功，无法撤销</small></h4>
            </div>
          </div>
          <hr/>
          <div className={styles.center} style={{width: '100%'}}>
            <button className="btn btn-success" onClick={this.handleSubmit}>提交</button>
          </div>
        </form>
      </div>
    );
  }
}
