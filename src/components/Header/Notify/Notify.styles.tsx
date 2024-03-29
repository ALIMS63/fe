import styled from 'styled-components';
import { ReactComponent as Done } from '../../../assets/svg/done.svg';

export const BallContainer = styled.div<{ notChecked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95px;
  position: relative;
  & > svg {
    cursor: pointer;
  }
  & > svg > path {
    fill: ${({ theme }) => theme.main.bodyColor};
  }
  &::before {
    content: '';
    display: ${({ notChecked }) => (notChecked ? 'block' : 'none')};
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff4a31;
    position: absolute;
    margin-left: 17px;
    margin-top: -15px;
  }
  @media (max-width: 768px) {
    margin-right: 45px;
    width: 50px;
  }
  @media only screen and (max-width: 330px) {
    width: 35px;
  }
`;

export const NotifiesBlock = styled.div<{
  block: boolean;
  auth?: boolean;
  admin?: boolean;
  empty: boolean;
  load: boolean;
  inPA?: boolean;
  length?: number;
  none: boolean;
}>`
  width: 100%;
  max-width: 420px;
  transition: 0.3s;
  top: 90px;
  display: ${({ none }) => none ? "block" : "none"};
  opacity: ${({ block }) => block ? "100%" : "0%"};
  height: ${({ empty, length }) => (empty ? '80px' : `${length && length < 4 ? (length * 127) + 40 : 584}px`)};
  ${({ load }) => {
    if (load) {
      return `
                height: 230px;  
            `;
    }
  }}
  border-radius: 4px;
  position: fixed;
  @media (min-width: 1101px) {
    position: absolute;
    top: 50px;
  }
  @media (max-width: 1100px) {
    max-width: 100%;
    right: 0;
    left: 0;
    margin: 0;
  }
  @media (max-width: 767px) {
    top: 60px;
  }
  @media (min-width: 769px) and (max-width: 1100px) {
    top: 80px;
  }
  ${({ admin }) => {
    if (admin) {
      return `
            right: 140px;
            @media (max-width: 767px) {
                right: 0px;
            }
            `;
    }
    if (!admin) {
      return `
            right: 48px;
            @media only screen and (max-width: 767px) {
                right: 0px;
            }
          `;
    }
  }}
  border: 1px solid ${({ theme }) => theme.notifies.notifiesBorder};
  z-index: 999999;
  background: ${({ theme }) => theme.notifies.notifyBlockBackground};
  box-shadow: ${({ theme }) => theme.notifies.notifiesBoxShadow};
  padding: 20px 8px 1px 0px;
  &::before {
    content: '';
    width: 14px;
    height: 14px;
    background: ${({ theme }) => theme.notifies.notifyBlockBackground};
    display: block;
    border-radius: 3px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 0px;
    transform: rotate(45deg);
    position: absolute;
    right: 0;
    left: 0;
    top: -8px;
    border-top: 1px solid ${({ theme }) => theme.notifies.notifiesBorder};
    border-left: 1px solid ${({ theme }) => theme.notifies.notifiesBorder};
    margin: auto;
    @media (max-width: 1100px) {
      margin-right: 0;
      right: 82px;
    }
    @media (min-width: 320px) and (max-width: 330px) {
      right: 75px;
    }
    @media (min-width: 768px) and (max-width: 1100px) {
      right: 133px;
    }
    @media (min-width: 769px) and (max-width: 1100px) {
      right: 133px;
    }
    @media (min-width: 779px) and (max-width: 1024px) {
      right: 167px;
    }
    @media (min-width: 783px) and (max-width: 1022px) {
      right: 133px;
    }
  }
  & > .scrollbars > div {
    right: -1px !important;
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1100px) {
    right: 0;
  }
`;

export const Notify = styled.div<{
  notChecked: boolean;
  empty?: boolean;
  click?: boolean;
  notclb?: boolean;
}>`
  width: 100%;
  background: ${({ theme }) => theme.notifies.notifyBackground};
  margin-bottom: 10px;
  padding: 10px;
  padding-left: 29px;
  position: relative;
  cursor: pointer;
  transition: 0.5s;
  ${({ click }) => {
    if (click) {
      return `
                opacity: 10%;
            `;
    }
    if (click === false) {
      return `
                display: none;
            `;
    }
  }}
  &::before {
    content: '';
    display: ${({ notChecked }) => (notChecked ? 'block' : 'none')};
    background: #ff4a31;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    left: 12px;
    top: 17px;
    position: absolute;
  }
  ${({ empty }) => {
    if (empty) {
      return `
                height: 40px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
            `;
    }
  }}
  ${({ notclb }) => {
    if (notclb) {
      return `
                cursor: initial;  
            `;
    }
  }}
`;

export const NotifyItem = styled.h3<{
  grey?: boolean;
  bold?: boolean;
  link?: string;
  notclb?: boolean;
}>`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.notifies.notifiesDateColor};
  & > a { 
    color: inherit;
    line-height: inherit;
    font-size: inherit;
    font-weight: inherit;
    ${({ link }) => {
      if (link == '0') {
        return `
                    pointer-events: none; 
                    cursor: default;
                `;
      }
    }}
  }
  margin-bottom: 4px;
  max-width: 360px;
  word-wrap: break-word;
  &:last-child {
    margin-bottom: 0px;
  }
  ${({ grey, bold }) => {
    if (grey) {
      return `
               opacity: 60%;
            `;
    }
    if (bold) {
      return `
                font-weight: 700;
            `;
    }
  }}

  ${({ notclb }) => {
    if (notclb) {
      return `
                cursor: initial;
                @media only screen and (max-width: 767px) {
                  font-size: 12px;
                }
            `;
    }
  }}
`;

export const Scrollbar = styled.div<{ lengthMoreThenFour: boolean; }>`
  width: 3px !important;
  height: 203px !important;
  background: #93a1c1;
  border-radius: 2px;
  display: ${({ lengthMoreThenFour }) => lengthMoreThenFour ? "block" : "none"} !important;
`;

export const DoneNotify = styled.div`
  margin: 10px 0px 0px 0px;
  & > svg > path {
    fill: ${({ theme }) => theme.notifies.doneNotify} !important;
  }
`;
