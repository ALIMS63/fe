import React, { useContext, useState, useEffect, FC } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Container } from '../../../../components/UI/Container';
import { LeftIcon } from '../../../PrivateArea/Styles.elements';
import * as S from './S.elements';
import { Collection, RootChange } from '../../../../types/currency';
import moment from 'moment';
import 'moment/locale/ru';
import momenttz from 'moment-timezone';
import { ReactComponent as Arrow } from '../../../../assets/v2/svg/arrow-exchange.svg';
import { SmallChart } from './SmallChart';
import useWindowSize from '../../../../hooks/useWindowSize';
import { Dropdown } from './components/Dropdown';
import { MobChart } from './MobChart';

require('highcharts/modules/exporting')(Highcharts);

function opt(H: any) {
  H.setOptions({
    lang: {
      loading: 'Загрузка...',
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      shortMonths: [
        'Янв',
        'Фев',
        'Март',
        'Апр',
        'Май',
        'Июнь',
        'Июль',
        'Авг',
        'Сент',
        'Окт',
        'Нояб',
        'Дек',
      ],
    },
    credits: {
      enabled: false,
    },
  });
}

function opt1(H: any) {
  H.setOptions({
    lang: {
      loading: 'Загрузка...',
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      shortMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    credits: {
      enabled: false,
    },
  });
}

type Props = {
  data: Collection[];
  type: string;
  fetchMGCWD: (d: string) => void;
  fetchGCWD: (d: string) => void;
  fetchDIAMOND: (d: string) => void;
  fetchGLOBAL: (d: string) => void;
};

export const ChartActiv: FC<Props> = ({
  data,
  type,
  fetchMGCWD,
  fetchGCWD,
  fetchDIAMOND,
  fetchGLOBAL,
}: Props) => {
  localStorage.getItem('i18nextLng') === 'ru' ? opt(Highcharts) : opt1(Highcharts);
  moment.locale(localStorage.getItem('i18nextLng') || 'ru');
  const size = useWindowSize();
  const data1 = () => {
    if (type === 'GCWD') {
      return data.map((i) => [
        momenttz.utc(i.date).tz('Europe/Moscow').valueOf(),
        i.latestBid / 100000,
      ]);
    } else if (type === 'MGCWD') {
      return data.map((i) => [
        momenttz.utc(i.date).tz('Europe/Moscow').valueOf(),
        i.latestBid / 100000,
      ]);
    } else if (type === 'DIAMOND') {
      return data.map((i) => [
        momenttz.utc(i.date).tz('Europe/Moscow').valueOf(),
        i.latestBid / 1000,
      ]);
    } else {
      return data.map((i) => [momenttz.utc(i.date).tz('Europe/Moscow').valueOf(), i.latestBid]);
    }
  };

  const [chartData, setChartData] = useState<number[][]>();

  useEffect(() => {
    if (!data) return;
    setChartData(data1());
  }, [data]);

  const [date, setDate] = useState(0);

  const [valCWD, setValCWD] = useState(0);

  const state = {
    options: {
      series: [
        {
          data: data1(),
          color: '#0094FF',
          // type: 'line',
        },
      ],
      chart: {
        marginLeft: 50,
        marginRight: 5,
        // backgroundColor: '#F7F8FA',
        height: 345,
        // spacingTop: 50,
        spacingBottom: 0,
        // events: {
        //   load: function (e: any) {
        //     e.get('highcharts-navigator-series').show();
        //   },
        // },
      },
      legend: {
        enabled: false,
      },
      title: {
        text: '',
      },
      tooltip: {
        borderRadius: 4,
        shape: 'rect',
        crosshairs: true,
        padding: 10,
        backgroundColor: '#fff',
        // enabled: false,
        formatter: function () {
          return `
          <b style="font-size: 18px; font-weight: bold; line-height: 24px; font-family: 'Roboto', sans-serif; color: #3F3E4E;">${
            (this as any).y
          }  CWD </b> <br/> <b style="font-size: 12px; font-weight: normal; line-height: 14px; font-family: 'Roboto', sans-serif; color: #000000">${moment(
            (this as any).x
          ).format('DD.MM.YYYY, dddd, HH:mm')} MCK</b>
          
          `;
        },
      },
      plotOptions: {
        series: {
          lineWidth: 2,
          marker: {
            enabled: false,
            fillColor: ' #3F3E4E',
            lineWidth: 2,
            lineColor: '#DCDCE8',
            radius: 3,
            states: {
              hover: {
                fillColor: '#3F3E4E',
                lineWidth: 2,
                lineColor: '#DCDCE8',
              },
            },
          },
        },
      },
      rangeSelector: {
        enabled: false,
        buttonPosition: {
          align: 'right',
          x: 0,
          y: 0,
        },
        buttonSpacing: 10,
        labelStyle: {
          visibility: 'hidden',
        },
      },
      scrollbar: {
        enabled: false,
      },
      navigator: {
        enabled: true,
        adaptToUpdatedData: false,
        maskFill: 'rgba(0, 148, 255, 0.2)',
        maskInside: true,
        outlineWidth: 0,
        marginBottom: 0,
        handles: {
          backgroundColor: '#FFFFFF',
          borderColor: '#9E9EB8',
        },
        series: {
          id: 'nav',
          type: 'areaspline',
          fillOpacity: 0.1,
          lineWidth: 0,
        },
        credits: {
          enabled: true,
        },
        xAxis: {
          gridLineWidth: 0,
          height: 10,
          top: 0,
          tickColor: '#DCDCE8',
          lineColor: '#fff',
          gridLineColor: '#FF0000',
          lineWidth: 0,
          width: '100%',
          labels: {
            style: {
              color: '#888',
            },
            y: -15,
          },
          dateTimeLabelFormats: {
            day: '%e  %b',
          },
        },
        yAxis: {
          lineColor: '#fff',
          gridLineWidth: 0,
          dateTimeLabelFormats: {
            day: {
              main: '%e %b',
            },
          },
          plotBands: [
            {
              color: 'rgba(115, 113, 115, 0.2)',
              from: 0,
              to: 1,
            },
          ],
        },
      },
      exporting: { enabled: false },
      yAxis: {
        left: size < 768 ? '100%' : 0,
        opposite: false,
        gridLineDashStyle: 'Dash',
        labels: {
          align: 'left',
          x: 0,
          y: -2,
        },
        plotBands: [
          {
            color: 'rgba(68, 170, 213, 0.2)',
            label: {
              text: '',
            },
          },
        ],
      },
      xAxis: {
        ordinal: false,
        startOnTick: false,
        type: 'datetime',
        min: null,
        max: null,
        title: {
          text: '',
        },
        tickColor: '#DCDCE8',
        lineColor: '#F7F8FA',
        dateTimeLabelFormats: {
          day: {
            main: '%e %b',
          },
        },
        crosshair: {
          color: '#DCDCE8',
          // dashStyle:Solid,
          snap: true,
          width: 3,
          zIndex: 2,
        },
        labels: {
          style: {
            color: '#3F3E4E',
          },
        },
      },
      time: {
        useUTC: false,
        getTimezoneOffset: function (timestamp: any) {
          const zone = 'Europe/Moscow';
          const timezoneOffset = -moment.tz(timestamp, zone).utcOffset();
          return timezoneOffset;
        },
      },
    },
  };

  const [dateState, setDateState] = useState<any>({});

  useEffect(() => {
    setDateState(null);
    if (!data) return;
    setDateState(state);
  }, [data]);

  const btns = ['День', 'Месяц', 'Квартал', 'Год', 'Все время'];

  const [selected, setSelected] = useState(btns[0]);
  const [active, setActive] = useState('День');

  const changeValue = (data: Collection[]) => {
    const currValue = data[data.length - 1].latestBid;

    const filterPrevValues = data.filter((item) => item.latestBid !== currValue);
    const value =
      ((currValue - filterPrevValues[filterPrevValues.length - 1].latestBid) / currValue) * 100;
    if (value > 0) {
      return (
        <S.Price green>
          <Arrow />
          {value.toFixed(2)} &nbsp;%
        </S.Price>
      );
    } else {
      return (
        <S.Price red>
          <Arrow />
          {value.toFixed(2)}&nbsp;%
        </S.Price>
      );
    }
  };

  const typesBalanceInfo = (type: string) => {
    switch (type) {
      case 'GCWD':
        return (
          <S.PriceChangesWrap>
            <S.PriceChanges>
              <S.Price>GCWD - CWD</S.Price>&nbsp;
              <S.Price>
                {(data[data.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })}
              </S.Price>
              {changeValue(data)}
            </S.PriceChanges>
            <S.Date>
              {momenttz
                .utc(data[data.length - 1].date)
                .tz('Europe/Moscow')
                .format('DD.MM.YYYY, dddd, HH:mm')}
              MCK
            </S.Date>
          </S.PriceChangesWrap>
        );
      case 'MGCWD':
        return (
          <S.PriceChangesWrap>
            <S.PriceChanges>
              <S.Price>MGCWD - CWD</S.Price>&nbsp;
              <S.Price>
                {(data[data.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })}
              </S.Price>
              {changeValue(data)}
            </S.PriceChanges>
            <S.Date>
              {momenttz
                .utc(data[data.length - 1].date)
                .tz('Europe/Moscow')
                .format('DD.MM.YYYY, dddd, HH:mm')}{' '}
              MCK
            </S.Date>
          </S.PriceChangesWrap>
        );
      case 'DIAMOND':
        return (
          <S.PriceChangesWrap>
            <S.PriceChanges>
              <S.Price>DIAMOND - CWD</S.Price>&nbsp;
              <S.Price>
                {(data[data.length - 1].latestBid / 100).toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })}
              </S.Price>
              {changeValue(data)}
            </S.PriceChanges>
            <S.Date>
              {momenttz
                .utc(data[data.length - 1].date)
                .tz('Europe/Moscow')
                .format('DD.MM.YYYY, dddd, HH:mm')}{' '}
              MCK
            </S.Date>
          </S.PriceChangesWrap>
        );
      case 'GLOBAL':
        return (
          <S.PriceChangesWrap>
            <S.PriceChanges>
              <S.Price>GLOBAL - CWD</S.Price>&nbsp;
              <S.Price>
                {(data[data.length - 1].latestBid / 10000).toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })}
              </S.Price>
              {changeValue(data)}
            </S.PriceChanges>
            <S.Date>
              {momenttz
                .utc(data[data.length - 1].date)
                .tz('Europe/Moscow')
                .format('DD.MM.YYYY, dddd, HH:mm')}{' '}
              MCK
            </S.Date>
          </S.PriceChangesWrap>
        );
    }
  };

  const returnValues = () => {
    switch (type) {
      case 'GCWD':
        return (data[data.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
          maximumFractionDigits: 2,
        });
      case 'MGCWD':
        return (data[data.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
          maximumFractionDigits: 2,
        });
      case 'DIAMOND':
        return (data[data.length - 1].latestBid / 100).toLocaleString('ru-RU', {
          maximumFractionDigits: 2,
        });
      case 'GLOBAL':
        return (data[data.length - 1].latestBid / 10000).toLocaleString('ru-RU', {
          maximumFractionDigits: 2,
        });
    }
  };

  const dateFetch = (day: string) => {
    switch (day) {
      case 'День':
        return moment().subtract(1, 'days').format();
      case 'Месяц':
        return moment().subtract(1, 'months').format();
      case 'Квартал':
        return moment().subtract(3, 'months').format();
      case 'Год':
        return moment().subtract(1, 'years').format();
      case 'Все время':
        return moment().subtract(1, 'years').format();
      default:
        return moment().subtract(1, 'days').format();
    }
  };

  const typeSelected = (str: string) => {
    setActive(str);
    setSelected(str);
    if (type === 'GCWD') {
      console.log('gcwd');
      fetchGCWD(dateFetch(str));
    } else if (type === 'MGCWD') {
      fetchMGCWD(dateFetch(str));
    } else if (type === 'DIAMOND') {
      fetchDIAMOND(dateFetch(str));
    } else if (type === 'GLOBAL') {
      fetchGLOBAL(dateFetch(str));
    }
  };

  return (
    <>
      <S.ChartContainer>
        <S.ChartHeader>
          {data.length ? typesBalanceInfo(type) : null}

          <S.ButtonsList>
            <Dropdown selected={selected} setSelected={typeSelected} options={btns} />
          </S.ButtonsList>
          <S.MobTooltips>
            <S.TooltipsDate>
              {date > 1
                ? momenttz
                    .utc(moment(date).format('DD.MM.YYYY'))
                    .tz('Europe/Moscow')
                    .format('DD.MM.YYYY, dd, HH:mm')
                : data.length
                ? momenttz
                    .utc(data[data.length - 1].date)
                    .tz('Europe/Moscow')
                    .format('DD.MM.YYYY, dd, HH:mm')
                : null}
              &nbsp; MCK
            </S.TooltipsDate>
            <S.TooltipsValue>
              {valCWD ? valCWD.toLocaleString() : data.length ? returnValues() : 0} CWD
            </S.TooltipsValue>
          </S.MobTooltips>
          <S.Buttons>
            {btns.map((i) => (
              <S.Button active={i === active} key={i} onClick={() => typeSelected(i)}>
                {i}
              </S.Button>
            ))}
          </S.Buttons>
        </S.ChartHeader>
        <S.MobChartBlock mob>
          <MobChart data={data1()} setDate={setDate} setValCWD={setValCWD} />
        </S.MobChartBlock>
        <S.MobChartBlock>
          <HighchartsReact
            // constructorType={'stockChart'}
            highcharts={Highcharts}
            options={state.options}
          />
        </S.MobChartBlock>
      </S.ChartContainer>
    </>
  );
};
