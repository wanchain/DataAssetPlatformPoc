/**
 * Created by jishiwu on 12/19/16.
 */
import React, { Component } from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';

export default class OAssets extends Component {
  render() {
    const styles = require('./OAssets.scss');
    return (
      <div>
        {/* <h4>网录币WLC</h4>*/}
        <ul className={'nav nav-tabs' + styles.float} role="tablist">
          <li role="presentation"><a href="#">Home</a></li>
          <li role="presentation"><a href="#">Profile</a></li>
          <li role="presentation"><a href="#">Messages</a></li>
        </ul>
        <hr/>
        <h2>资产详情</h2>
      </div>
    );
  }
}
