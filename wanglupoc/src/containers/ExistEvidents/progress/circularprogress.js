import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class CirProgress extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <CircularProgress size={20}/>
      </MuiThemeProvider>
    );
  }
}

export default CirProgress;
