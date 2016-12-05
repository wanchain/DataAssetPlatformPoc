import React, { Component, PropTypes } from 'react';

export default class AssetsNavbar extends Component {
  static propTypes = {
    isListActive: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    const assetsIcon = require('./icon/assetsIcon.png');
    const assetsList2 = require('./icon/assetsList2.png');
    const assetsList1 = require('./icon/assetsList1.png');
    const assetsPublish1 = require('./icon/assetsPublish1.png');
    const assetsPublish2 = require('./icon/assetsPublish2.png');
    const assetStyle = require('./assetmanager.scss');
    const isListActive = this.props.isListActive;
    return (
      <div className="col-md-2">
        <header className={assetStyle.header}>
          <img className={assetStyle.iconStyle} src={assetsIcon}/>&nbsp;&nbsp;管理平台
        </header>

        <ul className="nav nav-list">
          <li className="divider"/>
          <li>
            <a className="active">
              <img src={isListActive ? assetsList2 : assetsList1} />&nbsp;资产列表
            </a>
          </li>

          <li className="divider"/>
          <li >
            <a >
              <img src={isListActive ? assetsPublish1 : assetsPublish2} />&nbsp;资产发行
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

AssetsNavbar.defaultProps = {
  isListActive: true
};

