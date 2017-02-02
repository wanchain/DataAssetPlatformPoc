import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { IndexLink } from 'react-router';
// import { LinkContainer } from 'react-router-bootstrap';
// import Navbar from 'react-bootstrap/lib/Navbar';
// import Nav from 'react-bootstrap/lib/Nav';
// import NavItem from 'react-bootstrap/lib/NavItem';
// import Header from 'react-bootstrap/lib/Header'
// import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
// import { InfoBar } from 'components';
import { push } from 'react-router-redux';
// import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if ((!this.props.user && nextProps.user) || (this.props.user && nextProps.user && (this.props.user.email !== nextProps.user.email))) {
      // login
      // this.props.pushState('/loginSuccess');
      this.props.pushState('/main');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  onSignup = (event) => {
    event.preventDefault();
    this.props.pushState('/signup');
  };

  onLogin = (event) => {
    event.preventDefault();
    this.props.pushState('/');
  };

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    // const {user} = this.props;
    const logopng = require('../AssetsManager/icon/logo.png');
    const aboutpng = require('../AssetsManager/icon/-.png');
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <header className={styles.header}>
          <div className="container">
            <div className="row">
              <img className={styles.logo} src={logopng}/>
              <ul className="nav nav-pills navbar-right">
                {this.props.user && <li><div className={styles.topText}>欢迎：{this.props.user.name}</div></li> }
                <li><button onClick={this.onLogin} type="button" className={styles.topbutton}>登陆</button></li>
                <li><button onClick={this.onSignup} type="button" className={styles.topbutton}>注册</button></li>
                <li><button type="button" className={styles.topbutton}><img className={styles.aboutpng} src={aboutpng}/>&nbsp;关于</button></li>
              </ul>
            </div>
          </div>
        </header>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <footer className={styles.footer} >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p>
                  ©&nbsp;2016&nbsp;&nbsp;ALL&nbsp;RIGHTS&nbsp;RESERVED.网录科技<br/>
                  EMAIL:SUPPORT@WANGLUTECH.COM
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
