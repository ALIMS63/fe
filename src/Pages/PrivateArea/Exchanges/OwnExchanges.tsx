import { useContext, useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Heading } from '../components/Heading';
import { routers } from '../../../constantes/routers';
import { TabNavItem, TabsBlock, Text, FilterButton } from '../components/ui';
import { Spinner } from '../components/Loading/Loading';
import * as S from './S.el';
import { getOwner } from '../../../utils/getOwner';

import { OwnActiveExchangesTable } from './components/OwnActiveExchangesTable/OwnActiveExchangesTable';
import { OwnArchivedExchangesTable } from './components/OwnArchivedExchangeTable/OwnArchivedExchangeTable';
import { AppContext } from '../../../context/HubContext';
import {
  GetExchangesCollectionResult,
  ViewExchangeModel,
  ExchangeState,
} from '../../../types/exchange';
import { PaymentMethods } from './components/modals/PaymentMethods';
import { CurrencyPair } from './components/modals/CurrencyPair';
import { Balance } from '../../../types/balance';
import { FiatKind } from '../../../types/fiatKind';
import { getBalanceKindByStringName, getFiatKindByStringName, getMyRating, sortByDate } from '../utils';
import { ExchangeFiltersMobile } from './components/modals/ExchangeFiltersMobile';
import { AdvertFiltersMobile } from './components/modals/AdvertFiltersMobile';
import useWindowSize from '../../../hooks/useWindowSize';
import { Exchange } from './components/OwnActiveExchangesTable/S.el';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';

export const OwnExchanges = () => {
  const history = useHistory();
  const { hubConnection, account } = useContext(AppContext);
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived'>('active');
  const [userExchanges, setUserExchanges] = useState<ViewExchangeModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const screen = useWindowSize();

  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<number[]>([]);
  const [showPaymentMethodsModal, setShowPaymentMethodsModal] = useState<boolean>(false);

  const [showCurrencyPairModal, setShowCurrencyPairModal] = useState<boolean>(false);
  const [selectedBalanceKind, setSelectedBalanceKind] = useState<string | null>(null);
  const [selectedFiatKind, setSelectedFiatKind] = useState<string | null>(null);

  const [showSelectedStatus, setShowSelectedStatus] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<any>([]);

  const [status, setStatus] = useState<any[] | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [balanceKind, setBalanceKind] = useState<number | null>(null);
  const [fiatKind, setFiatKind] = useState<number | null>(null);
  const [allExchanges, setAllExchanges] = useState<ViewExchangeModel[]>([]);
  const [statusNew, setStatusNew] = useState<any>();
  const [filtersShow, setFiltersShow] = useState<boolean>(false);

  /*
    CALLBACKS: 
    BuyOrderVolumeChanged - значение доступной валюты ордера на покупку изменилось
    ExchangeCreated - создан новый обмен
    SellOrderVolumeChanged - значение доступной валюты ордера на продажу изменилось
    ExchangeCompleted - обмен завершен
    ExchangeCancelled - обмен отменен
    ExchangeConfirmationRequired - обмен ожидает подтверждения
    ExchangeAbused - на обмен подана жалоба
  */

  function resetFilters() {
    setSelectedBalanceKind(null);
    setSelectedFiatKind(null);
    setStatus([]);
    setPayments([]);
    setSelectedPaymentMethods([]);
    setSelectedStatus([]);
    setBalanceKind(null);
    setFiatKind(null);
  }

  function getFirstElements(collection: ViewExchangeModel[], elms: number) {
    return collection.filter((i, idx) => {
      if (idx < elms) {
        return i;
      }
    });
  };

  function filters(collect: ViewExchangeModel[]) {
    let filter = collect;
    if (payments.length) {
      filter = filter.filter((i) => {
        if (payments.includes(i.paymentMethod?.kind)) {
          return i;
        }
      });
    } 
    if (balanceKind != null || fiatKind != null) {
      let filterByKinds = filter;
      if (balanceKind != null && fiatKind == null) {
        filterByKinds = filterByKinds.filter((i) => {
          if (i.assetKind === balanceKind) {
            return i;
          }
        });
      }
      if (balanceKind === null && fiatKind != null) {
        filterByKinds = filterByKinds.filter((i) => {
          if (i.exchangeAssetKind === fiatKind) {
            return i;
          }
        });
      }
      if (balanceKind !== null && fiatKind !== null) {
        filterByKinds = filterByKinds.filter((i) => {
          if (i.exchangeAssetKind === fiatKind && i.assetKind === balanceKind) {
            return i;
          }
        });
      };
      filter = filterByKinds;
    } 
    if (status && status.length) {
      filter = filter.filter((i) => {
        for (let el = 0; el < status.length; el++) {
          if (i.state === status[el]) {
             return i;
          };
        };
      });
    };
    return filter;
  };

  async function getGetUserExchanges() {
    try {
      const res = await hubConnection!.invoke<GetExchangesCollectionResult>(
        'GetExchanges',
        [0, 1],
        activeFilter === 'active' ? [0, 1, 3] : [2, 4],
        0,
        100
      );
      console.log('GetExchanges', res.collection);
      const collection = getFirstElements(filters(res.collection), 10);
      console.log(collection);
      setUserExchanges(collection.map((i: any) => ({ ...i, new: false })));
      setAllExchanges(sortByDate(res.collection).map((i: any) => ({ ...i, new: false })));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    };
  };

  function changeNew() {
    setUserExchanges(
      (items) =>
        items &&
        items.map((i: any) => {
          return {
            ...i,
            new: false,
          };
        })
    );
  };

  function addMore() {
    if (userExchanges && userExchanges.length <= allExchanges.length) {
      changeNew();
      let items: any[] = [];
      for (let i = 0; i < 5; i++) {
        if (allExchanges[userExchanges.length + i]) {
          items = [...items, { ...allExchanges[userExchanges.length + i], new: true }];
        }
      }
      if (items.length) {
        setUserExchanges(filters([...userExchanges, ...items]));
        setStatusNew(setTimeout(() => changeNew(), 2000));
      };
    };
  };

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      setLoading(true);
      getGetUserExchanges();
    };
    return () => {
      cancel = true;
    };
  }, [hubConnection, activeFilter, balanceKind, fiatKind, status, payments]);

  function cb(res: ViewExchangeModel) {
    if (
      activeFilter === 'active' &&
      res.state !== ExchangeState.Completed &&
      res.state !== ExchangeState.Cancelled
    ) {
      const exchanges = [...userExchanges];
      userExchanges.forEach((item) => {
        if (item.safeId === res.safeId) {
          exchanges[userExchanges.indexOf(item)] = res;
        };
      });
      setUserExchanges(exchanges);
    };
  };

  function volumeChanged(id: string, volume: number) {
    if (activeFilter !== 'archived') {
      console.log('ExchangeChanged/Created/Completed', id, volume);
      const exchanges = [...userExchanges];
      userExchanges.forEach((item) => {
        if (item.safeId === id) {
          exchanges[userExchanges.indexOf(item)].orderVolume = volume;
        };
      });
      setUserExchanges(exchanges);
    };
  };

  function exchangeCreated(res: ViewExchangeModel) {
    if (userExchanges) {
      console.log('ExchangeChanged/Created/Completed', res);
      if (res.state <= 2 && activeFilter === 'active') {
        setUserExchanges([res, ...userExchanges]);
      };
      if (res.state >= 3 && activeFilter === 'archived') {
        setUserExchanges([res, ...userExchanges]);
      };
    };
  };

  function endCallback(res: ViewExchangeModel) {
    if (
      activeFilter === 'archived' &&
      (res.state == ExchangeState.Completed || res.state == ExchangeState.Cancelled)
    ) {
      setUserExchanges(() => [res, ...userExchanges]);
    } else {
      setUserExchanges([...userExchanges.filter((i: ViewExchangeModel) => i.safeId != res.safeId)]);
    };
  };

  function setPaymentMethod(safeId: string, paymentMethod: string) {
    const exchanges = [...userExchanges];
    userExchanges.forEach((item) => {
      if (item.safeId === safeId) {
        exchanges[userExchanges.indexOf(item)].paymentMethod = paymentMethod;
      };
    });
    setUserExchanges(exchanges);
  };

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on('SetPaymentMethod', setPaymentMethod);
    }
    return () => {
      cancel = true;
      hubConnection?.off('SetPaymentMethod', setPaymentMethod);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on('BuyOrderVolumeChanged', volumeChanged);
    }
    return () => {
      cancel = true;
      hubConnection?.off('BuyOrderVolumeChanged', volumeChanged);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on('SellOrderVolumeChanged', volumeChanged);
    }
    return () => {
      cancel = true;
      hubConnection?.off('SellOrderVolumeChanged', volumeChanged);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on('ExchangeCreated', exchangeCreated);
    }
    return () => {
      cancel = true;
      hubConnection?.off('ExchangeCreated', exchangeCreated);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on('ExchangeCompleted', endCallback);
    }
    return () => {
      cancel = true;
      hubConnection?.off('ExchangeCompleted', endCallback);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection) {
      hubConnection.on('ExchangeCancelled', endCallback);
    }
    return () => {
      cancel = true;
      hubConnection?.off('ExchangeCancelled', endCallback);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on('ExchangeConfirmationRequired', cb);
    }
    return () => {
      cancel = true;
      hubConnection?.off('ExchangeConfirmationRequired', cb);
    };
  }, [hubConnection, userExchanges]);

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on('ExchangeAbused', cb);
    }
    return () => {
      cancel = true;
      hubConnection?.off('ExchangeAbused', cb);
    };
  }, [hubConnection, userExchanges]);

  type ViewMethodModel = {
    methodName: string;
    kind: number;
  };

  const statuts = useMemo<ViewMethodModel[]>(
    () =>
      activeFilter === 'active'
        ? [
            { methodName: 'Новый', kind: 0 },
            { methodName: 'Ожидается подтверждение оплаты', kind: 1 },
            { methodName: 'Спорный', kind: 3 },
          ]
        : [
            { methodName: 'Завершен', kind: 2 },
            { methodName: 'Отменен', kind: 4 },
          ],
    [activeFilter]
  );

  const paymentMethodsKinds = useMemo<ViewMethodModel[]>(
    () => [
      { methodName: 'ERC 20', kind: 0 },
      { methodName: 'TRC 20', kind: 1 },
      { methodName: 'BEP 20', kind: 2 },
      { methodName: 'АО «Тинькофф Банк»', kind: 3 },
      { methodName: 'ПАО Сбербанк', kind: 4 },
      { methodName: 'АО «Альфа-Банк»', kind: 5 },
    ],
    []
  );

  function handleAcceptPaymentMethods() {
    setPayments(selectedPaymentMethods);
    setShowPaymentMethodsModal(false);
  }

  function handleAcceptPair() {
    const kind = getBalanceKindByStringName(selectedBalanceKind);
    const fiatKind = getFiatKindByStringName(selectedFiatKind);
    setBalanceKind(kind);
    setFiatKind(fiatKind);
    setShowCurrencyPairModal(false);
  }

  function handleAcceptSelectedStatus() {
    setStatus(selectedStatus);
    setShowSelectedStatus(false);
  }

  function onCloseFiltersMobile() {
    setFiltersShow(false);
  }

  function handleAcceptAllFilters() {
    handleAcceptSelectedStatus();
    handleAcceptPair();
    handleAcceptPaymentMethods();
    onCloseFiltersMobile();
  }

  return (
    <div>
      {screen <= 767 && (
        <ExchangeFiltersMobile
          open={filtersShow}
          onClose={onCloseFiltersMobile}
          setSelectedBalanceKind={setSelectedBalanceKind}
          selectedBalanceKind={selectedBalanceKind}
          setSelectedFiatKind={setSelectedFiatKind}
          selectedFiatKind={selectedFiatKind}
          setSelectedStatus={setSelectedStatus}
          selectedStatus={selectedStatus}
          selectedPaymentMethods={selectedPaymentMethods}
          setSelectedPaymentMethods={setSelectedPaymentMethods}
          handleAccept={handleAcceptAllFilters}
          resetFilters={resetFilters}
          statuts={statuts}
          methodsList={paymentMethodsKinds}
        />
      )}
      <Container>
        {screen > 767 && (
          <Heading
            onClick={() => history.push(routers.p2pchangesOrderToBuy)}
            title="P2P обмены"
            btnText="Опубликовать ордер"
          />
        )}
        <S.SubHeader>
          <TabsBlock>
            <TabNavItem to={routers.p2pchanges} exact>
              <div>Ордеры</div>
            </TabNavItem>

            <TabNavItem to={routers.p2pchangesOwn} exact>
              <div>Мои обмены</div>
            </TabNavItem>

            <TabNavItem to={routers.certificates} exact>
              <div>Сертификаты</div>
            </TabNavItem>
          </TabsBlock>
          {screen > 767 && (
            <Text size={14} lH={16} weight={500} black>
              Рейтинг аккаунта: {Number(getMyRating(account)).toFixed(1)}
            </Text>
          )}
        </S.SubHeader>
        {screen <= 767 && (
          <>
            <Heading
              onClick={() => history.push(routers.p2pchangesOrderToBuy)}
              title="P2P обмены"
              btnText="Опубликовать ордер"
              styles={{ marginBottom: '10px' }}
              userRating={`Рейтинг аккаунта: ${Number(getMyRating(account)).toFixed(1)}`}
            />
            <S.Filters style={{ marginTop: '20px', marginBottom: '20px', position: 'relative' }}>
              <FilterButton
                active={activeFilter === 'active'}
                onClick={() => setActiveFilter('active')}
                style={{ marginRight: '0px' }}
                big
                smHalfWidth
              >
                Активные
              </FilterButton>
              <FilterButton
                active={activeFilter === 'archived'}
                onClick={() => setActiveFilter('archived')}
                style={{ marginLeft: '0px', borderLeft: '0' }}
                big
                smHalfWidth
              >
                Архив
              </FilterButton>
            </S.Filters>
            <S.FiltersBox onClick={() => setFiltersShow(true)}>Фильтры (3)</S.FiltersBox>
          </>
        )}
        {screen > 767 && (
          <>
            <S.Filters style={{ marginBottom: '10px', position: 'relative' }}>
              <FilterButton
                active={activeFilter === 'active'}
                onClick={() => setActiveFilter('active')}
                style={{ marginRight: '0px' }}
              >
                Активные
              </FilterButton>
              <FilterButton
                active={activeFilter === 'archived'}
                onClick={() => setActiveFilter('archived')}
                style={{ marginLeft: '0px', borderLeft: '0' }}
              >
                Архив
              </FilterButton>
            </S.Filters>
            <S.Filters style={{ marginBottom: '10px', position: 'relative' }}>
              <S.Line style={{ display: 'none' }} />
              <FilterButton
                active
                style={{ marginLeft: '0px' }}
                onClick={() => setShowCurrencyPairModal(true)}
              >
                {balanceKind != null && fiatKind != null
                  ? `${Balance[balanceKind]} - ${FiatKind[fiatKind]}`
                  : balanceKind != null && fiatKind == null
                  ? `${Balance[balanceKind]} - Все`
                  : balanceKind == null && fiatKind != null
                  ? `Все - ${FiatKind[fiatKind]}`
                  : 'Все валюты'}
              </FilterButton>
              <S.Line />
              <FilterButton active onClick={() => setShowPaymentMethodsModal(true)}>
                {payments && payments.length ? 'Методы оплаты - ' : 'Все методы оплаты'}{' '}
                {payments && payments.length ? payments.length : ''}
              </FilterButton>
              <S.Line />
              <FilterButton active onClick={() => setShowSelectedStatus(true)}>
                {status && status.length ? 'Статусы - ' : 'Все статусы'}{' '}
                {status && status.length ? status.length : ''}
              </FilterButton>
              {payments.length > 0 ||
              (status != null && status.length > 0) ||
              balanceKind != null ||
              fiatKind != null ? (
                <>
                  <FilterButton
                    style={{ position: 'absolute', right: '0px' }}
                    onClick={resetFilters}
                  >
                    Очистить фильтр
                  </FilterButton>
                </>
              ) : null}
            </S.Filters>
          </>
        )}
      </Container>
      {activeFilter === 'active' && (
        <OwnActiveExchangesTable
          setExchanges={setUserExchanges}
          loading={loading}
          exchanges={userExchanges}
        />
      )}
      {activeFilter === 'archived' && (
        <OwnArchivedExchangesTable loading={loading} exchanges={userExchanges} />
      )}

      <S.Button onClick={addMore} newItems={!(userExchanges.length === allExchanges.length)}>
        {userExchanges && userExchanges.some((item: any) => item.new === true) ? (
          <Spinner
            style={{ width: 25, height: 25, borderTop: '2px solid #fff', margin: '0 auto' }}
          />
        ) : (
          'Показать ещё'
        )}
      </S.Button>

      <PaymentMethods
        selectedPaymentMethods={selectedPaymentMethods}
        setSelectedPaymentMethods={setSelectedPaymentMethods}
        methodsList={paymentMethodsKinds}
        onAccept={handleAcceptPaymentMethods}
        open={showPaymentMethodsModal}
        onClose={() => setShowPaymentMethodsModal(false)}
        objectsArray
        black
      />

      <CurrencyPair
        open={showCurrencyPairModal}
        onClose={() => setShowCurrencyPairModal(false)}
        selectedBalanceKind={selectedBalanceKind}
        setSelectedBalanceKind={setSelectedBalanceKind}
        selectedFiatKind={selectedFiatKind}
        setSelectedFiatKind={setSelectedFiatKind}
        onAccept={handleAcceptPair}
      />

      <PaymentMethods
        text="Выбор статусов"
        selectedPaymentMethods={selectedStatus}
        setSelectedPaymentMethods={setSelectedStatus}
        methodsList={statuts}
        onAccept={handleAcceptSelectedStatus}
        open={showSelectedStatus}
        onClose={() => setShowSelectedStatus(false)}
        objectsArray
        black
      />
    </div>
  );
};
