/**
 * Created by jishiwu on 11/22/16.
 */
import React, {Component} from 'react';
// import Helmet from 'react-helmet';
// import AssetsNavbar from './AssetsNavbar';
// import PathNavbar from './PathNavbar';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
// import { nextAssetsStep} from 'redux/modules/AssetsManagerRedux';


// @connect(
//   state =>({
//     assetsManager: state.assetsManager
//   }),
//   dispatch => {
//     return bindActionCreators({ nextAssetsStep}, dispatch);
//   }
// )
export default class AssetsCreate2 extends Component {
  static propTypes = {
    // nextAssetsStep: PropTypes.func,
    // assetsManager: PropTypes.object,
    location: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onStockNumberChange = this.onStockNumberChange.bind(this);
    this.onAssetUnitChange = this.onAssetUnitChange.bind(this);
    this.onAssetUnitPriceChange = this.onAssetUnitPriceChange.bind(this);
    this.importOwnersFromExcel = this.importOwnersFromExcel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSave = this.handleSave.bind(this);

    const createData = this.props.location.state.createStep2;

    this.state = {
      stockNumber: createData.stockNumber,
      unitType: createData.unitType,
      unitPrice: createData.unitPrice,
      members: createData.members,
    };
  }

  onStockNumberChange(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
    this.setState({
      stockNumber: event.target.value
    });
  }

  onAssetUnitChange(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
    this.setState({
      unitType: event.target.value
    });
  }

  onAssetUnitPriceChange(event) {
    event.target.value = event.target.value.replace(/\D/g, '');
    this.setState({
      unitPrice: event.target.value
    });
  }

  importOwnersFromExcel(event) {
    console.log(event);
    // TODO: first: clear members...maybe it's better saved as a json string, than
    this.setState({
      members: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const stockNumber = this.refs.stockNumber.value;
    const unitType = this.refs.unitType.value;
    const unitPrice = this.refs.unitPrice.value;
    const members = this.refs.members.value;

    // check valid
    console.log(stockNumber);
    console.log(unitType);
    console.log(unitPrice);
    console.log(members);

    // submit
    this.props.location.state.createStep2.setCreateStep2({
      stockNumber: stockNumber, unitType: unitType, unitPrice: unitPrice, members: members
    });

    // clear state
    this.props.location.state.setStep(3);

    // TODO: if success, we should clear the creatData?????
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
        <form onSubmit={this.handleSubmit}>
          <h4>资产总量&nbsp;<small>本次发行的资产总计数量</small></h4>
            <input value={this.state.stockNumber}
              ref="stockNumber" onChange={this.onStockNumberChange} type="text" placeholder="请输入整数"/>&nbsp;&nbsp;
            <img src={errorBtnIcn}/><br/>
          <h4>资产单位&nbsp;<small>以什么单位标识资产数量，如“股”，“份”</small></h4>
            <input value={this.state.unitType}
              ref="unitType" onChange={this.onAssetUnitChange} type="text" placeholder="中英文不超过4个字符"/>&nbsp;&nbsp;
            <img src={errorBtnIcn}/><br/>
          <h4>资产单价&nbsp;<small>发行时的资产单价：每个整数资产的价格</small></h4>
            <input value={this.state.unitPrice}
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
          <Link onMouseDown={this.handleSubmit} to={{pathname: '/myroutera/create/step3', state: this.props.location.state}}>
            <button className="btn btn-primary">提交</button>
          </Link>

        </form>
       </div>
    );
  }
}
