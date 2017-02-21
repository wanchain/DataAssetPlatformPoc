/**
 * Created by jishiwu on 11/22/16.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as assetsActions from 'redux/modules/assets';

@connect(
  null,
  assetsActions
)
export default class AssetsCreate3 extends Component {
  static propTypes = {
    setCreateStep: React.PropTypes.func,
    setListActive: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.setListActive(false);
    this.props.setCreateStep(3);
  }

  handleSubmit() {
    this.props.setListActive(true);
    browserHistory.push('/am');
  }

  render() {
    const rightBtnIcn = require('./icon/rightBtnIcn.png');
    const assetStyle = require('./assetmanager.scss');

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
            <button className="btn btn-primary" onClick={this.handleSubmit}>进入资产列表</button>
          </p>
         </div>
      </div>
    );
  }
}
