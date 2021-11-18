import styled, { css } from 'styled-components/macro';
import { ReactComponent as CloseIcon } from '../../assets/v2/svg/close.svg';
import { ReactComponent as WhiteCloseIcon } from '../../assets/svg/CloseIcon.svg';
import { Device } from '../../Pages/PrivateArea/consts';

const theme = localStorage.getItem('theme');

export const Close = styled(theme === 'light' ? CloseIcon : WhiteCloseIcon)`
  position: absolute;
  cursor: pointer;
  top: 20px;
  right: 20px;

  @media ${Device.mobile} {
    display: none;
  }
`;

export const ModalContainerMobile = css`
  min-height: calc(100%);
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  min-width: 100vw;
  height: 100%;
  background-color: #f8f9fa;
  display: block;
  transition: 0.3s;
  z-index: 8888;
  overflow: auto;
`;

export const CenterMobile = css`
  min-width: 100vw;
  margin: 0;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  padding-bottom: 60px;
  background: #f8f9fa;
`;

export const ContentMobile = css`
  background-color: #f8f9fa;
  box-sizing: border-box;
  width: 100%;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  margin: 0;
  margin-bottom: 40px;
  border: none;
  padding: 0;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.modalBackground};

  display: block;
  transition: 0.3s;
  z-index: 99999;
  overflow: auto;

  @media ${Device.mobile} {
    ${ModalContainerMobile};
  }
`;

export const Center = styled.div`
  min-height: calc(100% - 3.5rem);
  margin: 1.75rem auto;
  display: flex;
  align-items: center;
  transition: 0.3s;

  @media ${Device.mobile} {
    ${CenterMobile};
  }
`;

export const Content = styled.div`
  margin: 0 20px;
  background: #fff;
  background: ${(props) => props.theme.lkMain.balanceBlock};
  border: ${(props) => props.theme.modalBorder};
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  position: relative;
  @media (max-width: 576px) {
    padding: 40px 20px 20px;
  }

  @media ${Device.mobile} {
    ${ContentMobile};
  }
`;

export const Wrap = styled.div`
  .wrap {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    padding: 0 10px;
  }
`;
