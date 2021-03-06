import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Posts from "./Posts";
import Home from "./Home";
import PhotoViewer from "./PhotoViewer";

const NoMatch = () => <h1>404 Not Found</h1>;

class App extends Component {
  render() {
    return (
      <div data-test="app-component">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/photos" component={PhotoViewer} />
            <Route component={NoMatch} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
