import styled from 'styled-components/macro';
import { FC, useState } from 'react';
import { ReactComponent as Arrow } from '../../assets/svg/selArrow.svg';
import { Scrollbars } from 'react-custom-scrollbars';
import { BalanceList, Balance } from '../../types/balance';
import 'moment/locale/ru';

type SelectType = {
  data: any[] | null | undefined | BalanceList[];
  setSwitch: (value: any) => void;
  withoutVolume?: boolean;
};

export const Select: FC<SelectType> = ({ data, setSwitch, withoutVolume }: SelectType) => {
  const [value, setValue] = useState<string | undefined>();
  const [activeSwitch, setActiveSwitch] = useState<boolean>(false);

  const hideList = () => {
    setActiveSwitch(!activeSwitch);
  };

  const getSwitch = (e: any) => {
    hideList();
    setValue(Balance[e.target.dataset.curr]);
    setSwitch(Balance[e.target.dataset.curr]);
  };

  return (
    <Field onClick={hideList} rotate={activeSwitch}>
      <Arrow className="arrow" />
      {value ? value : 'Валюта не выбрана'}
      <FieldList block={activeSwitch}>
        <Scrollbars className="pagination">
          {data &&
            data.map((item, idx) => (
              <FieldListItem key={idx} data-curr={item.balanceKind} onClick={getSwitch}>
                {Balance[item.balanceKind]}
                {!withoutVolume &&
                  ` - ${(item.balanceKind === 1
                    ? Number(item.volume) / 100000
                    : item.balanceKind === 43
                    ? Number(item.volume) / 10000
                    : item.balanceKind === 59
                    ? Number(item.volume) / 100
                    : Number(item.volume)
                  ).toLocaleString('ru-RU', { maximumFractionDigits: 5 })}`}
              </FieldListItem>
            ))}
        </Scrollbars>
      </FieldList>
    </Field>
  );
};

const Field = styled.div<{ rotate?: boolean }>`
  width: 100%;
  border-radius: 4px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 12px;
  position: relative;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  user-select: none;
  margin-bottom: 10px;
  background: ${(props) => props.theme.v2.cover};
  border: 1px solid ${(props) => props.theme.v2.dropdownBorder};
  color: ${(props) => props.theme.v2.blackText};

  & > .arrow {
    position: absolute;
    right: 17px;
    transform: ${({ rotate }) => `rotate(${rotate ? '90' : '0'}deg)`};
    transition: 0.5s;
  }
  & > .arrow > path {
    fill: ${(props) => props.theme.lkMain.navLink};
  }
`;

const FieldList = styled.div<{ block: boolean }>`
  width: 100%;
  height: 90px;

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  position: absolute;
  z-index: 9999;

  border-top: 0px;
  left: -1px;
  margin: 0;
  margin-top: 128px;
  min-width: 340px;
  overflow-y: hidden;
  display: ${({ block }) => (block ? 'block' : 'none')};

  background: ${(props) => props.theme.v2.cover};
  border: 1px solid ${(props) => props.theme.v2.dropdownBorder};
  color: ${(props) => props.theme.v2.blackText};
  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const FieldListItem = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  transition: 0.5s;
  user-select: none;
  color: ${(props) => props.theme.v2.blackText};

  &:hover {
    background: ${(props) => props.theme.v2.dropdownBorder};
  }
`;
