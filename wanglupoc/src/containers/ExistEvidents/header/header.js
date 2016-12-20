
import React from 'react';
import AppBar from 'material-ui/AppBar';
import HeaderTitle from './header_title';
import path from 'path';
import Avatar from 'material-ui/Avatar';
import logo from '../../img/logo_white_48x48.png';
import FlatButton from 'material-ui/FlatButton'

const styles = {
  appBar:{
    background:'#FF0000'
  },
  leftStyle:{
    width: 32,
    height: 32,
  },
  title:{
    fontSize:18,
  },
  flat:{
    color:'#FFFFFF',
    fontSize:18,

  },
  flatDiv:{
    marginTop:4
  }
};

class Header extends React.Component{
  constructor(props){
    super(props);
    var currPath = path.resolve(__dirname);
    console.log("currPath="+currPath);
  }

  render(){

    const rightButton = (
      <div style={styles.flatDiv}>
        <FlatButton labelStyle={styles.flat} label="存证数据" secondary={true}/>
        <FlatButton labelStyle={styles.flat} label="查找存根" secondary={true}/>
      </div>
    );

    return(
      <AppBar
        className="headerAppBar"
        title={<HeaderTitle maintitle='网录科技' />}
        //titleStyle={styles.title}
        iconElementLeft={<Avatar src={logo} backgroundColor="#00000000"/>}
        iconClassNameLeft="company_logo"
        iconElementRight={rightButton}
        //iconStyleLeft={styles.leftStyle}
        //style={styles.appBar}
      />
    );
  }
}

export default Header;