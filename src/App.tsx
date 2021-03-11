import React from "react";
import { Header } from "./components/Header/Header";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Info } from "./Pages/PrivateArea/Info";
import { OnePage } from "./Pages/PrivateArea/OnePage";
import { Authentication } from "./Pages/Auth";
import { Main } from "./Pages/Main/Main";
import { HubProvider } from "./context/HubContext";
import {
  AdminLogin,
  AdminMain,
  AdminPay,
  AdminDeposit,
  AdminUsers,
  AdminPortfolio,
} from "./Pages/Admin";

function App() {
  return (
    <Router>
      <HubProvider>
        <div className="App">
          <GlobalStyle />
          <Switch>
            <Route path="/" component={Main} exact />
            <Route path="/admin" component={AdminMain} exact />
            <Route path="/admin/login" component={AdminLogin} />
            <Route path="/admin/payments" component={AdminPay} />
            <Route path="/admin/deposit" component={AdminDeposit} />
            <Route path="/admin/users" component={AdminUsers} />
            <Route path="/admin/portfolio" component={AdminPortfolio} />
            <Route path="/info" component={Info} exact />
            <Route path="/info/:slug" component={OnePage} />
            <Route path="/login" component={Authentication} />
          </Switch>
        </div>
      </HubProvider>
    </Router>
  );
}

export default App;
