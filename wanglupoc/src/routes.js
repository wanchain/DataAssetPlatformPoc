import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    About,
    Login,
    LoginSuccess,
    AssetsManager,
    AssetsList,
    AssetsCreate,
    AssetsCreate1,
    AssetsCreate2,
    AssetsCreate3,
    MainPage,
    OAssets,
    Deposit,
    Withdraw,
    TRecords,
    TMarket,
    ExistEvidents,
    Signup,
    OAssetTransfer,
  LocalFile,
  RemoteFile,
  UploadFile,
  TextInfo,
  Proof,
    NotFound,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Login}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>
      <Route path="/signup" component={Signup}/>

      { /* Routes */ }
      <Route path="about" component={About}/>
      <Route path="login" component={Login}/>

      <Route path="/am" component={AssetsManager}>
        <IndexRoute component={AssetsList}/>
        <Route path="/am/create" component={AssetsCreate}>
          <IndexRoute component={AssetsCreate1}/>
          <Route path="/am/create/step2" component={AssetsCreate2}/>
          <Route path="/am/create/step3" component={AssetsCreate3}/>
        </Route>
      </Route>

      <Route path="/main" component={MainPage} >
        <IndexRoute component={OAssets}/>
        <Route path="/deposit" component={Deposit}/>
        <Route path="/withdraw" component={Withdraw}/>
        <Route path="/trecords" component={TRecords}/>
        <Route path="/tmarket" component={TMarket}/>
        <Route path="/LFH" component={ExistEvidents}>
          <IndexRoute component={LocalFile}/>
          <Route path="/RFH" component={RemoteFile}/>
          <Route path="/FC" component={UploadFile}/>
          <Route path="/TU" component={TextInfo}/>
          <Route path="/TU" component={TextInfo}/>
          <Route path={'/pf' + '/:proof_page'} component={Proof}/>
        </Route>
        <Route path="/OAtransfer" component={OAssetTransfer}/>
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
