import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Posts from './Posts'
import Home from './Home'

const NoMatch = () => (
  <h1>404 Not Found</h1>
)

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/posts' component={Posts}/>
            <Route component={NoMatch}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
