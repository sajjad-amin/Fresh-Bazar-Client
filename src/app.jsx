import React, {createContext, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import '../src/assets/css/style.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Header from "./components/header";
import Login from "./components/login";
import Home from "./components/home";
import NotFound from "./components/NotFound";
import Checkout from "./components/checkout";
import Signup from "./components/signup";
import PrivateRoute from "./helper/PrivateRoute";
import {getLoggedInData} from "./helper/storage";
import Admin from "./components/admin/admin";
import Orders from "./components/orders";

export const UserContext = createContext();
function App() {
    const [user, setUser] = useState(getLoggedInData())
  return (
      <UserContext.Provider value={[user, setUser]}>
          <div className="container">
              <Router>
                  <Header/>
                  <Switch>
                      <Route exact path="/">
                          <Home/>
                      </Route>
                      <Route path="/home">
                          <Home/>
                      </Route>
                      <Route path="/login">
                          <Login/>
                      </Route>
                      <Route path="/signup">
                          <Signup/>
                      </Route>
                      <PrivateRoute path="/checkout/:productId">
                          <Checkout/>
                      </PrivateRoute>
                      <PrivateRoute path="/orders">
                          <Orders/>
                      </PrivateRoute>
                      <PrivateRoute path="/admin">
                          <Admin/>
                      </PrivateRoute>
                      <Route path="*">
                          <NotFound/>
                      </Route>
                  </Switch>
              </Router>
          </div>
      </UserContext.Provider>
  );
}

export default App;
