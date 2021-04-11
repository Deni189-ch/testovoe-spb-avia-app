import React from "react";
import { Route, Switch, Redirect,  } from "react-router-dom";

import { Main, Login } from "./components/index";
import './app.scss';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route path="/main" render={() => <Main />} />
        <Route path="/login" render={() =>  <Login />  } />
        <Route exact path='/' render={() => <Redirect from='/' to='/main'/>}/>
      </Switch>
        
    </div>
  );
}

export default App;
