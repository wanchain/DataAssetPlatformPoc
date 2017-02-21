import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import Helmet from 'react-helmet';
import PathNavbar from './PathNavbar';
import * as assetsActions from '../../redux/modules/assets';

@connect(
  state => ({
    isListActive: state.assets.isListActive,
    createStep: state.assets.createStep
  }),
  assetsActions
)
export default class AssetsManager extends Component {
  static propTypes = {
    children: PropTypes.object,
    isListActive: PropTypes.bool,
    createStep: PropTypes.number,
    setListActive: PropTypes.func,
    setCreateStep: PropTypes.func,
    resetCreate: PropTypes.func
  };
  setListActive() {
    this.props.setListActive(true);
    this.props.resetCreate();
  }

  setCreateActive() {
    this.props.setListActive(false);
    this.props.resetCreate();
  }

  // <Link to={{pathname: createPath, state: createData }} ><img src={isListActive ? assetsPublish1 : assetsPublish2} />&nbsp;资产发行</Link>
  render() {
    const assetsIcon = require('./icon/assetsIcon.png');
    const assetsList2 = require('./icon/assetsList2.png');
    const assetsList1 = require('./icon/assetsList1.png');
    const assetsPublish1 = require('./icon/assetsPublish1.png');
    const assetsPublish2 = require('./icon/assetsPublish2.png');
    const assetStyle = require('./assetmanager.scss');
    const isListActive = this.props.isListActive;

    return (
      <div className="container">
        <Helmet title="AssetsCreate step1"/>
        <div className="row">

          <div className="col-md-2" id="left">
            <header className={assetStyle.header}>
              <img className={assetStyle.iconStyle} src={assetsIcon}/>&nbsp;&nbsp;管理平台
            </header>

            <ul className="nav nav-list">
              <li className="divider"/>
              <li onClick={this.setListActive.bind(this)}>
                <Link to="/am" ><img src={isListActive ? assetsList2 : assetsList1} />&nbsp;资产列表</Link>
              </li>

              <li className="divider"/>
              <li onClick={this.setCreateActive.bind(this)}>
                <Link to="/am/create" ><img src={isListActive ? assetsPublish1 : assetsPublish2} />&nbsp;资产发行</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-10" id="right">
            {!isListActive &&
              <div>
                  <header className={assetStyle.header}>
                    新资产建立
                  </header>

                  <PathNavbar savedstep={this.props.createStep} />
              </div>
            }
            {this.props.children }
          </div>
        </div>
      </div>
    );
  }
}


