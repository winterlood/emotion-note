import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/new" component={New} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/diary/:id" component={Diary} />
        </Switch>
      </Router>
    </>
  );
};
export default AppRouter;
