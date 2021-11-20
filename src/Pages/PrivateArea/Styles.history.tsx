import styled from 'styled-components/macro';

export const FilterDivision = styled.div`
  width: 129px;
  height: 26px;
  border-right: 1px solid #ebebf2;
  display: flex;
  align-items: center;
  justify-content: center;
  &:nth-child(1) {
    justify-content: normal;
    width: 125px;

    @media (max-width: 1024px) {
      width: auto;
      padding-right: 10px;
    }
  }
  &:nth-child(2) {
    margin-right: 20px;
    @media (max-width: 1024px) {
      margin-right: 10px;
      width: 105px;
    }
  }
`;

export const FilterAllBlock = styled.div<{ mbNone?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: ${({ mbNone }) => (mbNone ? 0 : '20px')};
    flex-direction: column-reverse;
    gap: 20px;
  }
`;

export const Table = styled.div<{ none?: boolean }>`
  width: 100%;
  margin-bottom: 40px;
  box-shadow: ${(props) => props.theme.lkMain.boxShadow};
  border-radius: 4px;
  min-height: 530px;
`;

export const TableMap = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  background: ${(props) => props.theme.v2.bg};
`;

type TableProps = {
  head?: boolean;
  item?: boolean;
  income?: boolean;
  newItem?: boolean;
  mrLarger?: boolean;
};

export const TableItem = styled.div<TableProps>`
  width: 100%;
  display: flex;
  align-items: center;
  height: 56px;
  position: relative;
  @media (max-width: 1024px) {
    height: ${({ head }) => (head ? '56px' : '60px')};
  }
  ${({ head, item, theme }) => {
    if (head) {
      return `
                background: ${theme.v2.neutral};
                border-top-right-radius: 4px;
                border-top-left-radius: 4px;
                padding-left: 20px;
                padding-right: 20px;
                @media (max-width: 1024px) {
                  padding: 0px 35px;
                }
            `;
    }
    if (item) {
      return `
                border-bottom: ${theme.lkMain.borderBottom};
                &:last-child {
                  border-bottom: 0px;
                }
          `;
    }
  }}
  ${({ newItem }) => {
    if (newItem) {
      return `
                opacity: 10%;
            `;
    }
  }}
`;

export const TableInnerItem = styled.div<TableProps>`
  color: ${({ theme }) => theme.lkMain.navLink};
  font-size: 14px;
  &:nth-child(3) {
    position: absolute;
    right: 20px;
    @media (max-width: 1024px) {
      right: 35px;
    }
  }

  ${({ head, item, mrLarger }) => {
    if (head) {
      return `
                font-weight: 300;
                line-height: 16px;
                &:nth-child(1) {
                    margin-right: 166px;
                    @media (max-width: 1024px) {
                        margin-right: ${mrLarger ? '150px' : '115px'};
                        
                    }
                }
            `;
    }
    if (item) {
      return `
                font-weight: 500;
                line-height: 20px;
                &:nth-child(1) {
                    margin-right: 131px;
                    @media (max-width: 1024px) {
                        margin-right: ${mrLarger ? '85px' : '50px'};
                    }
                }
                &:nth-child(3) {
                    right: 0px;
                }
                @media (max-width: 1024px) {
                    padding: 0px 15px;
                }
            `;
    }
  }}

  ${({ income }) => {
    if (income) {
      return `
                color: #61AD00;
            `;
    }
  }}
`;

export const Button = styled.button<{ newItems: boolean }>`
  width: 134px;
  height: 38px;
  background: #515172;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  line-height: 16px;
  margin: 0 auto;
  margin-bottom: 40px;
  display: block;
  cursor: pointer;
  font-weight: 500;
  display: ${({ newItems }) => (newItems ? 'block' : 'none')};
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.lkMain.navLink};
  &:hover {
    text-decoration: underline;
  }
`;

export const MobWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;
export const MobTab = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 90px;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
  gap: 10px;

  background: #ffffff;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
`;
export const TabRow = styled.div<{ green?: boolean }>`
  display: flex;
  justify-content: space-between;
  & > span {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    :nth-child(2) {
      color: ${(props) => (props.green ? '#61AD00' : '#000000')};
    }
  }
`;
