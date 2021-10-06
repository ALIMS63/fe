import React, { FC } from 'react';
import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { Dropdown } from '../../../components/Dropdown';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  selectedOption: string | null;
  setSelectedOption: (selectedOption: string) => void;
  options: string[];
};

export const CurrencyPair: FC<Props> = ({
  onClose,
  open,
  selectedOption,
  setSelectedOption,
  options,
}: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Выбор валютной пары</S.Title>
            <S.DropdonwConatainer>
              <Dropdown
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                options={options}
              />
            </S.DropdonwConatainer>
            <S.DropdonwConatainer big>
              <Dropdown
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                options={options}
              />
            </S.DropdonwConatainer>
            <Button fullWidth primary>
              Применить
            </Button>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
