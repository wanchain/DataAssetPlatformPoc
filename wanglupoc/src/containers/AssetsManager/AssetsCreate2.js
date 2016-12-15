/**
 * Created by jishiwu on 11/22/16.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as assetsActions from 'redux/modules/assets';
// import * as SimpleExcelTest from '../../../local_modules/simple-excel';

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
    setCreateStep: React.PropTypes.func,
    setListActive: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.onStockNumberChange = this.onStockNumberChange.bind(this);
    this.onAssetUnitChange = this.onAssetUnitChange.bind(this);
    this.onAssetUnitPriceChange = this.onAssetUnitPriceChange.bind(this);
    this.importOwnersFromExcel = this.importOwnersFromExcel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.onPublishTimeChange = this.onPublishTimeChange.bind(this);
  }

  componentWillMount() {
    this.props.setListActive(false);
    this.props.setCreateStep(2);
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

  onPublishTimeChange(event) {
    console.log(event.target.value);
    const tmp = Object.assign({}, this.props.item);
    tmp.publishTime = event.target.value;
    this.props.setItem(tmp);
  }

  importOwnersFromExcel(event) {
    console.log(event);
    const tmp = Object.assign({}, this.props.item);
    tmp.members = event.target.value;
    this.props.setItem(tmp);

    require('../../../local_modules/simple-excel');
    const csvParser = new window.SimpleExcel.Parser.CSV();
    // const csvParser = new SimpleExcelOut.Parser.CSV();
    csvParser.loadFile(event.target.files[0], () => {
      console.log(csvParser.getSheet());
    });

    // const gbk = window.gbk;
    // const name = csvParser.getSheet().getCell(0, 0).value;
    // const utf8String = gbk.toString('utf-8', name);
    // console.log(utf8String);
  }

  handleSubmit(event) {
    event.preventDefault();

    // check data, then submit
    this.props.addOneAssets(this.props.item);
    this.props.setCreateStep(3);
    browserHistory.push('/myroutera/create/step3');
  }

  handleSave(event) {
    console.log(event.target.value);
  }

  render() {
    const errorBtnIcn = require('./icon/errorBtnIcn.png');
    const rightBtnIcn = require('./icon/rightBtnIcn.png');
    const assetStyle = require('./assetmanager.scss');

    return (
      <div >
        <div id="target"></div>
        <form onSubmit={this.handleSubmit}>
          <h4>资产总量&nbsp;<small>本次发行的资产总计数量</small></h4>
            <input value={this.props.item.stockNumber} style={{width: '60%'}}
              ref="stockNumber" onChange={this.onStockNumberChange} type="text" placeholder="请输入整数" required/>&nbsp;&nbsp;
            <img src={errorBtnIcn}/><br/>
          <h4>资产单位&nbsp;<small>以什么单位标识资产数量，如“股”，“份”</small></h4>
            <input value={this.props.item.unitType} style={{width: '60%'}}
              ref="unitType" onChange={this.onAssetUnitChange} type="text" placeholder="中英文不超过4个字符" required/>&nbsp;&nbsp;
            <img src={errorBtnIcn}/><br/>
          <h4>资产单价&nbsp;<small>发行时的资产单价：每个整数资产的价格</small></h4>
            <input value={this.props.item.unitPrice} style={{width: '60%'}}
              ref="unitPrice" onChange={this.onAssetUnitPriceChange} type="text" placeholder="以人民币计价，小数2位" required/>&nbsp;&nbsp;
            <img src={rightBtnIcn}/><br/>
          <h4>资产所有者名单导入&nbsp;<small>按照模板导入EXCEL文件</small></h4>

          <a className={assetStyle.file}>
            <input
              ref="members" onChange={this.importOwnersFromExcel} type="file" accept="application/vnd.ms-excel"/>
              选择Excel文件
          </a> &nbsp;&nbsp; <br/>

          <h4>发行时间&nbsp;<small>资产及所有者写入区块链的时间</small></h4>
            <input defaultValue={this.props.item.publishTime} onChange={this.onPublishTimeChange} style={{width: '60%'}} type="date" required/><br/>
          <p/>
          <p/>
          <p/>
          <hr/>

          <button onClick={this.handleSave} className="btn btn-success" type="button">保存</button>&nbsp;&nbsp;
          <button className="btn btn-primary" type="submit">提交</button>

        </form>
       </div>
    );
  }
}
