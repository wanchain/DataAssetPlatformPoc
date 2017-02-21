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

  // render() {
  //   const {user} = this.props;
  //   const styles = require('./App.scss');
  //
  //   return (
  //     <div className={styles.app}>
  //       <Helmet {...config.app.head}/>
  //       <Navbar fixedTop>
  //         <Navbar.Header>
  //           <Navbar.Brand>
  //             <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
  //               <div className={styles.brand}/>
  //               <span>{config.app.title}</span>
  //             </IndexLink>
  //           </Navbar.Brand>
  //           <Navbar.Toggle/>
  //         </Navbar.Header>
  //
  //         <Navbar.Collapse eventKey={0}>
  //           <Nav navbar>
  //             {user && <LinkContainer to="/chat">
  //               <NavItem eventKey={1}>Chat</NavItem>
  //             </LinkContainer>}
  //
  //             <LinkContainer to="/widgets">
  //               <NavItem eventKey={2}>Widgets</NavItem>
  //             </LinkContainer>
  //             <LinkContainer to="/survey">
  //               <NavItem eventKey={3}>Survey</NavItem>
  //             </LinkContainer>
  //             <LinkContainer to="/pagination">
  //               <NavItem eventKey={4}>Pagination</NavItem>
  //             </LinkContainer>
  //             <LinkContainer to="/about">
  //               <NavItem eventKey={5}>About Us</NavItem>
  //             </LinkContainer>
  //
  //             {!user &&
  //             <LinkContainer to="/login">
  //               <NavItem eventKey={6}>Login</NavItem>
  //             </LinkContainer>}
  //             {user &&
  //             <LinkContainer to="/logout">
  //               <NavItem eventKey={7} className="logout-link" onClick={this.handleLogout}>
  //                 Logout
  //               </NavItem>
  //             </LinkContainer>}
  //             <LinkContainer to="/myroutera">
  //               <NavItem eventKey={399}>AssetsManager</NavItem>
  //             </LinkContainer>
  //           </Nav>
  //           {user &&
  //           <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.name}</strong>.</p>}
  //           <Nav navbar pullRight>
  //             <NavItem eventKey={1} target="_blank" title="View on Github" href="https://github.com/erikras/react-redux-universal-hot-example">
  //               <i className="fa fa-github"/>
  //             </NavItem>
  //           </Nav>
  //         </Navbar.Collapse>
  //       </Navbar>
  //
  //       <div className={styles.appContent}>
  //         {this.props.children}
  //       </div>
  //       <InfoBar/>
  //
  //       <div className="well text-center">
  //         Have questions? Ask for help <a
  //         href="https://github.com/erikras/react-redux-universal-hot-example/issues"
  //         target="_blank">on Github</a> or in the <a
  //         href="https://discord.gg/0ZcbPKXt5bZZb1Ko" target="_blank">#react-redux-universal</a> Discord channel.
  //       </div>
  //     </div>
  //   );
  // }

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
              {this.props.user && <span className={styles.topText}>地址：{this.props.user.ethAddress}</span> }
              <ul className="nav nav-pills navbar-right">
                 {this.props.user && <li><div className={styles.topText}>欢迎：{this.props.user.name}</div></li> }
                {/* {this.props.user && <li><div className={styles.topText}>地址：{this.props.user.ethAddress}</div></li> }*/}
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
