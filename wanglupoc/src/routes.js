import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Chat,
    Home,
    Widgets,
    About,
    Login,
    LoginSuccess,
    Survey,
    AssetsManager,
    AssetsList,
    AssetsCreate,
    AssetsCreate1,
    AssetsCreate2,
    AssetsCreate3,
    NotFound,
    Pagination,
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
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>

      { /* Routes */ }
      <Route path="about" component={About}/>
      <Route path="login" component={Login}/>
      <Route path="pagination" component={Pagination}/>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>

      <Route component={AssetsManager}>
        <Route path="/myroutera" component={AssetsList}/>
        <Route component={AssetsCreate}>
          <Route path="/myroutera/create" component={AssetsCreate1}/>
          <Route path="/myroutera/create/step2" component={AssetsCreate2}/>
          <Route path="/myroutera/create/step3" component={AssetsCreate3}/>
        </Route>
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
