import styled from 'styled-components';
import { ReactComponent as Close } from '../../../assets/svg/close.svg';
import { ReactComponent as WhiteClose } from '../../../assets/svg/whiteClose.svg';
import { ReactComponent as FromTo } from '../../../assets/svg/fromTo.svg';

const theme = localStorage.getItem('theme');

export const Dots = styled.div`
  flex: 1;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
  border-bottom: 1px dashed ${(props) => props.theme.lkMain.borderDots};
  position: relative;
  bottom: 4px;
  min-width: 30px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 20px;
`;

export const KeySpan = styled.div<{ sm?: boolean }>`
  position: relative;
  width: ${(props) => (props.sm ? '125px' : '')};
`;

export const ContentTitle = styled.div<{ mb10?: boolean }>`
  text-align: start;
  color: ${(props) => props.theme.lkMain.navLink};
  margin-bottom: ${(props) => (props.mb10 ? '10px' : '0px')};
`;
export const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  color: ${(props) => props.theme.lkMain.navLink};
  gap: 10px;

  & > p {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
`;
export const ModalBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: #000000;
`;
export const ModalTitle = styled.h1<{ mb20?: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  margin-bottom: ${(props) => (props.mb20 ? '20px' : '0px')};
  color: ${(props) => props.theme.lkMain.navLink};
`;
export const ModalContent = styled.p<{ gap20?: boolean }>`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.1px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.gap20 ? '20px' : '10px')};
  color: ${(props) => props.theme.text};
`;
export const CheckboxGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  & > label {
    max-width: 25px;
  }
`;

export const FromToArrow = styled(FromTo)`
  position: absolute;
  left: 49%;
  top: 28%;
`;

export const Rate = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.lkMain.navLink};
`;

export const RateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 35px;
`;

export const InnerBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CloseButton = styled(theme === 'light' ? Close : WhiteClose)`
  position: absolute;
  right: 19px;
  top: 19px;
  cursor: pointer;
`;

export const ModalCurrencyDiv = styled.div`
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  position: relative;
  display: block;

  & > input {
    max-width: 200px;
    margin: 0 auto;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.toToken.color};
    color: #000000;
    padding-right: 103px;
    text-align: right;
  }

  & > span {
    position: absolute;

    color: ${({ theme }) => theme.toToken.color};
    color: #000000;
    font-size: 14px;
    top: 13px;
    right: 70px;
  }
`;

export const BodyEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: start;
  color: #ff4a31;
`;
