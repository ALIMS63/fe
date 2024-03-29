import React, { FC, useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as Exit } from '../../assets/svg/exit.svg';
import { Button } from '../../components/Button/Button';
import { Switcher } from '../../components/Switcher';
import { Loading } from '../../components/UI/Loading';
import { Content } from '../../components/UI/Tabs';
import { UpTitle } from '../../components/UI/UpTitle';
import { AppContext } from '../../context/HubContext';
import { Card } from '../../globalStyles';
import { Balance } from '../../types/balance';
import { DepositProgramForm } from './DepositProgramForm';
import * as Styled from './Styled.elements';

export const AdminDepositsPrograms: FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [openNewProgram, setOpenNewProgram] = useState(false);

  const [chosen, setChosen] = useState<any>();
  const [totalProps, setTotalProps] = useState<number>(0);
  const [programList, setProgramList] = useState<any[]>([]);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const user = appContext.user;
  const logOut = appContext.logOut;

  const getPrograms = () => {
    if (hubConnection) {
      setProgramList([]);
      setLoading(true);

      hubConnection
        .invoke<any>('GetDepositDefinitions', 0, 40)
        .then((res) => {
          if (res.collection.length) {
            setProgramList(res.collection);
          }
          console.log('--------------------------------------->>>>>>>', res);
          setTotalProps(res.totalRecords);
          setLoading(false);
        })
        .catch((err: Error) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getPrograms();
  }, []);

  return (
    <>
      <Styled.HeadBlock>
        <UpTitle small>{t('sideNav.depositsPrograms')}</UpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>

      <Content active={true}>
        <CardTable>
          {openNewProgram ? (
            <DepositProgramForm setOpenNewProgram={setOpenNewProgram} chosen={chosen} />
          ) : (
            <PaymentsTable>
              <TableHeader>
                <TableTitle>{t('sideNav.depositsPrograms')}</TableTitle>
                <Button danger onClick={() => setOpenNewProgram(true)}>
                  {t('depositsPrograms.newProgram')}
                </Button>
              </TableHeader>

              <TableHead>
                <TableHeadItem>{t('depositsPrograms.name')}</TableHeadItem>
                <TableHeadItem>{t('depositsPrograms.currency')}</TableHeadItem>
                <TableHeadItem>{t('depositsPrograms.amount')}</TableHeadItem>
                <TableHeadItem>{t('depositsPrograms.profitability')}</TableHeadItem>
                <TableHeadItem>{t('depositsPrograms.payment')}</TableHeadItem>
                <TableHeadItem>{t('depositsPrograms.depositPeriod')}</TableHeadItem>
                <TableHeadItem>{t('depositsPrograms.programActivity')}</TableHeadItem>
              </TableHead>
              {programList.length ? (
                <Scrollbars style={{ height: '600px' }}>
                  {programList.map((program, index) => (
                    <TableList
                      key={index}
                      data={program}
                      setOpenNewProgram={setOpenNewProgram}
                      setChosen={setChosen}
                    />
                  ))}
                </Scrollbars>
              ) : loading ? (
                <Loading />
              ) : (
                <Styled.NotFound>{t('notFound')}</Styled.NotFound>
              )}
            </PaymentsTable>
          )}
        </CardTable>
      </Content>
    </>
  );
};

const TableList: FC<{
  setChosen: (type: any) => void;
  data: any;
  setOpenNewProgram?: (active: boolean) => void;
}> = ({ data, setOpenNewProgram, setChosen }: any) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const [program, setProgram] = useState(data);

  const onClose = () => {
    setOpen(false);
  };

  const modalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const [checked, setChecked] = useState(true);

  // Task PatchDeposit(ulong depositId, Dictionary<string, object?> data) - изменение депозита
  const updateProgram = async () => {
    if (hubConnection) {
      try {
        console.log('updating............');
        const response = await hubConnection.invoke('PatchDeposit', program.id, {
          isActive: false,
          name: 'eeeeeeee',
        });
        console.log('updateProgram ~ response', response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // useEffect(() => {
  //   updateProgram();
  // }, [program]);

  return (
    <TableBody
      onClick={() => {
        setChosen(program);
        setOpenNewProgram(true);
      }}
    >
      <TableBodyItem>{program.name}</TableBodyItem>
      <TableBodyItem>{Balance[program.balanceKind]}</TableBodyItem>
      <TableBodyItem>
        {program.minAmount ? program.minAmount : '0'} -{' '}
        {program.maxAmount ? program.maxAmount : program.minAmount}
      </TableBodyItem>
      <TableBodyItem>{program.ratio * 100}%</TableBodyItem>
      <TableBodyItem>{program.depositKind}</TableBodyItem>
      <TableBodyItem>
        {program.duration} {t('depositsPrograms.days')}
      </TableBodyItem>
      <TableBodyItem
        checked={program.isActive}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Switcher
          onChange={() => {
            setProgram({ ...program, isActive: !program.isActive });
            updateProgram();
          }}
          checked={program.isActive}
        />
        <span>{t(program.isActive ? 'depositsPrograms.on' : 'depositsPrograms.off')}</span>
      </TableBodyItem>
    </TableBody>
  );
};

const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: 8px;
  font-weight: normal;
  background: transparent;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  &:focus {
    outline: none;
  }
`;

const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  @media only screen and (max-device-width: 992px) {
    display: block;
    padding-top: 5px;

    & > * {
      margin-bottom: 20px;
    }
  }
`;

const CardTable = styled(Card)`
  height: auto;
`;

const PaymentsTable = styled.div`
  padding: 30px;
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 35px;
  position: relative;
  > a {
    height: 40px;
    @media (max-width: 576px) {
      width: 100%;
      max-width: 100%;
    }
  }
`;
const TableTitle = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: ${(props) => props.theme.text};
  @media (max-width: 576px) {
    display: none;
  }
`;

const TableHead = styled.ul`
  display: flex;
  position: relative;
  list-style: none;
  padding: 0 5px 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);

  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);

  @media (max-width: 992px) {
    justify-content: space-between;
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TableHeadItem = styled.li`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  max-width: 105px;
  margin-bottom: 6px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  width: 100%;

  &:nth-child(1) {
    max-width: 85px;
  }
  &:nth-child(2) {
    max-width: 90px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 155px;
    @media (max-width: 992px) {
      max-width: 110px;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(4) {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 480px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 140px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 120px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 155px;
  }
`;

const TableBody = styled(TableHead)`
  padding: 25px 5px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: rgba(66, 139, 202, 0.109);
  }
`;
const TableBodyItem = styled(TableHeadItem)<{ checked?: boolean }>`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  width: 100%;
  > span {
    color: ${(props) => (props.checked ? '#FF416E' : '')};
  }
  &:nth-child(1) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
`;
