/**
 * Created by jishiwu on 11/22/16.
 */
import React, { Component } from 'react';
// import PathNavbar from './PathNavbar';
// import {connect, Link} from 'react-redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
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
    setCreateStep: React.PropTypes.func,
    setListActive: React.PropTypes.func
  }
  componentWillMount() {
    this.props.setListActive(false);
    this.props.setCreateStep(1);
  }

  componentDidMount() {
    // document.getElementById('left').style.height = document.getElementById('right').offsetHeight + 'px';
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.setCreateStep(2);
    browserHistory.push('/am/create/step2');
  }

  checkAssetName = (event) => {
    const tmp = Object.assign({}, this.props.item);
    tmp.assetsName = event.target.value;
    this.props.setItem(tmp);
  }

  checkTitle = (event) => {
    event.preventDefault();
    // TODO: limit to 4 char
    const tmp = {...this.props.item};
    tmp.assetsTitle = event.target.value;
    this.props.setItem(tmp);
  }

  publicPublish() {
    // TODO:
  }

  selectAssetType = (event) => {
    const tmp = {...this.props.item};
    tmp.assetsType = event.target.value;
    this.props.setItem(tmp);
  }

  render() {
    const errorBtnIcn = require('./icon/errorBtnIcn.png');
    const rightBtnIcn = require('./icon/rightBtnIcn.png');
    return (
      <div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <h4>资产名称&nbsp;<small>资产名称将作为识别该资产的对外标识</small></h4>
            <input value={this.props.item.assetsName} style={{width: '60%'}}
              ref="assetsName" onChange={ (event) => this.checkAssetName(event) } type="text" placeholder="请输入资产名称" required/>&nbsp;&nbsp;
            <img src={rightBtnIcn}/><br/>
          <h4>英文代码&nbsp;<small>英文代码是该资产的英文缩写，便于查找和识别</small></h4>
            <input value={this.props.item.assetsTitle} style={{width: '60%'}}
              ref="assetsTitle" onChange={ (event) => this.checkTitle(event)} type="text" placeholder="请输入英文代码" required/>&nbsp;&nbsp;
            <img src={rightBtnIcn}/><br/>
          <h4 >资产类型&nbsp;<small>不同的资产类型创建模式和要求不同</small></h4>

          <select defaultValue={this.props.item.assetsType} onChange={ (event) => this.selectAssetType(event) } style={{width: '30%'}} className="btn btn-primary">
            <option value="0">公开资产</option>
            <option value="1">联盟资产</option>
            <option value="2">私有资产</option>
          </select>&nbsp;&nbsp;
          <button type="button" onClick={ (event) => this.publicPublish(event) } className="btn btn-default" >公开发行股权</button>&nbsp;&nbsp;
          <img src={errorBtnIcn}/>&nbsp;&nbsp;<small>请选择资产类型</small>

          <br/>
          <hr/>

          <button className="btn btn-success" type="submit" >下一步</button>
        </form>

      </div>
    );
  }
}
