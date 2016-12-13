/**
 * Created by jishiwu on 11/22/16.
 */
import React, {Component} from 'react';
// import PathNavbar from './PathNavbar';
// import {connect, Link} from 'react-redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
// import {bindActionCreators} from 'redux';
// import { nextAssetsStep} from 'redux/modules/AssetsManagerRedux';
import * as assetsActions from 'redux/modules/assets';
@connect(
  (state) => ({
    item: state.assets.item
  }),
  assetsActions
)
export default class AssetsCreate1 extends Component {
  static propTypes = {
    location: React.PropTypes.object,
    item: React.PropTypes.object,
    setItem: React.PropTypes.func,
    setCreateStep: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkAssetName = this.checkAssetName.bind(this);
    this.checkTitle = this.checkTitle.bind(this);
    this.selectAssetClass = this.selectAssetClass.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setCreateStep(2);
    browserHistory.push('/myroutera/create/step2');
  }

  checkAssetName(event) {
    // this.setState({
    //   assetsName: event.target.value
    // });

    const tmp = Object.assign({}, this.props.item);
    tmp.assetsName = event.target.value;
    this.props.setItem(tmp);
  }

  checkTitle(event) {
    // TODO: limit to 4 char
    const tmp = {...this.props.item};
    tmp.assetsTitle = event.target.value;
    this.props.setItem(tmp);
  }

  selectAssetClass() {
    // TODO:
  }

  publicPublish() {
    // TODO:
  }

  render() {
    const errorBtnIcn = require('./icon/errorBtnIcn.png');
    const rightBtnIcn = require('./icon/rightBtnIcn.png');
    // const assetStyle = require('./assetmanager.scss');

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4>资产名称&nbsp;<small>资产名称将作为识别该资产的对外标识</small></h4>
            <input value={this.props.item.assetsName}
              ref="assetsName" onChange={this.checkAssetName} type="text" placeholder="请输入资产名称" required/>&nbsp;&nbsp;
            <img src={rightBtnIcn}/><br/>
          <h4>英文代码&nbsp;<small>英文代码是该资产的英文缩写，便于查找和识别</small></h4>
            <input value={this.props.item.assetsTitle}
              ref="assetsTitle" onChange={this.checkTitle} type="text" placeholder="请输入英文代码" required/>&nbsp;&nbsp;
            <img src={rightBtnIcn}/><br/>
          <h4 >资产类型&nbsp;<small>不同的资产类型创建模式和要求不同</small></h4>

          <button onClick={this.selectAssetClass} className="btn btn-primary">点击选择类型</button>&nbsp;&nbsp;
          <label htmlFor="idSelect"> 点击选择类型 </label>
          <select id="idSelect">
            <option value="0">公开发行</option>
            <option value="1">联盟内发行</option>
            <option value="2">私有发行</option>
          </select>
          <button onClick={this.publicPublish} className="btn btn-default">公开发行股权</button>&nbsp;&nbsp;
          <img src={errorBtnIcn}/><small>请选择资产类型</small><br/>

          <hr/>
        </form>

        {/* <Link onMouseDown={this.handleSubmit} to="/myroutera/create/step2" ><button className="btn btn-success">下一步</button></Link>*/}
        <button className="btn btn-success" onClick={this.handleSubmit}>下一步</button>
      </div>
    );
  }
}
