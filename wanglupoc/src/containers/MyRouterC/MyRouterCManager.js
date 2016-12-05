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
        <h2>myrouterManager</h2>
        <ul>
          <li><Link to="/myrouterc">list</Link></li>
          <li><Link to="/myrouterc/create">create</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
