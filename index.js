import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Page from "./PageWithReducer";
import "./style.css";

import { BreakpointProvider } from "./breakpoint";

import UseReducer from "./UseReducerPage";
import LeftRightSidebar from "./LeftRightSidebarPage";
import DoubleSidebar from "./DoubleSidebarPage";
import Breakpoint from './BreakpointPage';


const Home = ({ name }) => <div>Home {name}</div>;


const App = props => {
  const [state, setState] = useState({
    name: "React"
  });

  return (
    <BreakpointProvider >
      <Router>
        <nav>
          <Link to="/">Home</Link> |<Link to="use-reducer">Use Reducer</Link> |
          <Link to="lr-sidebar">LR Sidebar</Link> |
          <Link to="double-sidebar">Double Sidebar Layour</Link> |
          <Link to="breakpoint">Breakpoint</Link> |
        </nav>
        <Switch>
          <Route
            path="/"
            exact
            render={routeProps => <Home {...routeProps} {...state} />}
          />
          <Route path="/use-reducer" component={UseReducer} {...state} />
          <Route path="/lr-sidebar" component={LeftRightSidebar} {...state} />
          <Route path="/double-sidebar" component={DoubleSidebar} {...state} />
          <Route path="/breakpoint" component={Breakpoint} {...state} />
        </Switch>
      </Router>
    </BreakpointProvider>
  );
};

render(<App />, document.getElementById("root"));
