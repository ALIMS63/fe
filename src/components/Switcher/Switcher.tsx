import { FC } from 'react';
import { SwitcherUI } from './styled';
import { SwitcherPropsType } from './types';

export const Switcher: FC<SwitcherPropsType> = ({ onChange, checked }: SwitcherPropsType) => {
  return (
    <SwitcherUI uncheckedIcon={false} checkedIcon={false} onChange={onChange} checked={!checked} />
  );
};
