import React from 'react';

const styles = {
  maintitle:{
    cursor:'pointer'
  },
  subtitle:{
    fontSize:8
  }
};

class HeadeTitle extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <span className="title" style={styles.maintitle}>{this.props.maintitle}</span><br/>
        <span className="subtitle" style={styles.subtitle}>{this.props.subtitle}</span>
      </div>
    )
  }
}

export default HeadeTitle;
