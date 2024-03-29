import moment from 'moment';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../../components/Button/V2/Button';
import { routers } from '../../../../constantes/routers';
import { AppContext } from '../../../../context/HubContext';
import { ThemeContext } from '../../../../context/ThemeContext';
import { BalanceKind } from '../../../../enums/balanceKind';
import useWindowSize from '../../../../hooks/useWindowSize';
import { ListDeposits } from '../../../../types/deposits';
import { IBalanceExchange } from '../../Converting/ConvertingModal';
import { CloseDeposit } from '../Modals/CloseDeposit';
import { CloseDepositError } from '../Modals/CloseDepositError';
import { CloseDepositSuccess } from '../Modals/CloseDepositSuccess';
import {
  ChipWrap,
  LeftSide,
  Name,
  ProgramDesc,
  ProgramDescTitle,
  RightSide,
  TextValue,
  TitleWrap,
} from '../ui';
import { Chip } from '../ui/Chip';
import * as S from './S.el';

interface IProps {
  chosenDepositView: any;
}

export const ShowDeposit: FC<IProps> = ({ chosenDepositView }: IProps) => {
  console.log('chosenDepositView', chosenDepositView);

  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const language = lang === 'ru' ? 1 : 0;
  const screen = useWindowSize();
  const history = useHistory();
  const { deposit } = chosenDepositView;
  const { hubConnection, depositsFilter } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);

  const [isOpenCloseDeposit, setIsOpenCloseDeposit] = useState<boolean>(false);
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [calculated, setCalculated] = useState<IBalanceExchange>();
  const [closeDepositSuccess, setCloseDepositSuccess] = useState<boolean>(false);
  const [closeDepositError, setCloseDepositError] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (hubConnection) {
        try {
          const response = await hubConnection.invoke(
            'CalculateBalanceExchange',
            chosenDepositView.amount.toString(),
            59
          );
          setCalculated(response);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (hubConnection && isAgree) {
        try {
          // const replace = await hubConnection.invoke();
          setCloseDepositSuccess(true);
        } catch (error) {
          console.log(error);
          setCloseDepositError(true);
        }
      }
    })();
  }, [isAgree]);

  const openSameProgram = () => {
    if (hubConnection) {
      hubConnection
        .invoke<ListDeposits>('GetDeposits', language, true, 0, 20)
        .then((res) => {
          const historySafeId = res.collection.find((dep) => dep.name === deposit.name)?.safeId;
          history.replace(`/info/deposits/new-deposit/${historySafeId}`);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  const colorSwitcher = (type: string) => {
    if (theme === 'dark') return '#33333A;';
    else if (type === 'active') return '#EFECFF';
    else if (type === 'archived') return '#E0F8FF';
    else if (type === 'hold') return '#DAFFE2';
  };

  const getDepositType = (type: string) => {
    if (type === 'active') return 'Активный депозит';
    else if (type === 'archived') return 'В архиве';
    else if (type === 'hold') return 'С отложенной выплатой';
  };

  console.log(deposit);

  return (
    <S.Container>
      <CloseDeposit
        onClose={(isAgree: boolean) => {
          setIsOpenCloseDeposit(false);
          setIsAgree(isAgree);
        }}
        open={isOpenCloseDeposit}
        deposit={deposit}
        calculated={calculated}
      />
      <CloseDepositSuccess
        onClose={() => {
          setCloseDepositSuccess(false);
          history.push(routers.deposits);
        }}
        open={closeDepositSuccess}
        deposit={deposit}
        calculated={calculated}
      />
      <CloseDepositError
        onClose={() => {
          setCloseDepositError(false);
          history.push(routers.deposits);
        }}
        open={closeDepositError}
      />
      <LeftSide bg={colorSwitcher(depositsFilter)}>
        <Name>{deposit?.name}</Name>
        <ChipWrap small>
          <Chip>{getDepositType(depositsFilter)}</Chip>
        </ChipWrap>
        <TitleWrap small>
          <ProgramDescTitle>Сумма депозита:</ProgramDescTitle>
        </TitleWrap>
        <TitleWrap big>
          <Name>
            {(chosenDepositView?.amount / 100000).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}{' '}
            {BalanceKind[deposit?.asset]}
          </Name>
        </TitleWrap>
        <ProgramDescTitle>Описание и условия депозита:</ProgramDescTitle>
        <ChipWrap>
          <ProgramDesc>{deposit?.description}</ProgramDesc>
        </ChipWrap>
        {screen > 768 &&
          (depositsFilter === 'archived' ? (
            <Button bigSize primary onClick={openSameProgram}>
              Открыть такой же депозит
            </Button>
          ) : (
            <Button fullWidth bigSize primary onClick={() => setIsOpenCloseDeposit(true)}>
              Закрыть депозит
            </Button>
          ))}
      </LeftSide>
      <RightSide>
        <S.Blocks>
          <S.Block>
            <S.BlockItem>
              <TitleWrap small minBtm>
                <ProgramDescTitle>Дата открытия депозита:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>{moment(chosenDepositView?.creationDate).format('DD.MM.YYYY')}</TextValue>
            </S.BlockItem>
            <S.BlockItem>
              <TitleWrap small minBtm>
                <ProgramDescTitle>Дата закрытия депозита:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>
                {moment(chosenDepositView?.endDate).format('DD.MM.YYYY')}
                {depositsFilter === 'archived' && ' (закрыт)'}
              </TextValue>
            </S.BlockItem>
          </S.Block>
          <S.Block>
            <S.BlockItem>
              <TitleWrap small minBtm>
                <ProgramDescTitle>Всего выплачено:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>
                {chosenDepositView?.payedAmountView} {BalanceKind[deposit?.asset]}
              </TextValue>
            </S.BlockItem>
          </S.Block>

          <S.Block>
            <S.BlockItem>
              <TitleWrap small minBtm>
                <ProgramDescTitle>Дата ближайшей выплаты:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>
                {depositsFilter === 'archived'
                  ? '-'
                  : depositsFilter === 'hold'
                  ? 'На согласовании'
                  : `${moment(chosenDepositView?.paymentDate).format('DD.MM.YYYY')} (через ${moment
                      .duration(
                        moment(
                          moment(chosenDepositView?.paymentDate).format('YYYY-MM-DD'),
                          'YYYY-MM-DD'
                        ).diff(moment().startOf('day'))
                      )
                      .asDays()} дней)`}
              </TextValue>
            </S.BlockItem>
            <S.BlockItem>
              <TitleWrap small minBtm>
                <ProgramDescTitle>Сумма ближайшей выплаты:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>
                {depositsFilter === 'archived'
                  ? '-'
                  : depositsFilter === 'hold'
                  ? 'На согласовании'
                  : moment
                      .duration(
                        moment(
                          moment(chosenDepositView?.paymentDate).format('YYYY-MM-DD'),
                          'YYYY-MM-DD'
                        ).diff(moment().startOf('day'))
                      )
                      .asDays() === 0
                  ? `${chosenDepositView?.payAmountView} ${BalanceKind[deposit?.asset]}`
                  : '-'}
              </TextValue>
            </S.BlockItem>
          </S.Block>
        </S.Blocks>
        <S.Blocks pTop>
          {screen <= 768 &&
            (depositsFilter === 'archived' ? (
              <Button bigSize primary onClick={openSameProgram}>
                Открыть такой же депозит
              </Button>
            ) : (
              <Button fullWidth bigSize primary onClick={() => setIsOpenCloseDeposit(true)}>
                Закрыть депозит
              </Button>
            ))}
        </S.Blocks>
      </RightSide>
    </S.Container>
  );
};
