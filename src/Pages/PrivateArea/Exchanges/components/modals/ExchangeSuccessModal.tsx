import React, { FC } from 'react';
import { useHistory } from 'react-router';

import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { routers } from '../../../../../constantes/routers';
import { Text } from '../../../components/ui';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const ExchangeSuccessModal: FC<Props> = ({ onClose, open }: Props) => {
  const history = useHistory();

  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.SmallContainer>
            <S.BlackTitle>Обмен успешно завершен</S.BlackTitle>

            <S.DataList>
              <S.DataListItem>
                <Text size={14} lH={20}>
                  Продано CWD:
                </Text>
                <S.ListItemDivider />
                <Text size={14} lH={20} weight={700}>
                  482.40
                </Text>
              </S.DataListItem>

              <S.DataListItem>
                <Text size={14} lH={20}>
                  Стоимость RUB:
                </Text>
                <S.ListItemDivider />
                <Text size={14} lH={20} weight={700}>
                  49 900
                </Text>
              </S.DataListItem>

              <S.DataListItem>
                <Text size={14} lH={20}>
                  Ваша оценка покупателю:
                </Text>
                <S.ListItemDivider />
                <Text size={14} lH={20} weight={700}>
                  5.0
                </Text>
              </S.DataListItem>
            </S.DataList>

            <Button primary fullWidth onClick={() => history.replace(routers.p2pchangesOwn)}>
              К списку обменов
            </Button>
          </S.SmallContainer>
        </Modal>
      )}
    </>
  );
};
