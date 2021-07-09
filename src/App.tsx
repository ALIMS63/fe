import React, { useEffect, useState } from "react";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Authentication, Register } from "./Pages/Auth";
import { Main } from "./Pages/Main/Main";
import { HubProvider } from "./context/HubContext";
import { Admin } from "./Pages/Admin";
import { ThemesProvider } from "./context/ThemeContext";
import { InfoMain } from "./Pages/PrivateArea";
import { Scrollbars } from "react-custom-scrollbars";
import { Id } from "./types/Id";

function App() {
  const [ token, setToken ] = useState(localStorage.getItem("token"));
  (window as any).OneSignal = (window as any).OneSignal || [];
  const OneSignal = (window as any).OneSignal;

  useEffect(() => {
    if (token) {
      OneSignal.push(() => OneSignal.init({
        appId: "9d950b67-7b89-4b6f-8765-70f6dd64a249",
      }));
    };
  }, []);

  OneSignal.registerForPushNotifications();

  return (
    <Router>
      <HubProvider>
        <ThemesProvider>
          {/* <div style={{ height: "100vh" }}>
              <Scrollbars style={{ height: "100%", width: "100%" }}> */}
          <div className="App">
            <GlobalStyle />
            <Switch>
              <Route path="/" component={Main} OneSignal={OneSignal} exact />
              <Route path="/admin" component={Admin} />
              <Route path="/info" component={InfoMain} />
              <Route path="/login" component={Authentication} />
              <Route path="/register" component={Register} />
              <Route component={Main} />
            </Switch>
            {/* </div>
              </Scrollbars> */}
          </div>
        </ThemesProvider>
      </HubProvider>
    </Router>
  );
}

export default App;
