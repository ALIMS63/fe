﻿import React, { FC, useContext } from 'react';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
// import { Button } from '../../components/Button/Button';
import { Header } from '../../components/Header/Header';
import { Deposits } from './Deposits/Deposits';
import { OnePage } from './OnePage';
import { Settings } from './Settings';
import { NewPayMethod } from './Settings/NewPayMethod';
import { ViewPayMethod } from './Settings/ViewPayMethod';
import * as Styled from './Styles.elements';
import { Footer } from '../../components/Footer/Footer';
import { Advert } from './Exchanges/Advert';
import { HistoryOperations } from './HistoryOperations/HistoryOperations';
import { OwnExchanges } from './Exchanges/OwnExchanges';
import { SingleExchangeDetails } from './Exchanges/SingleExchangeDetails';
import { routers } from '../../constantes/routers';
import { HeaderBar } from './HeaderBar';
import { DepositProgram } from './Deposits/DepositProgram';
import { DepositOpen } from './Deposits/DepositOpen';
import { OrderToSell } from './Exchanges/OrderToSell';
import { Certificates } from './Certificates/Certificates';
import { AppContext } from '../../context/HubContext';
import { OrderToBuy } from './Exchanges/OrderToBuy';
import { DepositView } from './Deposits/DepositView';
import { Notifications } from './Notifications/Notifications';
import { SingleOrderDetailsOwn } from './Exchanges/SingleOrderDetailsOwn';
import { PrivateAreaProvider } from '../../context/PrivateAreaContext';
import { SingleOrderDetails } from './Exchanges/SingleOrderDetails';
import { SingleExchangeChat } from './Exchanges/SingleExchangeChat';

export const InfoMain: FC = () => {
  const appContext = useContext(AppContext);
  const { user } = appContext;

  if (user === null) {
    return null;
  }

  if (user === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Styled.Page>
        <HeaderBar />
        <PrivateAreaProvider>
          <Switch>
            <Route path={routers.deposits} component={Deposits} exact />
            <Route path={routers.depositsProgram} component={DepositProgram} exact />
            <Route path={routers.depositsOpen} component={DepositOpen} exact />
            <Route path={routers.depositsView} component={DepositView} exact />
            <Route path="/info/deposits/:slug" component={OnePage} exact />
            <Route path={routers.p2pchanges} component={Advert} exact />
            <Route path={routers.p2pchangesOwn} component={OwnExchanges} exact />
            <Route path={routers.p2pchangesOrderToBuy} component={OrderToBuy} exact />
            <Route path={routers.p2pchangesOrderToSell} component={OrderToSell} exact />
            <Route path={routers.certificates} component={Certificates} exact />
            <Route
              path={routers.p2pchangesSingleExchangeDetails}
              component={SingleExchangeDetails}
              exact
            />
            <Route path={routers.settings} component={Settings} exact />
            <Route path={routers.settingsNewPayMethod} component={NewPayMethod} exact />
            <Route path={routers.settingsViewPayMethod} component={ViewPayMethod} exact />
            <Route path={routers.operations} component={HistoryOperations} exact />
            <Route path={routers.notifications} component={Notifications} exact />
            <Route
              path={routers.p2pchangesSingleOrderDetailsOwn}
              component={SingleOrderDetailsOwn}
              exact
            />
            <Route
              path={routers.p2pchangesSingleOrderDetails + '/:orderSafeId'}
              component={SingleOrderDetails}
              exact
            />
            <Route
              path={routers.settingsViewPayMethod + '/:slug'}
              component={ViewPayMethod}
              exact
            />
            <Route
              path={routers.p2pchangesSingleExchangeChat + '/:slug'}
              component={SingleExchangeChat}
              exact
            />
          </Switch>
        </PrivateAreaProvider>
        <Footer />
      </Styled.Page>
    </>
  );
};
