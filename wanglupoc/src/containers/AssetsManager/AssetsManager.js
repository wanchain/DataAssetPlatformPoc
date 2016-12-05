/**
 * Created by jishiwu on 11/18/16.
 */
import React, {Component, PropTypes} from 'react';
// import { connect } from 'react-redux';
import {Link} from 'react-router';
// import {bindActionCreators} from 'redux';
import Helmet from 'react-helmet';
import PathNavbar from './PathNavbar';
// import AssetsList from './AssetsList';
// import AssetsCreate from './AssetsCreate';

// import actions
// import {listAssetsActived, createAssetsActived} from 'redux/modules/AssetsManagerRedux';

// @connect(
//   state => ({
//     assetsManager: state.assetsManager
//   }),
//   dispatch => {
//     return bindActionCreators({ listAssetsActived: listAssetsActived, createAssetsActived: createAssetsActived}, dispatch);
//   }
// )
// @connect(
//   state => ({
//     assetsManager: state.assetsManager
//   }),
//   dispatch => {
//     return bindActionCreators({ listAssetsActived, createAssetsActived}, dispatch);
//   }
// )
export default class AssetsManager extends Component {
  static propTypes = {
    // assetsManager: PropTypes.object,
    // listAssetsActived: PropTypes.func,
    // createAssetsActived: PropTypes.func
    children: PropTypes.object
  };

  constructor(props) {
    super(props);

    // this.setCreateActive = this.setCreateActive.bind(this);
    // this.onAssetsList = this.onAssetsList.bind(this);
    // this.onCreateAssets = this.onCreateAssets.bind(this);

    this.setCreateStep1 = this.setCreateStep1.bind(this);
    this.setCreateStep2 = this.setCreateStep2.bind(this);
    this.setStep = this.setStep.bind(this);
    this.resetCreatData = this.resetCreatData.bind(this);
    this.setListActive = this.setListActive.bind(this);

    // once
    this.state = {
      isListActive: true,
      step: 1,
      assetslist: {

        items: [{
          id: 1,
          corporation: '时代网',
          property: '公开发行股份',
          stocktotalnumber: '10,000,000',
          totalvalue: '￥271,818,99',
          exchangestate: '交易中',
          createtime: '2012/12/08'
        }, {
          id: 2,
          corporation: '时代网',
          property: '公开发行股份',
          stocktotalnumber: '20,000,000',
          totalvalue: '￥478,878,99',
          exchangestate: '交易中',
          createtime: '2016/10/08'
        }]
      },
      create: {
        setListActive: this.setListActive,
        setStep: this.setStep,
        createStep1: {
          assetsName: '',
          assetsTitle: '',
          setCreateStep1: this.setCreateStep1,
        },
        createStep2: {
          stockNumber: '',
          unitType: '',
          unitPrice: '',
          members: '',
          setCreateStep2: this.setCreateStep2,
        }
      }
    };

    console.log('clear all');
  }

  setStep(step) {
    this.setState({
      step: step
    });
  }

  setCreateStep1(obj) {
    this.setState({
      create: {
        setStep: this.setStep,
        createStep1: { assetsName: obj.assetsName, assetsTitle: obj.assetsTitle, setCreateStep1: this.setCreateStep1},
        createStep2: this.state.create.createStep2}
    });
  }
  setCreateStep2(obj) {
    this.setState({
      create: {
        setStep: this.setStep,
        createStep1: this.state.create.createStep1,
        createStep2: { stockNumber: obj.stockNumber, unitType: obj.unitType, unitPrice: obj.unitPrice, members: obj.members, setCreateStep2: this.setCreateStep2} }
    });
  }

  setListActive() {
    this.setState({
      isListActive: true,
      step: 1,
    });
    this.resetCreatData();
  }

  setCreateActive() {
    this.setState({
      isListActive: false,
      step: 1,
    });
  }

  // delete
  // removeAssetsItem(key) {
  //   // 1. ask database to do that options
  //   // 2. if success ,
  //   this.state.assetslist.remove
  // }

  resetCreatData() {
    this.setState({
      create: {
        setListActive: this.setListActive,
        setStep: this.setStep,
        createStep1: {
          assetsName: '',
          assetsTitle: '',
          setCreateStep1: this.setCreateStep1,
        },
        createStep2: {
          stockNumber: '',
          unitType: '',
          unitPrice: '',
          members: '',
          setCreateStep2: this.setCreateStep2,
        }
      }
    });
  }

  // <Link to={{pathname: createPath, state: createData }} ><img src={isListActive ? assetsPublish1 : assetsPublish2} />&nbsp;资产发行</Link>
  render() {
    const assetsIcon = require('./icon/assetsIcon.png');
    const assetsList2 = require('./icon/assetsList2.png');
    const assetsList1 = require('./icon/assetsList1.png');
    const assetsPublish1 = require('./icon/assetsPublish1.png');
    const assetsPublish2 = require('./icon/assetsPublish2.png');
    const assetStyle = require('./assetmanager.scss');
    const isListActive = this.state.isListActive;

    const createPath = this.state.step > 1 ? '/myroutera/create/step' + this.state.step : '/myroutera/create';
    const createData = this.state.create;
    // const listData = this.state.assetslist;

    return (
      <div className="container">
        <Helmet title="AssetsCreate step1"/>
        <div className="row">

          <div className="col-md-2">
            <header className={assetStyle.header}>
              <img className={assetStyle.iconStyle} src={assetsIcon}/>&nbsp;&nbsp;管理平台
            </header>

            <ul className="nav nav-list">
              <li className="divider"/>
              <li onClick={this.setListActive.bind(this)}>
                <Link to="/myroutera" ><img src={isListActive ? assetsList2 : assetsList1} />&nbsp;资产列表</Link>
              </li>

              <li className="divider"/>
              <li onClick={this.setCreateActive.bind(this)}>
                <Link to={{pathname: createPath, state: createData}} ><img src={isListActive ? assetsPublish1 : assetsPublish2} />&nbsp;资产发行</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-10" >
            {!isListActive &&
              <div>
                  <header className={assetStyle.header}>
                    新资产建立
                  </header>

                  <PathNavbar savedstep={this.state.step} createData={createData}/>
              </div>
            }
            {this.props.children }
          </div>
        </div>
      </div>
    );
  }
}


