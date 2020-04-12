import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./style.css";

import { BreakpointProvider } from "./hooks/breakpoint";

// import Page from "./PageWithReducer";
import UseReducer from "./pages/UseReducerPage";
import LeftRightSidebar from "./pages/LeftRightSidebarPage";
import DoubleSidebar from "./pages/DoubleSidebarPage";
import Breakpoint from "./pages/BreakpointPage";

const Home = ({ name }) => <div>Home {name}</div>;

const App = props => {
  const [state, setState] = useState({
    name: "React"
  });

  return (
    <BreakpointProvider>
      <Router>
        <nav>
          <Link to="/">Home</Link> |<Link to="use-reducer">Use Reducer</Link> |
          <Link to="lr-sidebar">LR Sidebar</Link> |
          <Link to="double-sidebar">Double Sidebar</Link> |
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
