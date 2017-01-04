import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {LOCAL_FILE, REMOTE_FILE, FILE_CONTENT, TEXT_UPLOAD} from '../constants';
import {Link} from 'react-router';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.handleDefaultSelector = this.handleDefaultSelector.bind(this);
  }

  handleDefaultSelector() {
    const cName = ReactDOM.findDOMNode(this.refs.default_selector).className;
    if (cName !== 'undefind') {
      this.refs.default_selector.className = '';
    }
  }

  render() {
    const styles = require('./nav.scss');
    return (
      <nav className={'navbar ' + styles.wnav} >
        <div className="container-fluid">
          <ul className={'nav ' + 'nav-pills ' + styles['wnav-child']} role="tablist">
            <li role="" ref="default_selector">
              <Link to={LOCAL_FILE} className={styles['nav-link']} activeClassName="active">本地文件</Link>
            </li>
            <li role="">
              <Link to={REMOTE_FILE} className={styles['nav-link']} activeClassName="active" >远程文件</Link>
            </li>
            <li role="">
              <Link to={FILE_CONTENT} className={styles['nav-link']} activeClassName="active" >文件存证并存储</Link>
            </li>
            <li role="">
              <Link to={TEXT_UPLOAD} className={styles['nav-link']} activeClassName="active" >文本</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
