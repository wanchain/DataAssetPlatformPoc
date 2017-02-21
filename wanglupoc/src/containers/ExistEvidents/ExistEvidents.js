/**
 * Created by jishiwu on 12/19/16.
 */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import NewHeader from './header/new_header';
import Recorder from './recoder/record';
import NavBar from './navigationBar/navbar';
const defaultHeight = 200;

export default class ExistEvidents extends Component {
  static propTypes = {
    params: React.PropTypes.object,
    children: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.setHeight = this.setHeight.bind(this);
    this.state = {
      style: {
        height: defaultHeight
      },
    };
  }

  componentWillMount() {
    ExistEvidents.navBar = (<div></div>);
    ExistEvidents.newHeader = (<NewHeader isproof="true"/>);
    ExistEvidents.recorder = <Recorder/>;
    if (typeof(isProof) === 'undefined') {
      ExistEvidents.navBar = <NavBar/>;
      ExistEvidents.newHeader = <NewHeader isproof="false"/>;
      ExistEvidents.recorder = <Recorder/>;
    } else {
      ExistEvidents.navBar = (<div></div>);
      ExistEvidents.newHeader = <NewHeader isproof="true"/>;
      ExistEvidents.recorder = <div></div>;
    }
    // console.log('navBar=' + ExistEvidents.navBar);
  }

  componentWillReceiveProps() {
    if (typeof(isProof) === 'undefined') {
      ExistEvidents.navBar = <NavBar/>;
      ExistEvidents.newHeader = <NewHeader isproof="false"/>;
      ExistEvidents.recorder = <Recorder/>;
    } else {
      ExistEvidents.navBar = (<div></div>);
      ExistEvidents.newHeader = <NewHeader isproof="true"/>;
      ExistEvidents.recorder = <div></div>;
    }
  }

  setHeight(height) {
    this.setState({
      style: {
        height: height
      },
    });
  }

  render() {
    return (
      <div >
        {ExistEvidents.newHeader}
        {ExistEvidents.navBar}
        <div >
          {
            React.Children.map(this.props.children, function NONAME(child) {
              return React.cloneElement(child, {
                onChildChange: this.setHeight,
              });
            }.bind(this))
          }
        </div>
        {/* {recorder}*/}
      </div>
    );
  }
}
