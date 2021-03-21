import React, { useState, useEffect, useContext, FC } from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
import { SideNavbar } from "../../components/SideNav";
import { Card } from "../../globalStyles";
import { UpTitle } from "../../components/UI/UpTitle";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import { HalfRoundBorder } from "../../components/UI/HalfRound";
import useWindowSize from "../../hooks/useWindowSize";
import { Select } from "../../components/Select/Select";
import { TestInput } from "../../components/UI/DayPicker";
import { Button } from "../../components/Button/Button";
import { AppContext } from "../../context/HubContext";
import { OpenDate } from "../../types/dates";
import { FilterMenu } from "../../components/FilterMenu/FilterMenu";
import { Scrollbars } from "react-custom-scrollbars";
import { CSSTransition } from "react-transition-group";
// import { AdminDepositList } from "./AdminPay/DepositList";
import {
  DepositStats,
  ListDeposits,
  CollectionListDeposits,
} from "../../types/deposits";
import {
  RootPayments,
  PaymentsCollection,
  CollectionCharges,
} from "../../types/payments";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroller";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { ModalDeposit } from "./AdminPay/Payments";
import { Header } from "../../components/Header/Header";
import { Loading } from "../../components/UI/Loading";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
type PayProps = {
  data: PaymentsCollection;
};

const AdminDepositList: FC<PayProps> = ({ data }: PayProps) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const modalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };
  return (
    <div>
      <CSSTransition in={open} timeout={300} classNames="modal" unmountOnExit>
        <ModalDeposit onClose={onClose} data={data} />
      </CSSTransition>
      <TableBody onClick={modalOpen}>
        <TableBodyItem>{data.userName}</TableBodyItem>
        <TableBodyItem>{data.deposit.name}</TableBodyItem>
        <TableBodyItem>
          {moment(data.creationDate).format("DD/MM/YYYY")}
        </TableBodyItem>
        <TableBodyItem>
          {moment(data.endDate).format("DD/MM/YYYY")}
        </TableBodyItem>
        <TableBodyItem>{data.amountView ? data.amountView : "-"}</TableBodyItem>
        <TableBodyItem>
          {moment(data.paymentDate).format("DD/MM/YYYY")}
        </TableBodyItem>
        <TableBodyItem>{data.payedAmountView}</TableBodyItem>
        <TableBodyItem></TableBodyItem>
      </TableBody>
    </div>
  );
};

export const AdminDeposit = () => {
  const [statsDeposit, setStatsDeposit] = useState<DepositStats[]>([]);
  const [listDeposits, setListDeposits] = useState<CollectionListDeposits[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [depositsList, setDepositsList] = useState<PaymentsCollection[]>([]);
  const [checkList, setCheckList] = useState<any>([]);
  const [name, setName] = useState("");
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [closeDate, setCloseDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);

  const myLoad = (...arg: any) => {
    if (hubConnection) {
      setCount(false);
      hubConnection
        .invoke<RootPayments>(
          "GetUsersDeposits",
          [1, 2, 3, 4, 5, 6],
          name || null,
          namesProgram.length ? namesProgram : null,
          openDate.from || null,
          openDate.to || null,
          closeDate.from || null,
          closeDate.to || null,
          null,
          num,
          20
        )
        .then((res) => {
          if (res.collection.length) {
            console.log("loadMoreItems", res);
            setDepositsList([...depositsList, ...res.collection]);
            setCount(true);
            setNum(num + 20);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  useEffect(() => {
    setNum(20);
  }, []);

  const namesProgram = checkList.map((i: any) => i.label);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const sizes = useWindowSize();
  const size = sizes < 768;
  const header = sizes < 992;

  const filterClick = (id: number) => {
    console.log("click", id);
  };

  const arrSizeBig = 10;
  const arrSizeMob = 4;

  const newArrayBig: any[] = [];
  for (let i = 0; i < Math.ceil(statsDeposit.length / arrSizeBig); i++) {
    newArrayBig[i] = statsDeposit.slice(
      i * arrSizeBig,
      i * arrSizeBig + arrSizeBig
    );
  }

  const newArrayMob: any[] = [];
  for (let i = 0; i < Math.ceil(statsDeposit.length / arrSizeMob); i++) {
    newArrayMob[i] = statsDeposit.slice(
      i * arrSizeMob,
      i * arrSizeMob + arrSizeMob
    );
  }

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<DepositStats[]>("GetUsersDepositsStats")
        .then((res) => {
          setStatsDeposit(res);
          console.log("GetUsersDepositsStats", res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<ListDeposits>("GetDeposits", 0, 40)
        .then((res) => {
          console.log("GetDeposits", res);
          setListDeposits(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPayments>(
          "GetUsersDeposits",
          [1, 2, 3, 4, 5, 6],
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0,
          20
        )
        .then((res) => {
          setNum(20);
          setLoading(false);
          setDepositsList(res.collection);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection]);

  const submit = () => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPayments>(
          "GetUsersDeposits",
          [1, 2, 3, 4, 5, 6],
          name ? name : null,
          namesProgram.length ? namesProgram : null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          closeDate.from ? closeDate.from : null,
          closeDate.to ? closeDate.from : null,
          null,
          0,
          20
        )
        .then((res) => {
          setNum(20);
          console.log("submit", res);
          setDepositsList(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  };

  return (
    <>
      {header && <Header admPanel />}
      <Styled.Wrapper>
        <SideNavbar />
        <Styled.Content>
          <Styled.HeadBlock>
            <UpTitle small>Выплаты</UpTitle>
            <Styled.UserName>
              <span>Admin</span>
              <Exit />
            </Styled.UserName>
          </Styled.HeadBlock>
          <Styled.TitleHead>Активные депозиты</Styled.TitleHead>
          <div>
            <DepositWrap>
              {!size && (
                <DepositInner>
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                  >
                    {newArrayBig.map((i, idx) => (
                      <SwiperSlide key={idx} style={{ maxWidth: 1130 }}>
                        <SwiperInner>
                          {!size &&
                            i.map((item: DepositStats, idx: number) => (
                              <DepositItem key={idx}>
                                <Styled.PayItemHead mb>
                                  <UpTitle small>{item.depositName}</UpTitle>
                                </Styled.PayItemHead>
                                <RadialWrap>
                                  <HalfRound>
                                    <span>{item.count}</span>
                                    <HalfRoundBorder
                                      width={size ? "47" : "90"}
                                      height={size ? "63" : "123"}
                                      color={"#A78CF2"}
                                    />
                                  </HalfRound>
                                  <Styled.Radial bg={"#A78CF2"}>
                                    <span>
                                      {(item.amount / 100000)
                                        .toFixed(1)
                                        .toLocaleString()}
                                    </span>
                                    <span>CWD</span>
                                  </Styled.Radial>
                                </RadialWrap>
                              </DepositItem>
                            ))}
                        </SwiperInner>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </DepositInner>
              )}
              {size && (
                <MySwiperContainer>
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                  >
                    {newArrayMob.map((i, idx) => (
                      <SwiperSlide key={idx}>
                        <DepositItemWrap>
                          {i.map((item: DepositStats, idx: number) => (
                            <DepositItemInner key={idx}>
                              <DepositItem>
                                <Styled.PayItemHead mb>
                                  <UpTitle small>{item.depositName}</UpTitle>
                                </Styled.PayItemHead>
                                <RadialWrap>
                                  <HalfRound>
                                    <span>{item.count}</span>
                                    <HalfRoundBorder
                                      width={"47"}
                                      height={"63"}
                                      color={"#A78CF2"}
                                    />
                                  </HalfRound>
                                  <Styled.Radial bg={"#A78CF2"}>
                                    <span>
                                      {(item.amount / 100000)
                                        .toFixed(1)
                                        .toLocaleString()}
                                    </span>
                                    <span>CWD</span>
                                  </Styled.Radial>
                                </RadialWrap>
                              </DepositItem>
                            </DepositItemInner>
                          ))}
                        </DepositItemWrap>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </MySwiperContainer>
              )}
            </DepositWrap>
          </div>

          <Styled.FilterBlock>
            <Styled.SelectContainer>
              <Styled.SelectWrap>
                <Styled.Label>Пользователь</Styled.Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Styled.SelectWrap>
              <Styled.SelectWrap>
                <Styled.Label>Название программы</Styled.Label>
                <Select
                  checkList={checkList}
                  setCheckList={setCheckList}
                  values={listDeposits.map((item) => item.name)}
                />
              </Styled.SelectWrap>
              <Styled.InputsWrap>
                <InputsWrapItem>
                  <TestInput
                    setOpenDate={setOpenDate}
                    openDate={openDate}
                    label="Дата открытия"
                  />
                </InputsWrapItem>
                <TestInput
                  setOpenDate={setCloseDate}
                  openDate={closeDate}
                  label="Дата след.выплаты"
                />
              </Styled.InputsWrap>

              <Button danger onClick={submit}>
                Применить
              </Button>
            </Styled.SelectContainer>
          </Styled.FilterBlock>
          <Card>
            <PaymentsTable>
              <TableHead>
                <TableHeadItem>Пользователь</TableHeadItem>
                <TableHeadItem>Название</TableHeadItem>
                <TableHeadItem>Дата открытия</TableHeadItem>
                <TableHeadItem>Дата закрытия</TableHeadItem>
                <TableHeadItem>Сумма депозита</TableHeadItem>
                <TableHeadItem>Дата след. выплаты</TableHeadItem>
                <TableHeadItem>Выплачено</TableHeadItem>
                <TableHeadItem>{/* <Filter /> */}</TableHeadItem>
                {/* <FilterMenu filterClick={filterClick} /> */}
              </TableHead>
              {depositsList.length ? (
                <Scrollbars style={{ height: "500px" }}>
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={myLoad}
                    hasMore={count}
                    useWindow={false}
                    loader={
                      <div className="loader" key={0}>
                        Loading ...
                      </div>
                    }
                  >
                    {depositsList.map((item) => (
                      <AdminDepositList data={item} key={item.safeId} />
                    ))}
                  </InfiniteScroll>
                </Scrollbars>
              ) : loading ? (
                <Loading />
              ) : (
                <NotFound>Данные не обнаружены.</NotFound>
              )}
            </PaymentsTable>
            {/* <NotFound>
            Данные не обнаружены. Попробуйте изменить параметры поиска.
          </NotFound> */}
          </Card>
        </Styled.Content>
      </Styled.Wrapper>
    </>
  );
};

const InputsWrapItem = styled.div`
  margin-right: 10px;
  width: 100%;
  @media (max-width: 576px) {
    margin-right: 0px;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: 8px;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: #515172;
  &:focus {
    outline: none;
  }
`;

const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
  color: #0e0d3d;
`;

const DepositInner = styled.div`
  margin: 0 auto;
  min-width: 0;
  @media (max-width: 1470px) {
    max-width: 930px;
  }
  @media (max-width: 1270px) {
    max-width: 800px;
  }
  @media (max-width: 910px) {
    max-width: 700px;
  }
  @media (max-width: 800px) {
    max-width: 640px;
  }
  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 0px;
    left: 0;
    width: 100%;
  }
`;

const SwiperInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

const PaymentsTable = styled.div`
  padding: 30px;
  min-height: 556px;
`;

const TableHead = styled.ul`
  position: relative;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
`;

const TableHeadItem = styled.li`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: rgba(81, 81, 114, 0.6);
  width: 100%;
  &:nth-child(1) {
    max-width: 97px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(2) {
    max-width: 182px;
  }
  &:nth-child(3) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(4) {
    max-width: 110px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 120px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 110px;
    @media (max-width: 576px) {
      max-width: 80px;
    }
  }
  &:nth-child(8) {
    max-width: 40px;
    text-align: right;
    @media (max-width: 992px) {
      max-width: 60px;
    }
    @media (max-width: 576px) {
      max-width: 30px;
    }
  }
`;

const TableBody = styled(TableHead)`
  padding: 10px 0;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const TableBodyItemCss = css`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #515172;
`;

const TableBodyItem = styled(TableHeadItem)`
  ${TableBodyItemCss}
`;

const DateLabel = styled.div`
  position: relative;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
`;

const DepositWrap = styled(Card)`
  padding: 30px 5px;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 30px;
  @media (max-width: 576px) {
    padding: 20px 0px;
  }
`;

const HalfRound = styled.div`
  width: 122px;
  height: 122px;
  position: relative;
  @media (max-width: 768px) {
    width: 63px;
    height: 63px;
  }
  span {
    position: absolute;
    top: 33%;
    left: 9px;
    font-weight: normal;
    font-size: 26px;
    line-height: 42px;
    text-align: center;
    display: block;
    width: 63px;
    color: #000000;
    @media (max-width: 768px) {
      font-size: 10px;
      line-height: 16px;
      top: 36%;
      left: 3px;
      width: 39px;
      font-weight: bold;
    }
  }
`;

const RadialWrap = styled.div`
  display: flex;
  width: 100%;
`;

const DepositItem = styled.div`
  width: 192px;
  position: relative;
  margin: 0 12px 20px;
  @media (max-width: 768px) {
    width: 99px;
  }
  ${UpTitle} {
    margin-bottom: 0;
    margin-right: 10px;
    @media (max-width: 768px) {
      margin-right: 0px;
      &:before {
        margin-right: 4px;
      }
    }
  }
  ${Styled.Radial} {
    position: relative;
    width: 122px;
    height: 122px;
    flex: none;
    margin: 0;
    @media (max-width: 768px) {
      width: 63px;
      height: 63px;
      border-width: 3px;
    }
    span {
      font-size: 16px;
      line-height: 20px;
      text-align: right;
      color: #000000;
      @media (max-width: 768px) {
        font-size: 9px;
        line-height: 14px;
      }
    }

    &:nth-child(1) {
      left: 0;
      bottom: 0;
      display: none;
      z-index: 5;
      align-items: flex-start;
    }
    &:nth-child(2) {
      right: 0;
      bottom: 0;
      position: absolute;
      z-index: 50;
      background: #fff;
    }
  }
`;

const DepositItemWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const DepositItemInner = styled.div`
  width: 50%;
`;

const MySwiperContainer = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
  @media (max-width: 768px) {
    max-width: 500px;
  }
  @media (max-width: 576px) {
    max-width: 280px;
  }
  ${DepositItem} {
    margin: 0 auto 20px;
  }
  .swiper-pagination-bullet {
    display: inline-block;
    width: 10px;
    height: 10px;
    font-size: 14px;
    line-height: 10px;
    background-color: rgba(81, 81, 114, 0.3);
    border-radius: 50%;
    margin-right: 10px;
    margin-top: 20px !important;
  }
  .swiper-pagination-bullet-active {
    background-color: #ff416e;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -4px;
  }
`;