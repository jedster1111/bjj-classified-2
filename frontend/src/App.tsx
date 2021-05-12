import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { meaningOfLife } from "common";
import { Header } from "./components/Header";
import { MovesPage } from "./pages/MovesPage";
import { MovePage } from "./pages/MovePage";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
