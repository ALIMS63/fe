import React from 'react';
import styled, { css } from 'styled-components';
import {ReactComponent as ChatTestImage} from '../../../../assets/v2/svg/chat-test-image.svg';

interface MessageCardProps {
    own?: boolean;
    image?: boolean;
    date?: string;
    body?: string;
};

export const MessageCard = ({
    own = true,
    image = false,
    date,
    body
}: MessageCardProps) => {

    if(image) {
        return (
            <MessageContainer own={own}>
                <MessageBlock own={own}>
                    <ChatTestImage />
                </MessageBlock>
            </MessageContainer>
        )
    }

    return (
        <MessageContainer own={own}>
            <MessageDate>{date}</MessageDate>
            <MessageBlock own={own}>
                {body}
            </MessageBlock>
        </MessageContainer>
    )
};

const MessageContainer = styled.div<{own: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: ${props => props.own ? 'flex-end' : 'flex-start'};
    margin-bottom: 20px;
`;

const MessageDate = styled.div`
    font-weight: 300;
    font-size: 12px;
    line-height: 16px;
    color: ${props => props.theme.black};
    margin-bottom: 10px;
`;

const OwnMessageStyles = css`
    border-radius: 4px 0px 4px 4px;
    background: rgba(0, 148, 255, 0.1);
    border: 1px solid rgba(0, 148, 255, 0.1);
`;

const PartnerMessageStyles = css`
    background: #F9FAFB;
    border: 1px solid #EDF0F7;
    border-radius: 0px 4px 4px 4px;
`;

const MessageBlock = styled.div<{own: boolean}>`
    max-width: 470px;
    font-weight: 300;
    font-size: 14px;
    line-height: 20px;
    color: ${props => props.theme.black};
    padding: 12px;
    ${props => props.own ? OwnMessageStyles : PartnerMessageStyles};
  
`;