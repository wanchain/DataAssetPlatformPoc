/**
 * Created by jishiwu on 12/20/16.
 */
import React, { Component } from 'react';
// import { LinkContainer } from 'react-router-bootstrap';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';

export default class TRecordsItem extends Component {
  static propTypes = {
    item: React.PropTypes.object
  };

  render() {
    return (
      <tr>
        <td>{ this.props.item.assetsName}</td>
      </tr>
    );
  }
}
