/**
 * Created by jishiwu on 11/30/16.
 */
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class PathNavbar extends Component {
  static propTypes = {
    savedstep: PropTypes.number.isRequired,
    createData: PropTypes.object.isRequired,
  };

  render() {
    const arrowRightIcn = require('./icon/arrowRightIcn.png');
    return (
      <ol className="breadcrumb">
        <img src={arrowRightIcn}/>&nbsp;&nbsp;
        <li>{(this.props.savedstep < 1 ) ? '新建资产' : <Link to={{pathname: '/myroutera/create', state: this.props.createData}}>新建资产</Link>}</li>
        <li>{(this.props.savedstep < 2 ) ? '填写信息' : <Link to={{pathname: '/myroutera/create/step2', state: this.props.createData}}>填写信息</Link>}</li>
        <li>{(this.props.savedstep < 3 ) ? '完成' : <Link to={{pathname: '/myroutera/create/step3', state: this.props.createData}}>完成</Link>}</li>
      </ol>
    );
  }
}
