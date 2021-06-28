import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { meaningOfLife } from "common";
import { Header } from "./components/Header";
import { MovesPage } from "./pages/MovesPage/MovesPage";
import { MovePage } from "./pages/MovePage/MovePage";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div>Meaning of Life: {meaningOfLife()}</div>
        <div>
          <Switch>
            <Route path="/moves" exact>
              <MovesPage />
            </Route>
            <Route path="/moves/:id" exact>
              <MovePage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
