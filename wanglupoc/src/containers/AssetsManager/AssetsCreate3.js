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
// import {listAssetsActived} from 'redux/modules/AssetsManagerRedux';

// @connect(
//   state =>({
//     assetsManager: state.assetsManager
//   }),
//   dispatch => {
//     return bindActionCreators({listAssetsActived}, dispatch);
//   }
// )
export default class AssetsCreate3 extends Component {
  static propTypes = {
    // assetsManager: PropTypes.object,
    // listAssetsActived: PropTypes.func,
    location: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  props = {
  };

  handleSubmit() {
    this.props.location.state.setListActive();
  }

  render() {
    const rightBtnIcn = require('./icon/rightBtnIcn.png');
    const assetStyle = require('./assetmanager.scss');
    // const isListActive = false;

    return (
      <div >
        <p/>

        <div>
          <hr />
          <p className={assetStyle.center}><img src={rightBtnIcn}/></p>
          <hr/>
          <p className={assetStyle.center} >
            新资产时代网提交成功，系统将按照设定的时间在区块连和交易所中发行资产。<br/>
            资产发行钱如果有任何变动，可以在资产列表中修改
          </p>
          <hr/>
          <p className={assetStyle.center}>
            <Link onMouseUp={this.handleSubmit} to={{pathname: '/myroutera'}}><button className="btn btn-primary">进入资产列表</button></Link>
          </p>
         </div>
      </div>
    );
  }
}
