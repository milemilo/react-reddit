import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Posts from './Posts'

const NoMatch = () => (
  <h1>404 Not Found</h1>
)

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => <h1>home</h1>}/>
            <Route exact path='/posts' component={Posts}/>
            <Route component={NoMatch}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
