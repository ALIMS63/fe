import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { Text } from '../components/ui/Text';
import * as S from './S.el';
import { routers } from '../../../constantes/routers';
import { ExchangeChatCard } from './components/ExchangeChatCard';
import { RouteComponentProps } from 'react-router-dom';

type PropsMatch = {
  slug: string;
};

export const SingleExchangeChat = ({ match }: RouteComponentProps<PropsMatch>) => {
  const history = useHistory();
  const safeId = match.params.slug;

  console.log('safeId', safeId);
  return (
    <S.Container>
      <Container>
        <Back text="Назад к обмену" onGoBackClick={() => history.goBack()} />
        <S.TitleContainer>
          <Title mB={0}>Чат в рамках обмена CWD-RUB</Title>
          <Text size={14} lH={20} black>
            № 4799646829
          </Text>
        </S.TitleContainer>

        <ExchangeChatCard />
      </Container>
    </S.Container>
  );
};
