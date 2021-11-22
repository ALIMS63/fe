import Switch from 'react-switch';
import styled from 'styled-components';

export const SwitcherUI = styled(Switch)<{ checked: boolean }>`
  > div.react-switch-bg {
    background: ${(props) =>
      props.checked
        ? props.theme.lkMain.switcherBckgOn
        : props.theme.lkMain.switcherBckgOff} !important;
    height: 16px !important;
    width: 26px !important;
  }
  > div.react-switch-handle {
    background: ${(props) =>
      props.checked ? props.theme.lkMain.switcherOn : props.theme.lkMain.switcherOff} !important;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06) !important;
    height: 14px !important;
    width: 14px !important;
    top: 1px !important;
    left: 1px !important;
    transform: ${(props) => (props.checked ? 'translateX(0px)' : 'translateX(10px)')} !important;
  }
`;
