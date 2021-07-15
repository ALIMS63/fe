import React, { useEffect, useState, useContext, useCallback } from "react";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Authentication, Register } from "./Pages/Auth";
import { Main } from "./Pages/Main/Main";
import { Admin } from "./Pages/Admin";
import { ThemesProvider } from "./context/ThemeContext";
import { InfoMain } from "./Pages/PrivateArea";
import { Scrollbars } from "react-custom-scrollbars";
import { Id } from "./types/Id";
import { AppContext } from './context/HubContext';
import useLocalStorage  from "./hooks/useLocalStorage";
import { APP_ID, APP_SAFARI_ID } from "./constantes/onesignal";

function App() {
  const [ token, setToken ] = useLocalStorage("token");
  (window as any).OneSignal = (window as any).OneSignal || [];
  const OneSignal = (window as any).OneSignal;

  console.log("onesignal ids", APP_ID, APP_SAFARI_ID);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  const subscribe = useCallback((id: string) => {
    console.log("before hubconnection check / subscribe", hubConnection)
     if (hubConnection) {
       console.log("subscribe request, hubConnection = true")
        hubConnection.invoke(
          "RegisterDevice",
           id
         ).then(() => {})
          .catch((err) => console.log(err));
      };
   }, [hubConnection]);

   const unSubscribe = useCallback((id: string) => {
     console.log("before hubConnection check / unSubscribe", hubConnection)
      if (hubConnection) {
        console.log("subscribe request, hubConnection = true")
        hubConnection.invoke(
            "UnregisterDevice",
            id
        ).then(() => {})
         .catch((err) => console.log(err));
      };
    }, [hubConnection]);

  useEffect(() => {
    console.log(hubConnection)
    console.log(token);
    if (token && hubConnection) {
      console.log(token);
      try {
        OneSignal.push(() => {
          OneSignal.SERVICE_WORKER_PARAM = { scope: "/push/onesignal/" };
          OneSignal.SERVICE_WORKER_PATH = "push/onesignal/OneSignalSDKWorker.js";
          OneSignal.SERVICE_WORKER_UPDATER_PATH = "push/onesignal/OneSignalSDKUpdaterWorker.js";
          OneSignal.init({
            appId: APP_ID,
            safari_web_id: APP_SAFARI_ID,
            notifyButton: {
              enable: true,
            },
          });
          try {
            OneSignal.on('subscriptionChange', (isSubscribed: boolean) => {
              console.log('onesignal events start')
              if (isSubscribed) {
                console.log("subscribe event")
                OneSignal.getUserId((id: string) => subscribe(id));
              } else {
                console.log("unSubscribe event")
                OneSignal.getUserId((id: string) => unSubscribe(id));
              };
            });
          } catch(e) {
            console.error("onesignal event loop error", e);
          };
        });
        console.log("after onesignal settings")
      } catch(e) {
        console.error("initial onesignal error", e);
      };
      console.log("onesignal initialized");
    };
  }, [token, hubConnection]);

  return (
    <Router>
      <ThemesProvider>
          {/* <div style={{ height: "100vh" }}>
              <Scrollbars style={{ height: "100%", width: "100%" }}> */}
          <div className="App">
            <GlobalStyle />
            <Switch>
              <Route path="/" component={Main} push={OneSignal.push} on={OneSignal.on} getUserId={OneSignal.getUserId} exact />
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
    </Router>
  );
}

export default App;
