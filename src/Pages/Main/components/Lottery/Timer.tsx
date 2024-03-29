import moment from 'moment';
import 'moment-duration-format';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as Prize } from '../../../../assets/svg/prize.svg';
import { AppContext } from '../../../../context/HubContext';
import { RootClock } from '../../../../types/clock';
import * as Styled from './Lottery.elements';

type Props = {
  last?: string;
  clock?: any;
  icon?: boolean;
  closeTimer?: (e: React.MouseEvent) => void;
  timerHistory?: boolean;
  setShowModal?: (value: boolean) => void;
  modalTimer?: boolean;
  history?: boolean;
  modalPrize?: boolean;
};

export const Timer: FC<Props> = ({
  last = '2021-05-22T10:35:43.902Z',
  icon,
  closeTimer,
  timerHistory,
  history,
  setShowModal,
  modalTimer,
  modalPrize,
}: Props) => {
  const [deadline, setDeadline] = useState(-1);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();
  const [display, setDisplay] = useState<boolean>(false);
  const [state, setState] = useState<any>(null);
  const [timerProgress, setTimerProgress] = useState<string | number>(0);
  const [progressTotal, setProgressTotal] = useState<number>(100);
  const [clock, setClock] = useState<RootClock | null>(null);

  const data = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  const [stateData, setStateData] = useState(data);

  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;

  useEffect(() => {
    let cancel = false;
    const cb = (data: any[]) => {
      !cancel && repeat();
    };
    if (hubConnection) {
      !cancel && hubConnection.on('DrawResult', cb);
    }
    return () => {
      hubConnection?.off('DrawResult', cb);
      cancel = true;
    };
  }, [hubConnection]);

  function getNextDraw(res: any) {
    if (res != null) {
      setProgressTotal(res[0].totalSeconds);
      setDeadline(res[1].totalSeconds);
      setClock(res[1]);
      // openWindow();
    }
  }

  useEffect(() => {
    let cancel = false;

    const cb = (data: any) => {
      if (data != null) {
        setDeadline(data.totalSeconds);
        const seconds = Math.floor(data.totalSeconds % 60);
        const minutes = Math.floor((data.totalSeconds / 60) % 60);
        const hours = Math.floor((data.totalSeconds / (60 * 60)) % 24);
        const days = Math.floor(data.totalSeconds / (60 * 60 * 24));
        setStateData({ days, hours, minutes, seconds });
      }
    };
    if (hubConnection && !cancel) {
      hubConnection.on('DrawCountdown', cb);

      hubConnection
        .invoke('GetNextDraw')
        .then((res) => {
          getNextDraw(res);
        })
        .catch((e) => console.log(e));
    }
    return () => {
      hubConnection?.off('DrawCountdown', cb);
      cancel = true;
    };
  }, [hubConnection]);

  const repeat = () => {
    if (hubConnection) {
      hubConnection
        .invoke('GetNextDraw')
        .then((res) => {
          console.log(res);
          if (res != null) {
            setDeadline(res[1].totalSeconds);
            setProgressTotal(res[0].totalSeconds);
            setClock(res[1]);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    const getTimeUntil = (time: any) => {
      if (time < 1) {
        setStateData({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setState(null);
      } else {
        const durations = moment.duration(time, 'seconds');
        const seconds = Math.floor(deadline % 60);
        const minutes = Math.floor((deadline / 60) % 60);
        const hours = Math.floor((deadline / (60 * 60)) % 24);
        const days = Math.floor(deadline / (60 * 60 * 24));
        setStateData({ days, hours, minutes, seconds });
        setState(
          languale === 1
            ? durations.format('d [дн] h [ч] m [мин]', { trim: false })
            : durations.format('d [d] h [h] m [m]', { trim: false })
        );
        setDeadline(deadline - 1);
      }
    };
    const timer = setInterval(() => getTimeUntil(deadline), 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  const openWindow = () => {
    setDisplay(true);
    setTimeout(() => {
      setDisplay(false);
      setTimerProgress(0);
    }, 5000);
    setTimeout(() => setTimerProgress(100), 2000);
  };

  const openPopup = () => {
    let timer: any;
    let timer1: any;
    if (!display) {
      setDisplay(true);
      timer = setTimeout(() => setTimerProgress(100), 1000);
      timer1 = setTimeout(() => {
        setDisplay(false);
        setTimerProgress(0);
      }, 5000);
    }
  };

  const radius = 32 / 2;
  const circumference = 32 * Math.PI;

  const prg = () => {
    const progress1 = circumference - (deadline / progressTotal) * circumference;
    if (progress1 > 0) {
      return progress1;
    } else {
      return 0;
    }
  };

  return (
    <>
      {modalTimer ? (
        <Styled.TimerHistoryInner history={history}>
          <Styled.TimerHisroryTitle>
            {history ? t('newDraw') : 'Новый розыгрыш через:'}
          </Styled.TimerHisroryTitle>
          <Styled.TimerHistoryValue nodata={clock === null || state === '0'}>
            {modalPrize ? (
              <>
                <Styled.TimerHistoryValueDesc>
                  <TimerBlock>
                    <span>{stateData.days}</span>
                    <span>{t('d')}. </span>
                    <span>{stateData.hours}</span>
                    <span>{t('h')}. </span>
                    <span>{stateData.minutes}</span>
                    <span>{t('m')}.</span>
                  </TimerBlock>
                </Styled.TimerHistoryValueDesc>
                <Styled.TimerHistoryValueMob>
                  <div className="timer_content">
                    {stateData && (
                      <Styled.TimerModalDuration>
                        <span>{stateData.days}</span> : <span>{stateData.hours}</span> :{' '}
                        <span>{stateData.minutes}</span>
                      </Styled.TimerModalDuration>
                    )}
                    <Styled.TimerModalUnits>
                      <span>{t('time.days')}</span> <span>{t('time.hours')}</span>{' '}
                      <span>{t('time.minutes')}</span>
                    </Styled.TimerModalUnits>
                  </div>
                </Styled.TimerHistoryValueMob>
              </>
            ) : (
              <>
                <TimerBlock>
                  <span>{stateData.days}</span>
                  <span>{t('d')}. </span>
                  <span>{stateData.hours}</span>
                  <span>{t('h')}. </span>
                  <span>{stateData.minutes}</span>
                  <span>{t('m')}.</span>
                </TimerBlock>
              </>
            )}
          </Styled.TimerHistoryValue>
        </Styled.TimerHistoryInner>
      ) : (
        <Styled.TimerModalWrap>
          <Styled.TimerModalInner>
            {setShowModal ? (
              <Styled.TimerModal display={display} onClick={() => setShowModal(true)}>
                {state !== null ? (
                  <>
                    <Styled.TimerLoadingWrap>
                      <Styled.TimerLoading progress={timerProgress} />
                    </Styled.TimerLoadingWrap>
                    <Styled.TimerModalTitle>{t('time.title')}</Styled.TimerModalTitle>
                    <div className="timer_content">
                      {stateData && (
                        <Styled.TimerModalDuration>
                          <span>{stateData.days}</span>
                          <span>{stateData.hours}</span>
                          <span>{stateData.minutes}</span>
                        </Styled.TimerModalDuration>
                      )}
                      <Styled.TimerModalUnits>
                        <span>{t('time.days')}</span>
                        <span>{t('time.hours')}</span>
                        <span>{t('time.minutes')}</span>
                      </Styled.TimerModalUnits>
                    </div>
                  </>
                ) : (
                  <Styled.LoadingBeforeData>
                    <Styled.LoadingBeforeItem
                      width="90%"
                      height="19px"
                      style={{ margin: '0 auto', marginTop: '10px' }}
                    />
                    <div className="flex_loading">
                      <Styled.LoadingBeforeItem width="30px" height="19px" />
                      <Styled.LoadingBeforeItem width="30px" height="19px" />
                      <Styled.LoadingBeforeItem width="30px" height="19px" />
                    </div>
                    <div className="flex_loading">
                      <Styled.LoadingBeforeItem circle width="30px" height="10px" />
                      <Styled.LoadingBeforeItem circle width="30px" height="10px" />
                      <Styled.LoadingBeforeItem circle width="30px" height="10px" />
                    </div>
                  </Styled.LoadingBeforeData>
                )}
              </Styled.TimerModal>
            ) : null}
            <Styled.TimerCircle onClick={openPopup}>
              <Styled.Progress>
                <Styled.CountContainer>
                  <Styled.CountValue strokeColor={'#0094FF'}>
                    <Prize />
                  </Styled.CountValue>
                  <svg
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      width: '90%',
                      height: '90%',
                      margin: '0 auto',
                      transform: 'rotateY(0deg) rotateZ(270deg)',
                      overflow: 'visible',
                    }}
                  >
                    <circle
                      strokeDasharray={circumference}
                      strokeDashoffset={progressTotal > 0 ? prg() : 0}
                      r={radius}
                      cx={radius}
                      cy={radius}
                      fill="none"
                      strokeLinecap="round"
                      stroke={'#0094FF'}
                      strokeWidth={'2px'}
                    />
                  </svg>
                </Styled.CountContainer>
              </Styled.Progress>
            </Styled.TimerCircle>
          </Styled.TimerModalInner>
        </Styled.TimerModalWrap>
      )}
    </>
  );
};

const TimerBlock = styled.div`
  display: flex;
  & > span {
    color: ${({ theme }) => theme.main.bodyColor};
    &:nth-child(2n) {
      font-size: 22px;
      font-weight: 400;
      margin-right: 10px;
    }
  }
`;
