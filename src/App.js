import React from "react";
import { Route, Switch, Redirect, useHistory, } from "react-router-dom";

import { Main, Login } from "./components/index";
import './app.scss';

function App() {

  const history = useHistory();
  const RedirectFn = (path) => { history.push(path) };
  
  return (
    <div className="App">

      <Switch>
        <Route path="/main" render={() => <Main />} />
        <Route path="/login" render={() =>  <Login RedirectFn={RedirectFn} />  } />
        <Route exact path='/' render={() => <Redirect from='/' to='/main'/>}/>
      </Switch>
        
    </div>
  );
}

export default App;
