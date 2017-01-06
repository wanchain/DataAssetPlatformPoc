import React, {Component} from 'react';
// import ReactDOM from 'react-dom';

// import './header.css';
// import existence from '../img/ic_existence.png';
// import proof from '../img/ic_proof.png';
import {Link} from 'react-router';
import {LOCAL_FILE, LAYOUT_PROOF, PROOF} from '../constants';

// const existence = require('../img/ic_existence.png');
// const proof = require('../img/ic_proof.png');

class NewHeader extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }

  componentDidMount() {
    // console.log('newheader-componentDidMount');
    // const existClassName = ReactDOM.findDOMNode(this.refs.exist_ref).className;
    // const proofClassName = ReactDOM.findDOMNode(this.refs.proof_ref).className;
    //
    // console.log('newheader-existClassName=' + existClassName);
    // console.log('newheader-proofClassName=' + proofClassName);
  }

  // componentWillReceiveProps(nextProps) {
  // }

  componentWillUpdate() {
    // console.log('newheader-componentWillUpdate');
    //
    // console.log('this.props.isproof=' + this.props.isproof);
    // if (this.props.isproof === 'true') {
    //   console.log('newHeader-isProof=true');
    // } else {
    //   console.log('newHeader-isProof=false');
    // }
  }

  componentDidUpdate() {
    // console.log('newheader-componentDidUpdate');
    // const existClassName = ReactDOM.findDOMNode(this.refs.exist_ref).className;
    // const proofClassName = ReactDOM.findDOMNode(this.refs.proof_ref).className;
    //
    // console.log('newheader-existClassName=' + existClassName);
    // console.log('newheader-proofClassName=' + proofClassName);
  }

  render() {
    // console.log('render');
    const existence = require('../../img/ic_existence.png');
    const proof = require('../../img/ic_proof.png');
    const styles = require('./header.scss');
    return (
      <div>
        <nav className={styles.navbar} role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <span className={styles['navbar-brand']}>存证</span>

            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav ">
                <li>
                  <p className={styles['navbar-alert-text']}>
                      您把重要的文件、法律文书、资产证明存储于分布式的区块链上，<br/>
                      这些电子文档将无法被篡改，并伴有同样无法篡改的时间证明。
                  </p>
                </li>
              </ul>

              <ul className="nav navbar-nav navbar-right navbar-right-item" >
                <li className={(this.props.isproof === 'true') ? '' : 'active'} ref="exist_ref">
                  <Link to={LOCAL_FILE} className="header-nav-link" activeClassName="active">
                    <img src={existence} /><br/>
                    <p>存入</p>
                  </Link>
                </li>
                <li className={(this.props.isproof === 'true') ? 'active' : ''} ref="proof_ref">
                  <Link to={LAYOUT_PROOF + '/' + PROOF} className="header-nav-link" activeClassName="active">
                    <img src={proof}/><br/>
                    <p>验证</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

NewHeader.propTypes = {
  isproof: React.PropTypes.string,
};

export default NewHeader;
