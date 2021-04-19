import { Button } from "../../../../components/Button/Button";
import styled from "styled-components/macro";
import { Container } from "../../../../globalStyles";

export const BlockTitle = styled.div`
  color: #0e0d3d;
  font-size: 18px;
  font-weight: 900;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  margin-bottom: 20px;
`;

export const DescContainer = styled(Container)`
  margin-bottom: 27px;
  p {
    margin-right: auto;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
  }
`;

export const BlockContainers = styled(Container)`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 992px) {
    display: none;
  }
`;

export const BlockItem = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 10px;
  height: auto;
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 16px;
  padding-right: 16px;
  ${Button} {
    margin-top: auto;
    max-width: 100%;
  }
`;

export const Text = styled.p`
  color: #0e0d3d;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  letter-spacing: normal;
  line-height: normal;
  margin-bottom: 15px;
  p {
    padding-bottom: 10px;
  }
`;

export const SwiperContainer = styled(Container)`
  display: none;
  @media (max-width: 992px) {
    display: block;
  }
  ${BlockItem} {
    margin: 0px auto 35px;
    width: 100%;
    max-width: 340px;
    min-height: 280px;
  }
  .swiper-pagination-bullet {
    display: inline-block;
    width: 10px;
    height: 10px;
    font-size: 14px;
    line-height: 10px;
    background-color: transparent;
    border: 1px solid #515172;
    border-radius: 50%;
    margin-right: 10px;
    margin-top: 20px !important;
  }
  .swiper-pagination-bullet-active {
    background-color: #bad275;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 0px;
  }
`;

export const ModalBlock = styled.div`
  max-width: 220px;
  width: 100%;
  margin: 0 auto;
  padding: 50px 10px;
  span {
    color: #333;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    z-index: 9999;
    font-size: 18px;
    &:hover {
      color: #000;
    }
  }
`;

export const ModalButton = styled(Button)`
  min-width: 100%;
`;

export const ModalTitle = styled.h4`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #0e0d3d;
  text-align: center;
  margin-bottom: 20px;
`;
