/**
 * Created by jishiwu on 12/1/16.
 */
import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired,
  },
  getDefaultProps() {
    return {
      children: {}
    };
  },
  render() {
    return (
      <div>
        <h2>Create</h2>
        <ul>
          <li><Link to="/myrouter/create">step1</Link></li>
          <li><Link to="/myrouter/create/step2">step2</Link></li>
          <li><Link to="/myrouter/create/step3">step3</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
});
