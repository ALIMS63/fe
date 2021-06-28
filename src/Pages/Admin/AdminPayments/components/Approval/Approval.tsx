import React, { FC, useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { CSSTransition } from 'react-transition-group';
import { Button } from '../../../../../components/Button/Button';
import { Select as SelectOne } from '../../../../../components/Select/Select';
import { Select } from '../../../../../components/Select/Select2';
import { TestInput } from '../../../../../components/UI/DayPicker';
import { Loading } from '../../../../../components/UI/Loading';
import { ProcentInput } from '../../../../../components/UI/ProcentInput';
import { AppContext } from '../../../../../context/HubContext';
import { Card } from '../../../../../globalStyles';
import { OpenDate } from '../../../../../types/dates';
import { CollectionListDeposits } from '../../../../../types/deposits';
import {
  PaymentsCollection,
  RootPayments,
} from '../../../../../types/payments';
import { DepositList } from '../../../AdminPay/DepositList';
import { Pagination } from '../../../Pagination';
import {
  FilterBlock,
  FilterHeader,
  FilterName,
  Input,
  Label,
  SelectContainer,
  SelectContainerInnerPaid,
  SelectWrap,
  ShowHide,
} from "../../../Styled.elements";
import "react-notifications-component/dist/theme.css";
import * as Styled from "./Styled.elements";
import { SliderComponent } from "../../../../../components/Slider/Slider";

type Props = {
  adjustPay: (id: string, val: number) => void;

  listDeposits: CollectionListDeposits[];
  getPaymentsOverview: () => void;
  procent: string;
  setProcent: (e: string) => void;
};

export const Approval: FC<Props> = ({
  adjustPay,
  listDeposits,
  getPaymentsOverview,
  setProcent,
  procent,
}) => {
  const [depositList, setDepositList] = useState<PaymentsCollection[]>([]);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);
  const [nameApproval, setNameApproval] = useState('');
  const [checkList, setCheckList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [checkListApproval, setCheckListApproval] = useState<any>([]);
  const [openDateApproval, setOpenDateApproval] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [openFilterOne, setOpenFilterOne] = useState(false);

  const [pageLength, setPageLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();

  const depositState = checkList.length
    ? checkList.map((i: any) => i.id)
    : [5, 6];

  const namesProgramApproval = checkListApproval.map((i: any) => i.safeId);
  const idProgramApproval = listDeposits.filter((i) =>
    namesProgramApproval.includes(i.safeId),
  );
  const searchSafeIDApproval = idProgramApproval.map((i) => i.safeId);

  const deposites = () => {
    if (hubConnection) {
      setLoading(true);
      setDepositList([]);
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          [5, 6],
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          (currentPage - 1) * pageLength,
          pageLength,
        )
        .then((res) => {
          setTotalDeposits(res.totalRecords);
          setDepositList(res.collection);
          setNum(20);
          setLoading(false);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const loadMoreItems = () => {
    setCount(false);
    if (hubConnection && depositList.length < totalDeposits) {
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          depositState,
          nameApproval ? nameApproval.toLowerCase() : null,
          searchSafeIDApproval.length ? searchSafeIDApproval : null,
          openDateApproval.from ? openDateApproval.from : null,
          openDateApproval.to ? openDateApproval.to : null,
          null,
          null,
          null,
          (currentPage - 1) * pageLength,
          pageLength,
        )
        .then((res) => {
          if (res.collection.length) {
            setDepositList([...res.collection]);
            setCount(true);
            setNum(num + 20);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  useEffect(() => {
    deposites();
  }, [hubConnection]);

  const confirmPay = (id: string) => {
    if (hubConnection) {
      hubConnection
        .invoke("ConfirmDepositPayment", id)
        .then((res) => {
          const key = depositList.findIndex((i) => i.safeId === id);

          if (key !== -1) {
            const item = depositList.filter((i) => i.safeId === id)[0];
            setDepositList([
              ...depositList.slice(0, key),
              { ...item, state: 5 },
              ...depositList.slice(key + 1),
            ]);
          }

          console.log("ConfirmDepositPayment", res);
          getPaymentsOverview();
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  const unConfirmPay = (id: string) => {
    if (hubConnection) {
      hubConnection
        .invoke("UnconfirmDepositPayment", id)
        .then((res) => {
          console.log("UnconfirmDepositPayment", res);
          const key = depositList.findIndex((i) => i.safeId === id);

          if (key !== -1) {
            const item = depositList.filter((i) => i.safeId === id)[0];
            setDepositList([
              ...depositList.slice(0, key),
              { ...item, state: 6 },
              ...depositList.slice(key + 1),
            ]);
          }
          getPaymentsOverview();
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loadMoreItems();
  }, [currentPage, hubConnection, pageLength]);

  const submitApproval = () => {
    if (hubConnection) {
      setCurrentPage(1);
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          depositState,
          nameApproval ? nameApproval.toLowerCase() : null,
          searchSafeIDApproval.length ? searchSafeIDApproval : null,
          openDateApproval.from ? openDateApproval.from : null,
          openDateApproval.to ? openDateApproval.to : null,
          null,
          null,
          null, //
          (currentPage - 1) * pageLength,
          pageLength,
        )
        .then((res) => {
          setDepositList([]);
          if (res.collection.length) {
            setDepositList(res.collection);
            setTotalDeposits(res.totalRecords);
            setNum(20);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const alert = (
    title: string,
    message: string,
    type: 'success' | 'default' | 'warning' | 'info' | 'danger',
  ) => {
    store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: 'top',
      container: 'center',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
      },
    });
  };

  const paymentsConfirm = () => {
    if (hubConnection) {
      hubConnection
        .invoke(
          'ConfirmAllDepositsPayment',
          nameApproval ? nameApproval.toLowerCase() : null,
          openDateApproval.from ? openDateApproval.from : null,
          openDateApproval.to ? openDateApproval.to : null,
          searchSafeIDApproval.length ? searchSafeIDApproval : null,
          procent ? +procent / 100 : null,
        )
        .then((res) => {
          console.log('ConfirmAllDepositsPayment', res);
          alert('Успешно', 'согласовано', 'success');
          getPaymentsOverview();
          submitApproval();
        })
        .catch((err: Error) => {
          alert('Ошибка', 'Произошла ошибка', 'danger');
        });
    }
  };

  return (
    <>
      <ReactNotification />

      <Styled.ButtonWrap>
        <Button dangerOutline mb onClick={paymentsConfirm}>
          {t('adminPay.confirmButton')}
        </Button>
        <ProcentInput
          placeholder="0"
          value={procent}
          onChange={(e) => setProcent(e.target.value)}
          label={t('adminPay.procentPay')}
        />
      </Styled.ButtonWrap>

      <FilterBlock>
        <FilterHeader>
          <FilterName>{t('adminDeposit.filter')}</FilterName>
          <ShowHide onClick={() => setOpenFilterOne(!openFilterOne)}>
            {openFilterOne ? t('hide') : t('show')}
          </ShowHide>
        </FilterHeader>
        <CSSTransition
          in={openFilterOne}
          timeout={200}
          classNames="filter"
          unmountOnExit>
          <SelectContainer>
            <SelectContainerInnerPaid>
              <SelectWrap style={{ minWidth: 263 }}>
                <Label>{t('adminPay.filter.user')}</Label>
                <Input
                  value={nameApproval}
                  onChange={(e) =>
                    setNameApproval(e.target.value.toLowerCase())
                  }
                />
              </SelectWrap>
              <SelectWrap input>
                <TestInput
                  setOpenDate={setOpenDateApproval}
                  openDate={openDateApproval}
                  label={t('adminPay.filter.date')}
                />
              </SelectWrap>
              <SelectWrap style={{ minWidth: 263 }}>
                <Label>{t('adminPay.filter.deposit')}</Label>
                <Select
                  checkList={checkListApproval}
                  setCheckList={setCheckListApproval}
                  values={listDeposits}
                />
                <pre>{JSON.stringify(setCheckListApproval)}</pre>
              </SelectWrap>
              <SelectWrap style={{ minWidth: 263 }}>
                <Label>{t('adminPay.status')}</Label>
                <SelectOne
                  checkList={checkList}
                  setCheckList={setCheckList}
                  idx={5}
                  values={[
                    t('adminPay.filter.disagree'),
                    t('adminPay.filter.agree'),
                  ]}
                />
              </SelectWrap>
            </SelectContainerInnerPaid>
            <Button danger onClick={submitApproval}>
              {t('adminUsers.apply')}
            </Button>
          </SelectContainer>
        </CSSTransition>
      </FilterBlock>

      <Card>
        <Styled.PaymentsTable>
          <Styled.TableHead>
            <Styled.TableHeadItem>№</Styled.TableHeadItem>
            <Styled.TableHeadItem>
              {t('adminPay.table.user')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem>
              {t('adminPay.table.name')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem>
              {t('adminPay.table.procent')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem>
              {t('adminPay.table.datePay')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem>
              {t('adminPay.table.profit')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem>
              {t('adminPay.table.openDate')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem>
              {t('adminPay.table.contribution')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem>
              {t('adminPay.table.payments')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem>{/* <Filter /> */}</Styled.TableHeadItem>
          </Styled.TableHead>
          {depositList.length ? (
            <Scrollbars style={{ height: '500px' }}>
              {depositList.map((item: PaymentsCollection, idx: number) => (
                <DepositList
                  idx={idx}
                  key={item.safeId}
                  data={item}
                  adjustPay={adjustPay}
                  confirmPay={confirmPay}
                  unConfirmPay={unConfirmPay}
                />
              ))}
            </Scrollbars>
          ) : loading ? (
            <Loading />
          ) : (
            <Styled.NotFound>{t('notFound')}</Styled.NotFound>
          )}
        </Styled.PaymentsTable>
      </Card>

      <Pagination
        pageLength={pageLength}
        setPageLength={setPageLength}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalLottery={totalDeposits}
      />
    </>
  );
};
