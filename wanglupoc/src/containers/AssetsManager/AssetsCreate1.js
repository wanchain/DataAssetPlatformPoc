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
    setCreateStep: React.PropTypes.func,
    setListActive: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkAssetName = this.checkAssetName.bind(this);
    this.checkTitle = this.checkTitle.bind(this);
    this.selectAssetType = this.selectAssetType.bind(this);
    this.publicPublish = this.publicPublish.bind(this);
  }
  componentWillMount() {
    this.props.setListActive(false);
    this.props.setCreateStep(1);
  }

  componentDidMount() {
    // document.getElementById('left').style.height = document.getElementById('right').offsetHeight + 'px';
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
    event.preventDefault();
    // TODO: limit to 4 char
    const tmp = {...this.props.item};
    tmp.assetsTitle = event.target.value;
    this.props.setItem(tmp);
  }

  publicPublish() {
    // TODO:
  }

  selectAssetType(event) {
    const tmp = {...this.props.item};
    tmp.assetsType = event.target.value;
    this.props.setItem(tmp);
  }

  render() {
    const errorBtnIcn = require('./icon/errorBtnIcn.png');
    const rightBtnIcn = require('./icon/rightBtnIcn.png');
    // const assetStyle = require('./assetmanager.scss');

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4>资产名称&nbsp;<small>资产名称将作为识别该资产的对外标识</small></h4>
            <input value={this.props.item.assetsName} style={{width: '60%'}}
              ref="assetsName" onChange={this.checkAssetName} type="text" placeholder="请输入资产名称" required/>&nbsp;&nbsp;
            <img src={rightBtnIcn}/><br/>
          <h4>英文代码&nbsp;<small>英文代码是该资产的英文缩写，便于查找和识别</small></h4>
            <input value={this.props.item.assetsTitle} style={{width: '60%'}}
              ref="assetsTitle" onChange={this.checkTitle} type="text" placeholder="请输入英文代码" required/>&nbsp;&nbsp;
            <img src={rightBtnIcn}/><br/>
          <h4 >资产类型&nbsp;<small>不同的资产类型创建模式和要求不同</small></h4>

          <select defaultValue={this.props.item.assetsType} onChange={this.selectAssetType} style={{width: '30%'}} className="btn btn-primary">
            <option value="0">公开资产</option>
            <option value="1">联盟资产</option>
            <option value="2">私有资产</option>
          </select>&nbsp;&nbsp;
          <button type="button" onClick={this.publicPublish} className="btn btn-default" >公开发行股权</button>&nbsp;&nbsp;
          <img src={errorBtnIcn}/>&nbsp;&nbsp;<small>请选择资产类型</small>

          <br/>
          <hr/>

          <button className="btn btn-success" type="submit" >下一步</button>
        </form>

      </div>
    );
  }
}
