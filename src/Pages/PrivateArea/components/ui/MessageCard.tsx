import moment from 'moment';
import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ChatTestImage } from '../../../../assets/v2/svg/chat-test-image.svg';
import { CollectionHistory } from '../../../../types/messages';

interface MessageCardProps {
  own?: boolean;
  image: boolean;
  body: CollectionHistory;
  onClickImage: (item: string) => void;
  error: boolean;
}

export const MessageCard = ({
  own = true,
  image = false,
  body,
  onClickImage,
  error,
}: MessageCardProps) => {
  if (error) {
    return (
      <MessageContainer own={own}>
        <MessageDate>{moment.utc(body.messageDate).local().fromNow()}</MessageDate>
        <MessageBlock own={own} error>
          {body.message}
        </MessageBlock>
      </MessageContainer>
    );
  }
  if (image) {
    return (
      <MessageContainer own={own}>
        <MessageBlock pointer own={own} onClick={() => onClickImage(body.message)}>
          {/* <ChatTestImage /> */}
          <img src={body.message} alt="" />
        </MessageBlock>
      </MessageContainer>
    );
  }

  return (
    <MessageContainer own={own}>
      <MessageDate>{moment.utc(body.messageDate).local().fromNow()}</MessageDate>
      <MessageBlock own={own}>{body.message}</MessageBlock>
    </MessageContainer>
  );
};

const MessageContainer = styled.div<{ own: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.own ? 'flex-end' : 'flex-start')};
  margin-bottom: 20px;
  @media (max-width: 767px) {
    padding: ${(props) => (props.own ? '0 0 0 40px' : '0 40px 0 0')};
  }
`;

const MessageDate = styled.div`
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => props.theme.black};
  margin-bottom: 10px;
  @media (max-width: 767px) {
    padding: 0 20px;
  }
`;

const OwnMessageStyles = css`
  border-radius: 4px 0px 4px 4px;
  background: rgba(0, 148, 255, 0.1);
  border: 1px solid rgba(0, 148, 255, 0.1);
`;

const PartnerMessageStyles = css`
  background: #f9fafb;
  border: 1px solid #edf0f7;
  border-radius: 0px 4px 4px 4px;
`;

const MessageBlock = styled.div<{ own: boolean; pointer?: boolean; error?: boolean }>`
  max-width: 100%;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.black};
  padding: 12px;
  ${(props) => (props.own ? OwnMessageStyles : PartnerMessageStyles)};
  cursor: ${(props) => (props.pointer ? 'pointer' : 'inherit')};
  ${(props) => {
    if (props.error) {
      return `
        background: none;
        color: #FF4A31;
        border: none
      `;
    }
  }}
`;
