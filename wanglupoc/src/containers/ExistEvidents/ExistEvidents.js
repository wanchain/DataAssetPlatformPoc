/**
 * Created by jishiwu on 12/19/16.
 */
import React, { Component } from 'react';
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
    console.log('main-layout-componentWillMount');
    ExistEvidents.navBar = (<div></div>);
    ExistEvidents.newHeader = (<NewHeader isproof="true"/>);
    ExistEvidents.recorder = <Recorder/>;
    const isProof = this.props.params.proof_page;
    console.log('isProof=' + isProof);
    console.log('typeof isProof=' + typeof isProof );
    if (typeof(isProof) === 'undefined') {
      ExistEvidents.navBar = <NavBar/>;
      ExistEvidents.newHeader = <NewHeader isproof="false"/>;
      ExistEvidents.recorder = <Recorder/>;
    } else {
      ExistEvidents.navBar = (<div></div>);
      ExistEvidents.newHeader = <NewHeader isproof="true"/>;
      ExistEvidents.recorder = <div></div>;
    }
    console.log('navBar=' + ExistEvidents.navBar);
  }

  componentWillReceiveProps(nextProps) {
    console.log('main-layout-componentWillReceiveProps');
    const isProof = nextProps.params.proof_page;
    // var isProof = this.props.params.proof_page;
    console.log('isProof=' + isProof);
    console.log('typeof isProof=' + typeof isProof );
    if (typeof(isProof) === 'undefined') {
      ExistEvidents.navBar = <NavBar/>;
      ExistEvidents.newHeader = <NewHeader isproof="false"/>;
      ExistEvidents.recorder = <Recorder/>;
    } else {
      ExistEvidents.navBar = (<div></div>);
      ExistEvidents.newHeader = <NewHeader isproof="true"/>;
      ExistEvidents.recorder = <div></div>;
    }
    console.log('navBar=' + ExistEvidents.navBar);
  }

  componentWillUpdate() {
    console.log('main-layout-componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('main-layout-componentDidUpdate');
    console.log('*********');
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
