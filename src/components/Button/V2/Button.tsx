import styled from 'styled-components/macro';

type Props = {
  primary?: boolean;
  yellow?: boolean;
  bigSize?: boolean;
  outlinePrimary?: boolean;
  outlineDanger?: boolean;
  fullWidth?: boolean;
  exchangeBtn?: boolean;
  disabled?: boolean;
  rightBtnOnTablet?: boolean;
  fullWidthMobile?: boolean;
};

export const Button = styled.a<Props>`
  padding: 11px 20px 11px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  box-sizing: border-box;
  appreance: none;
  user-select: none;
  border-radius: 4px;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  font-weight: 500;
  font-size: ${(props) => (props.bigSize ? 14 : 12)}px;
  line-height: ${(props) => (props.bigSize ? 16 : 14)}px;
  text-transform: ${(props) => (props.bigSize ? 'none' : 'uppercase')};
  color: #ffffff;
  border: none;
  transition: all 0.3s ease 0s;
  background: #515172;
  color: #ffffff;
  cursor: ${(props) => (props.disabled ? 'no-drop' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.4' : '1')};

  &:hover {
    box-shadow: ${(props) => (props.disabled ? 'none' : `0px 4px 10px #515172`)};
    border-color: ${(props) => props.theme.buttonBorder};
  }
  &:focus,
  &:active {
    outline: none;
  }
  ${(props) => {
    if (props.primary) {
      return `
        background: #0094FF;
      `;
    }
    if (props.yellow) {
      return `
        background: #F6B817;
        color: #0E0D3D;
    `;
    }
    if (props.outlinePrimary) {
      return `
        border: 1px solid #0094FF;
        background: transparent;
        color: #0094FF;
      `;
    }
    if (props.outlineDanger) {
      return `
        border: 1px solid #FF4A31;
        background: transparent;
        color: #FF4A31;
      `;
    }
  }}
  &:disabled {
    box-shadow: none;
    user-select: none;
    cursor: not-allowed;
    opacity: 0.4;
  }
  ${({ exchangeBtn }) => {
    if (exchangeBtn) {
      return `
        border: 1px solid #FF4A31;
        color: #FF4A31;
        &:hover {
          box-shadow: 0px 4px 10px #FF4A31;
          border: 1px solid #FF4A31;
        }
        &:disabled {
          border: 1px solid #0094FF;
          color: #0094FF;
        }
      `;
    };
  }}
  ${({ rightBtnOnTablet }) => {
    if (rightBtnOnTablet) {
      return `
          display: flex;
          justify-content: flex-end;
      `;
    };
  }};
  ${({ fullWidthMobile }) => {
    if(fullWidthMobile) {
      return  `
        @media only screen and (max-device-width: 768px) {
          width: 100%;
        }
      `;
    }
  }}
`;

// &:disabled {
//   background: #ccc;
//   border-color: #ccc;
//   box-shadow: none;
//   user-select: none;
// }