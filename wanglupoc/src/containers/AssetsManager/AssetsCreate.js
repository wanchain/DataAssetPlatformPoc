/**
 * Created by jishiwu on 12/1/16.
 */
import React, {Component} from 'react';
// import PathNavbar from './PathNavbar';

export default class AssetsCreate extends Component {
  static propTypes = {
    children: React.PropTypes.object,
    location: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    const createData = this.props.location.state;
    console.log('AssetsCreate=' + createData);
  }

  render() {
    // const assetStyle = require('./assetmanager.scss');
    return (
      // <div className="col-md-10" >
      //   <header className={assetStyle.header}>
      //     新资产建立
      //   </header>
      //   <p/>
      //
      //   <PathNavbar savedstep={1} createData={this.props.location.state}/>

      <div>
        { this.props.children }
      </div>
    );
  }
}
