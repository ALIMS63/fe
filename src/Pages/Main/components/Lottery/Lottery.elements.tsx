import styled, { css, keyframes } from 'styled-components/macro';
import { ReactComponent as Close } from '../../../../assets/svg/close.svg';
import { Button } from '../../../../components/Button/Button';
import { Card } from '../../../../globalStyles';

export const CloseIcon = styled(Close)`
  position: absolute;
  cursor: pointer;
  right: 18px;
  top: 18px;
  color: ${(props) => props.theme.text3};
  path {
    fill: ${(props) => props.theme.text3};
    &:hover {
      fill: ${(props) => props.theme.text3Hover};
    }
  }
`;

export const TimerContainer = styled.div`
  position: relative;
  margin: 40px auto;
  background: ${(props) => props.theme.card.backgroundAlfa};
  border: 1px solid rgba(86, 101, 127, 0.05);
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 24px 36px;
  text-align: center;
  width: 340px;
  @media (max-width: 768px) {
    margin: 0px 20px 30px;
    width: auto;
    padding: 24px 22px;
  }
`;

export const TimerTitle = styled.div`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  margin-bottom: 10px;
  @media (max-width: 576px) {
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
`;

const Move = keyframes`
0% {
  opacity: 1;
  }
50% {
  opacity: .6;
  }
100% {
  opacity: 1;
  }
`;

const MyCss = css`
  position: relative;
  border-radius: 5px;
  opacity: 1;
  visibility: hidden;
  overflow: hidden;
  content: '&nbsp;';
  color: transparent;
  &:after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    visibility: visible;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.075);
    animation: ${Move} 1.5s infinite;
  }
`;

export const TimerValue = styled.div<{ nodata?: boolean }>`
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  letter-spacing: 0.1px;
  color: #ff416e;
  ${(props) => {
    if (props.nodata) {
      return MyCss;
    }
  }}
  @media (max-width: 576px) {
    font-weight: normal;
    font-size: 25px;
    line-height: 29px;
  }
`;

export const WheelWrap = styled.div`
  padding-top: 40px;
`;

export const Present = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1px;
  border: 1px solid rgba(86, 101, 127, 0.05);
  box-sizing: border-box;
  border-radius: 20px;
  padding: 12px;
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  color: #ff416e;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  transition: 0.3s ease-in-out;
  text-align: center;
  svg {
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 21px;
    box-shadow: none;
    border: none;
    padding: 16px 45px;
  }
`;

export const PresentInner = styled.div<{ show?: boolean }>`
  opacity: ${(props) => (props.show ? '1' : '0')};
`;

export const WheelContainer = styled.div`
  width: 360px;
  height: 360px;
  position: relative;
  img {
    max-width: 100%;
  }
  @media (max-width: 992px) {
    margin-bottom: 40px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 576px) {
    width: 250px;
    height: 250px;
  }
`;

export const Wheel = styled.div`
  width: 100%;
  transition: all 10s cubic-bezier(0.4, 0.09, 0, 1);
  img {
    transition: none;
    transform: rotate(17deg);
  }
`;

export const Arrow = styled.div`
  position: absolute;
  top: -33px;
  left: 50%;
  margin-left: -15px;
  width: 33px;
  height: 93px;
`;

export const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 170px;
  height: 170px;
  margin-top: -85px;
  margin-left: -85px;
  @media (max-width: 576px) {
    width: 120px;
    height: 120px;
    margin-top: -60px;
    margin-left: -60px;
  }
`;

export const Container = styled.div<{ before?: boolean; lotteryModal?: boolean; }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  /* background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(113.23deg, #ffffff 25.61%, #f3f4f5 60.51%); */
  max-width: 1060px;
  height: 500px;
  @media (max-width: 1070px) {
    height: auto;
    min-height: 330px;
  }
  @media (max-width: 950px) {
    margin: 0px auto 50px;
  }

  ${({ before }) => {
    if (before) {
      return `
        margin: 0 auto;
        width: 100%;
        align-items: normal;
        justify-content: normal;

        @media only screen and (max-device-width: 620px) {
          margin: 0px auto 14px;
        }

        & > div {
          width: 100%;
          display: block;
          padding-top: 12px;
          padding-bottom: 13px;
        }
      `;
    };
  }}

  ${({ lotteryModal }) => {
    if (lotteryModal) {
      return `
        flex-wrap: nowrap;
      `;
    }
  }}
`;

export const ContainerItem = styled.div`
  width: 460px;
  margin: 0 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .modals-enter {
    opacity: 0;
    /* transform: scale(0.9); */
  }
  .modals-enter-active {
    opacity: 1;
    /* transform: translateX(0); */
    transition: all 300ms linear;
  }
  .modals-exit {
    opacity: 1;
  }
  .modals-exit-active {
    opacity: 0;
    /* transform: scale(0.9); */
    transition: all 300ms linear;
  }
  .alert-enter {
    opacity: 0;
  }
  .alert-enter-active {
    opacity: 1;
    transition: opacity 5000ms;
  }
  .alert-exit {
    opacity: 1;
  }
  .alert-exit-active {
    opacity: 0;
    transition: opacity 5000ms;
  }
  @media (max-width: 576px) {
    max-width: 280px;
    margin: 0 auto;
    ${TimerContainer} {
      width: 250px;
    }
  }
`;

export const Inside = styled.div<{ red?: boolean }>`
  background: ${(props) => props.theme.card.background};
  color: ${(props) => (props.red ? '#FF416E' : '#9D9D9D')};
  font-size: 21px;
  line-height: 25px;
`;

export const SlotCenter = styled.div`
  width: 100%;
  height: 28px;
  border-top: 0.5px solid #a4a6a6;
  border-bottom: 0.5px solid #a4a6a6;
  position: absolute;
  top: 42%;
  z-index: 999;
`;

export const Box = styled.div<{ sh?: boolean }>`
  background: ${(props) => props.theme.card.background};
  border: 1px solid rgba(86, 101, 127, 0.05);
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  height: 100%;
  max-width: 460px;
  width: 100%;
  transition: 3s ease-in;
  @media (max-width: 1070px) {
    margin-top: 60px;
  }
`;

export const SlotTitle = styled.div`
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  margin-bottom: 60px;
  @media (max-width: 950px) {
    margin-bottom: 20px;
  }
`;

export const Wrapper = styled.div`
  overflow: hidden;
  width: 320px;
  height: 180px;
  margin-bottom: 40px;
  position: relative;
  @media (max-width: 576px) {
    width: 260px;
  }
`;

export const Drum = styled.div`
  width: 320px;
  height: 180px;
  position: relative;
  font-family: sans-serif;
  position: relative;
  perspective: 0;
  transform-origin: 50% 50%;
  transition: 5s;
  transform-style: preserve-3d;
  @media (max-width: 576px) {
    width: 260px;
  }
`;

export const WinContainer = styled(Card)`
  max-width: 540px;
  padding: 40px;
  @media (max-width: 992px) {
    margin: 0 auto;
  }
  @media (max-width: 576px) {
    padding: 20px 10px;
    border: none;
    box-shadow: none;
  }
`;

export const WinTitle = styled.div<{ sub?: boolean }>`
  font-weight: ${(props) => (props.sub ? 400 : 500)};
  font-size: 36px;
  line-height: 42px;
  margin-bottom: ${(props) => (props.sub ? '17px' : '8px')};
  text-align: center;
  letter-spacing: 0.1px;
  width: 100%;
  word-wrap: none;
  color: ${(props) => (props.sub ? props.theme.text2 : '#FF416E')};
  @media (max-width: 576px) {
    font-size: ${(props) => (props.sub ? '24px' : '16px')};
    line-height: ${(props) => (props.sub ? '32px' : '19px')};
    margin-bottom: 18px;
    width: ${({ sub }) => sub ? "71%" : ""};
    margin: ${({ sub }) => sub ? "0 auto" : ""};
    margin-bottom: ${({ sub }) => sub ? "18px" : ""};
  }
`;

export const WinDesc = styled.div`
  color: ${(props) => props.theme.thHead};
  letter-spacing: 0.1px;
  font-weight: normal;
  text-align: center;
  font-size: 16px;
  line-height: 21px;
`;

export const WinBrand = styled.p`
  text-transform: uppercase;
  color: #ff416e;
  font-size: 18px;
  line-height: 21px;
`;

export const ModalCongratsWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  padding: 40px 50px;
  @media (max-width: 992px) {
    flex-direction: column;
    padding: 20px 10px;
    justify-content: center;
  }
`;

export const BrandImg = styled.div`
  width: 98px;
  margin: 0 80px 0 20px;
  @media (max-width: 992px) {
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    margin-right: auto;
    margin-left: auto;
    margin-top: 10px;
    margin-bottom: 2px;
    width: 53px;
    height: 30px;
  }
`;

export const ModalButton = styled(Button)`
  margin: 37px auto 0;
`;

export const TimerHistoryInner = styled.div<{ mt?: boolean; history?: boolean; }>`
  margin-right: 80px;
  width: 80%;
  max-width: 341px;
  height: 123px;
  display: flex;
  justify-content: center;
  padding-left: 40px;
  flex-direction: column;
  border-radius: 20px;
  -webkit-box-shadow: 1px 0px 12px 1px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 1px 0px 12px 1px rgba(34, 60, 80, 0.2);
  box-shadow: 1px 0px 12px 1px rgba(34, 60, 80, 0.2);
 
  @media (max-width: 768px) {
    margin-right: 0px;
  }

  ${({ mt, history }) => {
    if (mt) {
      return `
        margin: 0;
        margin-top: 35px;
        margin-left: auto;
      `;
    };

    if (history) {
      return `
        box-shadow: none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        height: 83px;
      `;
    };
  }}
`;

export const TimerHistoryValue = styled.div<{ nodata?: boolean }>`
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  letter-spacing: 0.1px;
  color: #ff416e;
  ${(props) => {
    if (props.nodata) {
      return MyCss;
    }
  }}
  @media (max-width: 576px) {
    font-size: 25px;
    line-height: 29px;
  }
`;

export const TimerHisroryTitle = styled.div`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  margin-bottom: 10px;
  @media (max-width: 576px) {
    font-size: 14px;
    line-height: 17px;
  }
`;

export const BrandImgAbs = styled(BrandImg)`
  position: absolute;
  top: 40px;
  left: 40px;
  @media (max-width: 768px) {
    top: 13px;
    left: 0;
    text-align: center;
    right: 0;
    width: 100%;
  }
`;

export const TimerIcon = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: ${({ theme }) => theme.timerIcon.border};
    background: ${({ theme }) => theme.timerIcon.background};
    right: 234px;
    position: absolute;
    margin-top: 47px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-directrion: column;

    .timericon_cirlce {
      position: absolute;
    }
`;

export const TimerCircle = styled.div`
  position: fixed;
  right: 143px;
  top: 668px;
  width: 36px; 
  height: 36px;
  display: flex;
  flex-direction: column;
  z-index: 999;
  cursor: pointer;
  background: ${({ theme }) => theme.timer.bg};
  border-radius: 50%;
  padding-top: 2px;
  padding-left: 2px;
  -webkit-box-shadow: 0px 3px 33px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 3px 33px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 3px 33px 0px rgba(34, 60, 80, 0.2);

  & > div {
    position: relative; 
    width: 32px;
    height: 32px;
    border-radius: 50%; 
    background: ${({ theme }) => theme.timer.bg};
    overflow: hidden;  
  }

  @media only screen and (max-device-width: 620px) {
    right: 15px;
    top: 600px;
  }
`;

export const TimerIn = styled.div`
  position: absolute; 
  width: 30px; 
  height: 30px; 
  border-radius: 50%; 
  background: ${({ theme }) => theme.timer.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1px;
  margin-left: 1px;

  & > svg {
    width: 18px;
    height: 18px;
  }
`;

export const TimerProgress = styled.div<{ progress: number; }>`
  height: 55px; 
  width: 165px; 
  background: #FF416E; 
  position: absolute; 
  top: -55px; 
  left: -53px; 
  transform: ${({ progress }) => `rotate(${progress}deg)`}; 
  transform-origin: 55px 55px; 
  transition: all .3s; 
`; 

export const TimerModalDuration = styled.h3`
  text-align: center;
  // font-size: 1.60em;
  font-size: 18px;
  color: ${({ theme }) => theme.timer.color};
  word-spacing: 10px;
  margin-bottom: 1px;

  & > span {
    color: #FF416E;
  }
`;

export const TimerModal = styled.div<{ display?: boolean; fixed?: boolean; progressBar?: any; }>` 
  width: 80%;
  max-width: 149px;
  background: ${({ theme }) => theme.timer.bg};
  border-radius: 5px;
  position: fixed;
  right: 145px;
  top: 570px;
  z-index: 9999;
  -webkit-box-shadow: 1px 3px 14px -1px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 1px 3px 14px -1px rgba(34, 60, 80, 0.2);
  box-shadow: 1px 3px 14px -1px rgba(34, 60, 80, 0.2);
  display: ${({ display }) => display ? "flex" : "none"};
  flex-direction: column;  
  justify-content: center;
  align-items: center;
  height: 86px;

  @media only screen and (max-device-width: 620px) {
    right: 15px;
  }

  &::after {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.timer.bg};
    border-radius: 4px;
    position: absolute;
    right: 8px;
    z-index: -9;
    bottom: -5px;
    transform: rotate(40deg);
  }

  & > .timer_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media only screen and (max-device-width: 620px) {
    top: 500px;
  }

  ${({ fixed }) => {
    if (fixed) {
      return `
        position: static;
        display: block;
        margin: 0 auto;
        max-width: 215px; 
        width: 100%;
        min-height: 80px;
        margin-top: 17px;
        border-radius: 30px;
        padding-top: 10px;
        padding-left: 0px;

        & > div {
          width: 100%;
          display: flex;
          flex-direction: column; 
          padding-left: 25px;
        }

        & ${TimerModalTitle} {
          font-size: 14px;
          max-width: 100%;
          width: 100%;
        }

        & ${TimerModalDuration} {
          text-align: start;
          padding-left: 5px;
          font-size: 28px;
          max-width: 200px;
          margin-bottom: 0;
        }

        & ${TimerModalUnits} {
          max-width: 200px;
          font-size: 12px;
          padding: 0; 
          justify-content: normal;
          align-item: normal;

          & > span:nth-child(2) {
            margin-left: 14px;
          }

          & > span:nth-child(3) {
            margin-left: 17px;
          }
        }

        &::after {
          display: none;
        }
      `;
    }
  }}
`;

export const TimerModalTitle = styled.h3`
  text-align: center;
  font-size: .75em;
  width: 80%;
  max-width: 108px;
  letter-spacing: 0.1px;
  max-width: 220px;
  margin-top: 2px;
  font-weight: 500;
  margin-bottom: 5px;
`; 

export const TimerModalUnits = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-gap: 15px;
  font-size: 12px;
  padding-left: 8px;
  text-align: center;

  & > span {
    color: ${({ theme }) => theme.timer.color};
    display: block;
    text-align: center;
  }
`;

export const LotteryModalDesc = styled.div`
    width: 70%;
    max-width: 325px;
    background: ${({ theme }) => theme.timer.bg};
    box-shadow: 2px 4px 13px 1px rgba(86, 101, 127, 0.2);
    min-height: 66px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    color: #FF416E;
    font-weight: 500;
    font-size: 1.43em;

    & > svg {
      width: 30px;
      height: 30px;
      margin-right: 15px;
    }

    & > span {
      margin-top: 5px;
    }

    @media only screen and (max-device-width: 620px) {
      width: 100%;
      max-width: 241px;
      margin: 0 auto;
      margin-left: auto;
      margin-right: auto;
      margin-top: 10px;
      font-size: 1.10em;
      height: 50px;
      min-height: 50px;
      border-radius: 25px;
      padding-left: 32px;

      & > * {
        font-size: 14px;
      }

      & > svg {
        width: 22px;
        height: 22px;
        margin-right: 11px;
      }
    }
`;

export const LotteryFlexBox = styled.div`
  width: 100%;
  display: flex;
  padding-top: 90px;

  @media only screen and (max-device-width: 576px) {
    display: block;
    padding-top: 30px;

    & > svg {
      width: 206px;
      height: 132px;
      margin: 0 auto;
      display: block;
    }
  }
`; 

export const TimerLoading = styled.div<{ progress: number | string; }>`
  width: ${({ progress }) => progress}%;
  left: 5px;
  max-width: 95%;
  position: absolute;
  top: 2px;
  height: 1px;
  transition: ${({ progress }) => progress == 0 ? "" : "4s"};
  display: block;
  background: #FF416E;
`;

export const LoadingBeforeData = styled.div`
  width: 100%;
  height: inherit;

  & > .flex_loading {
    width: 100%;
    display: flex;
    margin-top: 8px;
    justify-content: center;
    align-items: center;
  }

  & > .flex_loading > div {
    margin-right: 20px;
  }

  & > .flex_loading > div:nth-child(1) {
    margin-left: 20px;
  }
`;

export const LoadingBeforeItem = styled.div<{ width: number | string; height: number | string; circle?: boolean; }>`
  background: ${({ theme }) => theme.timer.bg};
  border-radius: 4px;
  height: ${({ height }) => height};
  min-width: ${({ width }) => width};
  width: ${({ width }) => width};
  display: block;

  ${({ circle }) => {
    if (circle) {
      return `
        border-radius: 10px;
      `;
    };
  }}
`;