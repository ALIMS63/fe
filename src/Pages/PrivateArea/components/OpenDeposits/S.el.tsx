import styled from 'styled-components/macro';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  box-shadow: ${(props) => props.theme.lkMain.boxShadow};
  border-radius: 4px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Name = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => props.theme.v2.text};
  margin-bottom: 10px;
`;

export const DropdownWrapper = styled.div`
  width: 300px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: auto;
  }
`;

export const BlockWrapper = styled.div`
  margin-bottom: 20px;
`;

export const TextValue = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.lkMain.navLink};
`;

export const FieldContainer = styled.div`
  margin-bottom: 40px;
`;

export const Agree = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  margin-left: 10px;
  color: ${(props) => props.theme.lkMain.navLink};

  a {
    text-decoration: underline;
    color: #0094ff;
  }
`;
