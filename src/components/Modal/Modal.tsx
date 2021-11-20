import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as Times } from '../../assets/svg/times.svg';
import { Portal } from '../Portal/Portal';

type ModalProps = {
  onClose: () => void;
  width?: number;
  zIndex?: string;
  mobMarg?: boolean;
  children: ReactNode;
  paddingTop?: number;
  style?: any;
  styles?: string;
  lottery?: boolean;
  withClose?: boolean;
  withoutClose?: boolean;
  ptl?: boolean;
  p20?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  width,
  zIndex = '99999',
  mobMarg,
  paddingTop,
  style,
  styles,
  lottery,
  withClose,
  withoutClose,
  ptl,
  p20,
}: ModalProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget == e.target) {
      onClose();
    }
  };

  return (
    <Portal>
      <ModalContainer zIndex={zIndex} style={style} className="bbg" lottery={lottery}>
        <Center styles={styles} onClick={handleContainerClick} lottery={lottery}>
          <ModalComponent
            width={width}
            mobMarg={mobMarg}
            paddingTop={paddingTop}
            paddingsTopLess={ptl}
            p20={p20}
          >
            {withClose && (
              <span className="close">
                <Times onClick={handleContainerClick} />
              </span>
            )}
            {children}
          </ModalComponent>
        </Center>
      </ModalContainer>
    </Portal>
  );
};

const Main = styled.div`
  min-height: 125vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div<{ styles?: string; lottery?: boolean }>`
  min-height: calc(100% - 3.5rem);
  margin: 1.75rem auto;
  display: flex;
  align-items: center;
  transition: 0.3s;

  ${({ styles }) => {
    if (styles) {
      return styles;
    }
  }}

  ${({ lottery }) => {
    if (lottery) {
      return `
        max-width: 1059px;
        border-radius: 10px; 
        max-height: 358px;

        @media only screen and (max-width: 620px) {
          max-width: 280px;
          & > div {
            min-width: 280px;
          }
        }
      `;
    }
  }}
`;

const ModalContainer = styled.div<{ zIndex: string; lottery?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.v2.modalBg};
  display: block;
  transition: 0.3s;
  z-index: ${(props) => props.zIndex};
  overflow: auto;
  @media (max-width: 576px) {
    padding: 20px;
  }
`;

const ModalComponent = styled.div<{
  width?: number;
  mobMarg?: boolean;
  paddingTop?: number;
  styles?: string;
  lottery?: boolean;
  paddingsTopLess?: boolean;
  p20?: boolean;
}>`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  cursor: auto;
  background: ${(props) => props.theme.lkMain.balanceBlock};
  border-radius: 8px;
  padding: 40px;
  max-width: ${(props) => (props.width ? props.width + 'px' : '400px')};
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  /* padding: 20px; */
  ${({ paddingTop }) => {
    if (paddingTop) {
      return `
        padding-top: ${paddingTop}px;
      `;
    }
  }}

  ${(props) => {
    if (props.paddingsTopLess) {
      return `
        padding-top: 20px;
        padding-bottom: 20px;
      `;
    }
    if (props.p20) {
      return `
        padding: 20px;
      `;
    }
  }}

  & > .wrap {
    padding: 22px;
  }

  & .deposits_programs {
    display: flex;
  }

  & > span > svg {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    z-index: 9999;
    font-size: 36px;
    opacity: 40%;
    font-weight: 100;
    width: 12px;
    height: 12px;
    &:hover {
      color: ${(props) => props.theme.text3Hover};
    }
  }

  .close > svg > path {
    fill: #000;
  }

  ${(props) => {
    if (props.styles) {
      return props.styles;
    }
  }}

  @media (max-width: 768px) {
    margin: ${(props) => (props.mobMarg ? '50px 20px' : '50px auto')};
    padding: ${(props) => (props.mobMarg ? '0' : '1rem')};
  }

  @media (max-width: 620px) {
    margin: 0 auto;
  }
`;
