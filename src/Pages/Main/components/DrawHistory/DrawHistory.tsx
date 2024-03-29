import moment from 'moment';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components/macro';
import { Button } from '../../../../components/Button/V2/Button';
// import { Button } from '../../../../components/Button/Button';
import { H2 } from '../../../../components/UI/MainStyled';
import { Page } from '../../../../components/UI/Page';
import { AppContext } from '../../../../context/HubContext';
import { Card } from '../../../../globalStyles';
import { Container } from '../../../../components/UI/Container';
import { Balance } from '../../../../types/balance';
import { ArrList, RootLottery } from '../../../../types/lottery';
import { Timer } from '../Lottery/Timer';

type Props = {
  onOpenModal: () => void;
  clock: number | null;
};

export const DrawHistory: FC<Props> = ({ onOpenModal, clock }: Props) => {
  const [notifyList, setNotifyList] = useState<ArrList[]>([]);
  const [num, setNum] = useState(0);
  const [show, setShow] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    let clean = false;
    const cb = (data: any) => {
      // console.log('DrawResult history', data);
      !clean && repeat();
    };
    if (hubConnection) {
      hubConnection.on('DrawResult', cb);
      hubConnection
        .invoke<RootLottery>('GetPrizesKinds', [], 0, 10)
        .then((res) => {
          const arrList = res.collection.map((item) => ({
            name: item.userName,
            kind: item.definition.kind,
            date: item.drawLog.drawDate,
            volume: item.definition.volume,
            balanceKind: item.definition.balanceKind,
          }));
          !clean && setNotifyList(arrList);
        })
        .catch((e) => console.log(e));
    }
    return () => {
      hubConnection?.off('DrawResult', cb);
      clean = true;
    };
  }, [hubConnection]);

  useEffect(() => setIsMobile(window.screen.width < 600), []);

  const repeat = () => {
    if (hubConnection) {
      hubConnection
        .invoke<RootLottery>('GetPrizesKinds', [], 0, 10)
        .then((res) => {
          setShow(true);
          const arrList = res.collection.map((item) => ({
            name: item.userName,
            kind: item.definition.kind,
            date: item.drawLog.drawDate,
            volume: item.definition.volume,
            balanceKind: item.definition.balanceKind,
          }));
          setNotifyList(arrList);
        })
        .catch((e) => console.log(e));
    }
  };

  const { t } = useTranslation();

  const typeWin = (id: number) => {
    if (id === 0) {
      return t('win.one');
    } else if (id === 1) {
      return t('win.two');
    } else if (id === 2) {
      return t('win.three');
    }
  };

  return (
    <Page id="lottery" pBottom>
      <TitleContainer>
        <H2>{'Розыгрыши'}</H2>
        <Subtitle>
          Ниже представлены победители прошлых розыгрышей, испытайте удачу, в этом списке можете
          оказаться вы !
        </Subtitle>
      </TitleContainer>

      <Container>
        <TimerHistoryContainer alfa onClick={onOpenModal}>
          <Timer modalTimer />
          <Button as="button">{'Перейти к розыгрышу'}</Button>
        </TimerHistoryContainer>
      </Container>

      <TableContainer>
        {notifyList.length && (
          <TableList dn>
            <TableItemHead>{t('lotteryTable.date')}</TableItemHead>
            <TableItemHead>{t('lotteryTable.typeWin')}</TableItemHead>
            <TableItemHead>{t('lotteryTable.sumWin')}</TableItemHead>
            <TableItemHead>{t('lotteryTable.winner')}</TableItemHead>
          </TableList>
        )}
        <TransitionGroup>
          {notifyList.length &&
            notifyList.map((item, idx) => {
              if (!isMobile) {
                return (
                  <CSSTransition key={idx} timeout={500} classNames="item">
                    <TableList card>
                      <TableItem tb>{moment(item.date).format('DD.MM.YYYY')}</TableItem>
                      <TableItem tb>{typeWin(item.kind)}</TableItem>
                      <TableItem tb>
                        {item.kind === 0
                          ? (item.volume / 100000).toLocaleString('ru-RU', {
                              maximumFractionDigits: 5,
                            })
                          : item.kind === 1
                          ? ''
                          : item.volume}
                        &nbsp;
                        {item.volume ? Balance[item.balanceKind] : '-'}
                      </TableItem>
                      <TableItem tb>
                        <Value data-title={item.name}>{item.name}</Value>
                      </TableItem>
                    </TableList>
                  </CSSTransition>
                );
              } else {
                return (
                  <CSSTransition key={idx} timeout={500} classNames="item">
                    <TableList card>
                      <TableItem>{moment(item.date).format('DD.MM.YYYY')}</TableItem>
                      <TableItem
                        style={{
                          display: 'block',
                          position: 'absolute',
                          right: '47px',
                          maxWidth: '100px',
                        }}
                      >
                        <Value data-title={item.name}>{item.name}</Value>
                      </TableItem>
                    </TableList>
                  </CSSTransition>
                );
              }
            })}
        </TransitionGroup>
      </TableContainer>
    </Page>
  );
};

const TitleContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  @media (max-width: 992px) {
    margin-bottom: 20px;
  }
`;

const Subtitle = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  max-width: 373px;
  color: ${({ theme }) => theme.drawHistory.descColor};
  opacity: ${({ theme }) => theme.depositsProgramsCards.descOpacity};

  @media (max-width: 576px) {
    font-size: 12px;
    line-height: 18px;
  }
`;

const TimerHistoryContainer = styled(Card)`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.main.blocksBackground};
  border: 0;
  box-shadow: none;
  & > button {
    width: 100%;
    max-width: 190px;
  }
  @media (max-width: 768px) {
    justify-content: center;
    padding: 20px;
  }
  @media (max-width: 576px) {
    align-items: center;
  }
`;

const TableContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  border-radius: 4px;

  ${Button} {
    margin: 30px auto;
    width: 160px;
  }

  @media only screen and (max-width: 480px) {
    padding-right: 0px;
    padding-left: 0px;
  }
`;

const TableList = styled.ul<{ card?: boolean; dn?: boolean }>`
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 20px 40px;
  border-radius: 4px 4px 0px 0px;

  ${({ dn, card, theme }) => {
    if (dn) {
      return `
        background: ${theme.operations2.background};
      `;
    }
    if (card) {
      return `
        background: ${theme.main.blocksBackground};
        &:nth-child(2n) {
          background: ${theme.drawHistory.background2ich};
          box-shadow: 0px 80px 80px -40px rgba(220, 220, 232, 0.5);
        }
      `;
    }
  }}

  @media (max-width: 992px) {
    /* padding: 10px 15px; */
  }
  @media (max-width: 768px) {
    padding: 20px;
  }
  @media (max-width: 576px) {
    /* flex-wrap: wrap; */
    /* justify-content: flex-start; */
    /* padding: 10px 15px; */
    /* display: ${(props) => (props.dn ? 'none' : 'flex')}; */
    display: flex;
    /* flex-direction: column; */
    align-items: center;
    padding-top: 19px;
    padding-bottom: 5px;
  }
  ${(props) => {
    if (props.card) {
      return `
            background: ${({ theme }: any) => theme.card.backgroundAlfa};
            border-radius: 4px;
            border: ${({ theme }: any) => theme.card.border};
          `;
    }
  }}
`;

const TableItem = styled.li<{ tb?: boolean }>`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  /* color: ${(props) => props.theme.text2}; */
  color: ${({ theme }) => theme.main.bodyColor};

  ${({ tb, theme }) => {
    if (tb) {
      return `
        opacity: ${theme.depositsProgramsCards.descOpacity};
      `;
    }
  }}

  padding-right: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 576px) {
    padding-bottom: 12px;
    text-align: left;
    font-size: 12px;
    line-height: 18px;
  }
  &:nth-child(1) {
    max-width: 150px;
    @media (max-width: 576px) {
      max-width: 100%;
    }
  }
  &:nth-child(2) {
    max-width: 200px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 200px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(4) {
    max-width: 200px;
    @media (max-width: 576px) {
      width: 100px;
      position: absolute;
      right: 47px;
    }
  }
  @media only screen and (max-width: 600px) {
    text-align: left;
  }
`;

const TableItemHead = styled(TableItem)`
  /* color: ${(props) => props.theme.text2}; */
  font-weight: 500;
`;

const Value = styled.div`
  align-items: center;
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  opacity: ${({ theme }) => theme.depositsProgramsCards.descOpacity};
  color: ${({ theme }) => theme.main.bodyColor};

  &:hover {
    cursor: pointer;
  }

  &:hover:after {
    background: rgba(0, 0, 0, 0.25);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.7);
    color: #fff;
    margin-top: -30px;
    left: 68%;
    content: attr(data-title);
    position: absolute;
    z-index: 1;
    padding-top: 1px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 5px;
    display: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
  @media (max-width: 576px) {
    flex-wrap: wrap;
    text-align: left;
    justify-content: flex-start;
    span {
      display: block;
      width: 100%;
    }
    font-size: 12px;
    line-height: 18px;
  }
`;
