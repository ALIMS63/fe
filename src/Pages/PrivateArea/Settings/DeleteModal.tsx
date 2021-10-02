import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../../assets/svg/close.svg';
import { Button } from '../../../components/Button/V2/Button';
import { Modal } from '../../../components/Modal/Modal';
import { AppContext } from '../../../context/HubContext';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setConfirm: (open: boolean) => void;
}

export const DeleteModal: FC<IProps> = ({ open, setOpen, setConfirm }: IProps) => {
  const { t } = useTranslation();
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const history = useHistory();

  return (
    <CSSTransition in={open} timeout={300} unmountOnExit>
      <Modal onClose={() => setOpen(false)} width={420}>
        <Container>
          <ModalTitle>Удаление платежного метода</ModalTitle>
          <CloseButton onClick={() => setOpen(false)} />

          <ContentWrapper>
            <InnerBlock>
              <Row>Вы действительно хотите удалить платежный метод ?:</Row>
              <Row>
                <b>АО «Тинькофф Банк», RUR</b>
              </Row>
              <Row>
                <strong>VYACHESLAV TROSCHIN</strong>
              </Row>
              <Row>
                <b>5536 9137 9922 7240</b>
              </Row>
            </InnerBlock>
            <ButtonWrapper>
              {/* <Button bigSize fullWidth primary onClick={() => history.push(routers.settings)}> */}
              <Button
                bigSize
                fullWidth
                primary
                onClick={() => {
                  setOpen(false);
                  setConfirm(true);
                }}
              >
                Удалить
              </Button>
              <Button
                bigSize
                fullWidth
                outlinePrimary
                onClick={() => {
                  setOpen(false);
                }}
              >
                Отмена
              </Button>
            </ButtonWrapper>
          </ContentWrapper>
        </Container>
      </Modal>
    </CSSTransition>
  );
};

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Row = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: #000000;
`;

const InnerBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CloseButton = styled(Close)`
  position: absolute;
  right: 19px;
  top: 19px;
`;

const ModalTitle = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 20px;

  color: #3f3e4e;
`;
