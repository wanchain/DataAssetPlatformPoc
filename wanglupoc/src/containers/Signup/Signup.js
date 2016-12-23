/**
 * Created by jishiwu on 12/21/16.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
  }),
  authActions)
export default class Signup extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    signup: React.PropTypes.func
  };

  componentWillReci

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    const pwd = this.refs.password;
    const userType = this.refs.usertype;
    this.props.signup(input.value, pwd.value, userType.value);
    input.value = '';
  };

  render() {
    // const styles = require('');
    return (
      <div className="container">
        <form className="login-form form-inline" onSubmit={this.handleSubmit}>
          <div>
            <label>用户名:</label>
            <input type="text" ref="username" placeholder="Enter your username" className="form-control"/>
          </div>
          <div>
            <label>密码:</label>
            <input type="text" ref="password" placeholder="Enter your password" className="form-control"/>
          </div>
          <div>
            <br/>
            <select ref="usertype" defaultValue="customer" style={{width: '30%'}}>
              <option value="customer">普通用户</option>
              <option value="admin">管理员用户</option>
            </select>
            <br/>
          </div>
          <br/>
          <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Signup
          </button>
        </form>
        <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
      </div>
    );
  }
}
