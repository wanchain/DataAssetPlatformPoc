/**
 * Created by jishiwu on 12/19/16.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as assetsActions from 'redux/modules/assets';

@connect(
  state => ({
    focusIndex: state.assets.oassetsFocusIndex,
  }),
  assetsActions
)
export default class OAssets extends Component {
  static propTypes = {
    focusIndex: React.PropTypes.number
  };
  render() {
    const styles = require('./OAssets.scss');
    const zhuanzhangpng = require('../img/zhuanzhang.png');
    return (
      <div>
        {/* <h4>网录币WLC</h4>*/}
        <div className="row">
          <div className={'col-md-6 ' + styles.padding0}>
            <div className={styles.title}>
              网录币WLC
            </div>
            <div className={styles.subtitle}>
              2&nbsp;000&nbsp;WLC=￥444,789
            </div>
            <div className={styles.currenttime}>
              2016-10-06&nbsp;6:00
            </div>
          </div>
          <div className="col-md-6">
            <ul className="nav navbar-nav navbar-right navbar-right-item" >
              <li className={(this.props.focusIndex === 1) ? 'active' : ''}>
                <Link to="/outtransfer" className="header-nav-link" activeClassName="active">
                  <img width={'30px'} height={'30px'} className={styles.zzpng} src={zhuanzhangpng}/><br/>
                  <p>存入</p>
                </Link>
              </li>
              <li className={(this.props.focusIndex === 2) ? 'active' : ''}>
                <Link to="/focusindex" className="header-nav-link" activeClassName="active">
                  <img width={'30px'} height={'30px'} className={styles.zzpng} src={zhuanzhangpng}/><br/>
                  <p>转账</p>
                </Link>
              </li>
              <li className={(this.props.focusIndex === 3) ? 'active' : ''}>
                <Link to="/intransfer" className="header-nav-link" activeClassName="active">
                  <img width={'30px'} height={'30px'} className={styles.zzpng} src={zhuanzhangpng}/><br/>
                  <p>内部转账</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr/>
        <h2>资产详情</h2>
      </div>
    );
  }
}
