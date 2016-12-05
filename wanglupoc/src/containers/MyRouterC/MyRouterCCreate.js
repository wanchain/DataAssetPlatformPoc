/**
 * Created by jishiwu on 12/1/16.
 */
import React from 'react';
import { Link } from 'react-router';

export default class extends React.Component {
  static propTypes = {
    children: React.PropTypes.object
  };
  render() {
    return (
      <div>
        <h2>Create</h2>
        <ul>
          <li><Link to="/myrouterc/create">step1</Link></li>
          <li><Link to="/myrouterc/create/step2">step2</Link></li>
          <li><Link to="/myrouterc/create/step3">step3</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
