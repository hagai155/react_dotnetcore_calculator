import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home.js";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <a
            href="https://github.com/hagai155"
            target="_blank"
            rel="noreferrer"
          >
            https://github.com/hagai155
          </a>
        </header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <div>NoMatch</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
