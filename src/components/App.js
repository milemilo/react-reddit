import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Home = () => (
  <h1>Home Page</h1>
)

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
