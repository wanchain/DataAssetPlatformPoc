/**
 * Created by jishiwu on 11/22/16.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as assetsActions from 'redux/modules/assets';

@connect(
  (state) => ({
    item: state.assets.item
  }),
  assetsActions
)
export default class AssetsCreate2 extends Component {
  static propTypes = {
    location: React.PropTypes.object,
    item: React.PropTypes.object,
    setItem: React.PropTypes.func,
    addOneAssets: React.PropTypes.func,
    setCreateStep: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.onStockNumberChange = this.onStockNumberChange.bind(this);
    this.onAssetUnitChange = this.onAssetUnitChange.bind(this);
    this.onAssetUnitPriceChange = this.onAssetUnitPriceChange.bind(this);
    this.importOwnersFromExcel = this.importOwnersFromExcel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  onStockNumberChange(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
    const tmp = Object.assign({}, this.props.item);
    tmp.stockNumber = event.target.value;
    this.props.setItem(tmp);
  }

  onAssetUnitChange(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
    const tmp = Object.assign({}, this.props.item);
    tmp.unitType = event.target.value;
    this.props.setItem(tmp);
  }

  onAssetUnitPriceChange(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
    const tmp = Object.assign({}, this.props.item);
    tmp.unitPrice = event.target.value;
    this.props.setItem(tmp);
  }

  importOwnersFromExcel(event) {
    console.log(event);
    const tmp = Object.assign({}, this.props.item);
    tmp.members = event.target.value;
    this.props.setItem(tmp);
  }

  handleSubmit(event) {
    event.preventDefault();

    // check data, then submit
    this.props.addOneAssets(this.props.item);
    this.props.setCreateStep(3);
    browserHistory.push('/myroutera/create/step3');
  }

  handleSave(event) {
    console.log(event);
  }

  render() {
    const errorBtnIcn = require('./icon/errorBtnIcn.png');
    const rightBtnIcn = require('./icon/rightBtnIcn.png');
    // const assetStyle = require('./assetmanager.scss');
    // const isListActive = false;

    // {/*<a className="btn btn-success" to="/assets/create/3">下一步</a>*/}
    return (
      <div >
        <div id="target"></div>
        <form onSubmit={this.handleSubmit}>
          <h4>资产总量&nbsp;<small>本次发行的资产总计数量</small></h4>
            <input value={this.props.item.stockNumber}
              ref="stockNumber" onChange={this.onStockNumberChange} type="text" placeholder="请输入整数"/>&nbsp;&nbsp;
            <img src={errorBtnIcn}/><br/>
          <h4>资产单位&nbsp;<small>以什么单位标识资产数量，如“股”，“份”</small></h4>
            <input value={this.props.item.unitType}
              ref="unitType" onChange={this.onAssetUnitChange} type="text" placeholder="中英文不超过4个字符"/>&nbsp;&nbsp;
            <img src={errorBtnIcn}/><br/>
          <h4>资产单价&nbsp;<small>发行时的资产单价：每个整数资产的价格</small></h4>
            <input value={this.props.item.unitPrice}
              ref="unitPrice" onChange={this.onAssetUnitPriceChange} type="text" placeholder="以人民币计价，小数2位"/>&nbsp;&nbsp;
            <img src={rightBtnIcn}/><br/>
          <h4>资产所有者名单导入&nbsp;<small>按照模板导入EXCEL文件</small></h4>
            <input
              ref="members" onChange={this.importOwnersFromExcel} type="file" accept="application/vnd.ms-excel" placeholder="文本字体"/>&nbsp;&nbsp; <br/>
          <h4>发行时间&nbsp;<small>资产及所有者写入区块链的时间</small></h4>
            <input type="date" /><br/>
          <p/>
          <p/>
          <p/>
          <hr/>

          <button onClick={this.handleSave} className="btn btn-success">保存</button>&nbsp;&nbsp;
          <button className="btn btn-primary" onClick={this.handleSubmit}>提交</button>

        </form>
       </div>
    );
  }
}
