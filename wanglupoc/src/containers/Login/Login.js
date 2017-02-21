import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from '../../redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
    loginError: state.auth.loginError
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    loginError: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
  };

  handleSubmit = (event) => {
    const { username, password } = this.refs;
    event.preventDefault();
    this.props.login(username.value, password.value);
    username.value = '';
    password.value = '';
  };

  render() {
    const {user, logout, loginError} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>系统登陆</h1>
        {!user &&
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.errormessage}>
              {!user && loginError && <div>{loginError}</div>}
            </div>
            <div className="form-group" >
              <label>用户名:</label>
              <input type="text" ref="username" placeholder="请输入用户名" className="form-control" />
            </div>
            <div className="form-group">
              <label>密码:</label>
              <input type="text" ref="password" placeholder="请输入密码" className="form-control" />
            </div>
            <button className={'btn btn-success btn-lg ' + styles.loginBtn} onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}登陆
            </button>
          </form>
        </div>
        }
        {user &&
        <div>
          <p>当前用户： {user.name}.</p>
          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}退出</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
