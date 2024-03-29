import styled from 'styled-components';
import { ReactComponent as StrokeIcon } from '../../assets/svg/StrokeBottom.svg';

export const Placeholder = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.depositHead};
`;

export const InputItem = styled.div`
  span {
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: ${(props) => props.theme.text2};
    white-space: nowrap;
  }
  display: inline-block;
`;

export const CustomSelect = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
`;

export const InputWrap = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-right: 32px;
`;

export const Container = styled.div`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;

  min-height: 40px;
  position: relative;
`;

export const Arrow = styled.div<{ rotat?: boolean }>`
  margin-right: 0px;
  transform: ${(props) => (props.rotat ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: 0.2s ease;
`;

export const List = styled.ul<{ rotat?: boolean }>`
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  background: ${(props) => props.theme.card.background};
  z-index: 9999;
  border: ${(props) => (props.rotat ? '1px' : '0')} solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 0px 0px 4px 4px;
  transition: height 0.2s ease;
  overflow: hidden;
  height: ${(props) => (props.rotat ? 'auto' : '0')};
`;

export const Li = styled.li`
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  letter-spacing: 0.1px;
  color: #000000;
  padding: 6px 20px;

  &:first-child {
    span {
      margin-left: auto;
      cursor: pointer;
    }
  }
  &:last-child {
    padding-bottom: 20px;
  }
`;

export const CheckboxIcon = styled.div`
  background: transparent;
  border: 1px solid rgba(81, 81, 114, 0.3);
  border-radius: 1px;
  display: block;
  height: 14px;
  width: 14px;
  left: 0;
  position: relative;
  top: 0;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  &:after {
    border-color: transparent;
    border-style: solid;
    border-width: 0 1px 1px 0;
    content: '';
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    transform: rotate(45deg);
    width: 3px;
    transition-duration: 0.1s;
    transition-property: border-color;
    transition-timing-function: cubic-bezier(0.33, 0.96, 0.49, 1.01);
  }
`;

export const CheckboxInput = styled.input`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
  &:checked ~ ${CheckboxIcon}:after {
    border-color: ${(props) => props.theme.text2};
  }
  &:checked ~ ${CheckboxIcon} {
    border-color: ${(props) => props.theme.text2};
  }
`;

export const LabelContainer = styled.label<{ st?: boolean }>`
  align-items: center;
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: ${(props) => (props.st ? 'flex-start' : 'space-between')};
  position: relative;
  ${(props) => {
    if (props.st) {
      return `
            span{
                padding-left: 25px;
            }
          `;
    }
  }}
`;

export const Ratio = styled.div`
  margin-left: 8px;
  white-space: nowrap;
`;

export const Accordion = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 10%;
  overflow-y: auto;
`;

export const Fold = styled.div`
  cursor: pointer;
  text-align: left;
  width: 100%;
  padding-top: 3px;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  color: rgba(109, 185, 255, 1);
`;

export const FoldContent = styled.div<{ open?: boolean }>`
  max-height: ${(props) => (props.open ? '400px' : '0')};
  width: 100%;
  padding-top: 5px;
  overflow: hidden;
  transition: max-height 300ms ease;
`;

export const SelectList = styled.ul`
  list-style: none;
  background: ${(props) => props.theme.card.background};
  border: 1px solid rgba(86, 101, 127, 0.3);
  border-radius: 4px;
  position: absolute;
  user-select: none;
  right: 0;
  left: 0;
  top: 40px;
  z-index: 999;
`;

export const ListItem = styled.li<{ active?: boolean }>`
  transition: 0.3s;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.card.background};
  cursor: pointer;
  &:focus,
  &:hover {
    background: ${(props) => props.theme.card.backgroundAlfa};
    border-radius: 0px 0px 4px 4px;
  }
`;

export const Text = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`;

export const Value = styled.div`
  color: #000000;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`;

export const DropDownContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const DropDownHeader = styled.div`
  border-radius: 4px;
  position: relative;
  height: 40px;
  font-size: 14px;
  line-height: 16px;
  padding: 12px;
  width: 100%;
  transition: 200ms ease-in-out;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background: ${props => props.theme.v2.cover};
  border: 1px solid ${props => props.theme.v2.dropdownBorder};
  color: ${props => props.theme.v2.blackText};

  ${Arrow} {
    position: absolute;
    right: 15px;
    top: 9px;
  }
  span {
    &::after,
    &::before {
      position: absolute;
      transition: 200ms ease-in-out;
    }
    &::before {
      content: attr(data-label);
      left: 16px;
      top: 0;
      bottom: 0;
      margin: auto;
      pointer-events: none;
      height: 18px;
      transform: translateY(-16px);
      font-weight: normal;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: 0.1px;
      position: absolute;
      left: 12px;
      padding: 0 12px;
      top: -12px;
      z-index: 9;
      background: ${(props) => props.theme.card.background};
      color: ${(props) => props.theme.depositHead};
    }
  }

  &:hover {
    border-color: ${props => props.theme.v2.dropdownBorderHover};
    cursor: pointer;
  }
`;


export const StrokeBottom = styled(StrokeIcon)`
  fill: ${props => props.theme.v2.blackText};
`;
