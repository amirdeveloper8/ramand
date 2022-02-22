import "./App.css";
import LogIn from "./components/LogIn";
import MainPage from "./components/MainPage";

import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  const login = useSelector((state) => state.auth.authenticated);

  return (
    <div className="App">
      <Layout />
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="/">
            {login ? <MainPage /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
