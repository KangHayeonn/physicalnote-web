import { NextPage } from "next";
import Layout from "@/components/layout";
import { Box, Slider, styled } from "@mui/material";
import Item from "@/components/common/item";
import AxisWithComposition from "@/components/common/axisWithComposition";
import Search from "@/components/common/search";
import {
  BarChart,
  BarPlot,
  ChartContainer,
  LineChart,
  ResponsiveChartContainer,
} from "@mui/x-charts";

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const Dashboard: NextPage = () => {
  // 슬라이드
  const marks = [
    {
      value: 4,
      label: "4",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 14,
      label: "14",
    },
    {
      value: 21,
      label: "21이상",
    },
  ];

  function valuetext(value: number) {
    return `${value}`;
  }

  // 그래프 (트레이닝 밸런스)
  const uData = [4000, 3000, 2000, 2780];
  const xLabels = ["이번주", "저번주", "지난4주", "지난8주"];

  // 그래프 (훈련부하)
  const monthsData = {
    "6월": [
      {
        type: "line",
        curve: "linear",
        // id: 'cookies',
        yAxisKey: "quantities",
        data: [1, 6, 4, 20],
      },
      {
        type: "bar",
        // id: 'icecream',
        yAxisKey: "quantities",
        data: [1, 6, 4, 20],
        color: "#C6E19B",
      },
    ],
    "7월": [
      {
        type: "line",
        curve: "linear",
        // id: 'cookies',
        yAxisKey: "quantities",
        data: [1, 10, 20, 5],
      },
      {
        type: "bar",
        // id: 'icecream',
        yAxisKey: "quantities",
        data: [1, 6, 4, 5],
        color: "#C6E19B",
      },
    ],
    "8월": [
      {
        type: "line",
        curve: "linear",
        // id: 'cookies',
        yAxisKey: "quantities",
        data: [1, 10, 20, 5],
      },
      {
        type: "bar",
        // id: 'icecream',
        yAxisKey: "quantities",
        data: [1, 6, 4, 5],
        color: "#C6E19B",
      },
    ],
  };

  // X축 데이터와 seriesData를 생성합니다.
  const xAxisData = [];
  const seriesData = [];

  Object.keys(monthsData).forEach((month) => {
    const monthData = monthsData[month];

    for (let i = 1; i <= 4; i++) {
      xAxisData.push(`${month}-${i}주차`);
    }

    monthData.forEach((data) => {
      data.data.forEach((weekData, i) => {
        seriesData.push({
          type: data.type,
          curve: data.curve,
          yAxisKey: data.yAxisKey,
          data: [weekData],
          name: `${month}-${i + 1}주차`,
          color: data.color,
        });
      });
    });
  });

  // const xAxisData = ["1주차", "2주차", "3주차", "4주차", "금", "토", "일"];

  // const seriesData = [
  //   // {
  //   //   type: "bar",
  //   //   // id: "revenue",
  //   //   yAxisKey: "money",
  //   //   data: [4, 20, 12, 25],
  //   //   color: "#4e79a7",
  //   // },
  //   // {
  //   //   type: "bar",
  //   //   // id: "revenue",
  //   //   yAxisKey: "money",
  //   //   data: [4, 10, 20, 18],
  //   //   color: "#efefef",
  //   // },
  //   {
  //     type: "line",
  //     curve: "linear",
  //     // id: 'cookies',
  //     yAxisKey: "quantities",
  //     data: [1, 6, 4, 5],
  //   },
  //   {
  //     type: "bar",
  //     // id: 'icecream',
  //     yAxisKey: "quantities",
  //     data: [1, 6, 4, 5],
  //     color: "#C6E19B",
  //   },
  // ];

  const yAxisIds = [{ id: "money" }, { id: "quantities" }];

  return (
    <div className="min-w-[1820px]">
      <Layout>
        <div className="flex items-center space-x-[30px]">
          <h1 className="text-[28px] font-[700]">대시보드</h1>
          {/* <select className="w-[127px] h-[25px] rounded-[5px] py-0 border-[#B9B9C3] text-[12px] font-[700] shadow-xl">
          <option value="">구분</option>
          <option value="first">1군</option>
          <option value="second">2군</option>
          <option value="second">부상자</option>
        </select> */}
        </div>
        <Search />
        <div className="space-y-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-[20px] font-[500]">팀 컨디션</h2>
            <div className="grid grid-cols-12 space-x-10">
              <div className="flex flex-col col-span-5 space-y-4">
                <div className="flex itmes-center space-x-24">
                  <div className="flex flex-col space-y-2">
                    <span className="text-[15px] font-[400]">
                      ■ 훈련준비 상태
                    </span>
                    <div className="w-full">
                      <Box sx={{ width: 300 }}>
                        <PrettoSlider
                          // aria-label="Temperature"
                          defaultValue={11}
                          getAriaValueText={valuetext}
                          valueLabelDisplay="auto"
                          step={1}
                          marks={marks}
                          min={4}
                          max={21}
                          // disabled
                        />
                      </Box>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-col items-center divide-dotted divide-y-2">
                      <div className="py-2 text-[12px] font-[400] space-x-4">
                        <span>등록선수</span>
                        <span>:</span>
                        <span>08명</span>
                      </div>
                      <div className="py-2 text-[12px] font-[400] space-x-4">
                        <span>미등록선수</span>
                        <span>:</span>
                        <span>14명</span>
                      </div>
                    </div>
                    <button className="bg-white shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] w-[170px] h-[25px] flex justify-center items-center space-x-2">
                      <span className="text-[12px] text-[#8DBE3D] font-[400]">
                        미등록 선수(14명) 알림
                      </span>
                      <span>
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 6.70833C0 5.31944 0.309028 4.04514 0.927083 2.88542C1.54514 1.72569 2.375 0.763889 3.41667 0L4.39583 1.33333C3.5625 1.94444 2.89931 2.71528 2.40625 3.64583C1.91319 4.57639 1.66667 5.59722 1.66667 6.70833H0ZM15 6.70833C15 5.59722 14.7535 4.57639 14.2604 3.64583C13.7674 2.71528 13.1042 1.94444 12.2708 1.33333L13.25 0C14.2917 0.763889 15.1215 1.72569 15.7396 2.88542C16.3576 4.04514 16.6667 5.31944 16.6667 6.70833H15ZM1.66667 14.2083V12.5417H3.33333V6.70833C3.33333 5.55556 3.68056 4.53125 4.375 3.63542C5.06945 2.73958 5.97222 2.15278 7.08333 1.875V1.29167C7.08333 0.944444 7.20486 0.649306 7.44792 0.40625C7.69097 0.163194 7.98611 0.0416667 8.33333 0.0416667C8.68056 0.0416667 8.9757 0.163194 9.21875 0.40625C9.46181 0.649306 9.58333 0.944444 9.58333 1.29167V1.875C10.6944 2.15278 11.5972 2.73958 12.2917 3.63542C12.9861 4.53125 13.3333 5.55556 13.3333 6.70833V12.5417H15V14.2083H1.66667ZM8.33333 16.7083C7.875 16.7083 7.48264 16.5451 7.15625 16.2188C6.82986 15.8924 6.66667 15.5 6.66667 15.0417H10C10 15.5 9.83681 15.8924 9.51042 16.2188C9.18403 16.5451 8.79167 16.7083 8.33333 16.7083ZM5 12.5417H11.6667V6.70833C11.6667 5.79167 11.3403 5.00694 10.6875 4.35417C10.0347 3.70139 9.25 3.375 8.33333 3.375C7.41667 3.375 6.63195 3.70139 5.97917 4.35417C5.32639 5.00694 5 5.79167 5 6.70833V12.5417Z"
                            fill="#8DBE3D"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-24">
                  <div className="flex flex-col space-y-2">
                    <span className="text-[15px] font-[400]">
                      ■ 수분섭취 상태
                    </span>
                    <div className="w-full">
                      <Box sx={{ width: 300 }}>
                        <PrettoSlider
                          // aria-label="Temperature"
                          defaultValue={7}
                          getAriaValueText={valuetext}
                          valueLabelDisplay="auto"
                          step={1}
                          marks={marks}
                          min={4}
                          max={21}
                          // disabled
                        />
                      </Box>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-col items-center divide-dotted divide-y-2">
                      <div className="py-2 text-[12px] font-[400] space-x-4 flex justify-between items-center">
                        <span>등록선수</span>
                        <span>:</span>
                        <span>08명</span>
                      </div>
                      <div className="py-2 text-[12px] font-[400] space-x-4">
                        <span>미등록선수</span>
                        <span>:</span>
                        <span>14명</span>
                      </div>
                    </div>
                    <button className="bg-white shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] w-[170px] h-[25px] flex justify-center items-center space-x-2">
                      <span className="text-[12px] text-[#8DBE3D] font-[400]">
                        미등록 선수(14명) 알림
                      </span>
                      <span>
                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 17 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 6.70833C0 5.31944 0.309028 4.04514 0.927083 2.88542C1.54514 1.72569 2.375 0.763889 3.41667 0L4.39583 1.33333C3.5625 1.94444 2.89931 2.71528 2.40625 3.64583C1.91319 4.57639 1.66667 5.59722 1.66667 6.70833H0ZM15 6.70833C15 5.59722 14.7535 4.57639 14.2604 3.64583C13.7674 2.71528 13.1042 1.94444 12.2708 1.33333L13.25 0C14.2917 0.763889 15.1215 1.72569 15.7396 2.88542C16.3576 4.04514 16.6667 5.31944 16.6667 6.70833H15ZM1.66667 14.2083V12.5417H3.33333V6.70833C3.33333 5.55556 3.68056 4.53125 4.375 3.63542C5.06945 2.73958 5.97222 2.15278 7.08333 1.875V1.29167C7.08333 0.944444 7.20486 0.649306 7.44792 0.40625C7.69097 0.163194 7.98611 0.0416667 8.33333 0.0416667C8.68056 0.0416667 8.9757 0.163194 9.21875 0.40625C9.46181 0.649306 9.58333 0.944444 9.58333 1.29167V1.875C10.6944 2.15278 11.5972 2.73958 12.2917 3.63542C12.9861 4.53125 13.3333 5.55556 13.3333 6.70833V12.5417H15V14.2083H1.66667ZM8.33333 16.7083C7.875 16.7083 7.48264 16.5451 7.15625 16.2188C6.82986 15.8924 6.66667 15.5 6.66667 15.0417H10C10 15.5 9.83681 15.8924 9.51042 16.2188C9.18403 16.5451 8.79167 16.7083 8.33333 16.7083ZM5 12.5417H11.6667V6.70833C11.6667 5.79167 11.3403 5.00694 10.6875 4.35417C10.0347 3.70139 9.25 3.375 8.33333 3.375C7.41667 3.375 6.63195 3.70139 5.97917 4.35417C5.32639 5.00694 5 5.79167 5 6.70833V12.5417Z"
                            fill="#8DBE3D"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-span-7 flex flex-col space-y-2">
                <span className="text-[15px] font-[400]">■ 관찰대상</span>
                <div className="grid grid-cols-6 gap-10">
                  {[1, 1, 1, 1, 1, 1].map((el, idx) => (
                    <Item key={idx} position="미드필더" name="홍길동" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="grid grid-cols-12 space-x-10">
              <div className="flex flex-col col-span-5 space-y-4">
                <h2 className="text-[20px] font-[500]">부상자 현황</h2>
                <div className="flex flex-col space-y-2">
                  <span className="text-[15px] font-[400]">
                    ■ 총 부상자 : 00명
                  </span>
                </div>
                <div className="w-full grid grid-cols-4">
                  {[1, 1, 1, 1].map((el, idx) => (
                    <Item key={idx} position="미드필더/공격수" name="홍길동" />
                  ))}
                </div>
              </div>
              <div className="flex flex-col col-span-7 space-y-4">
                <div className="flex items-center space-x-4">
                  <h2 className="text-[20px] font-[500]">훈련계획</h2>
                  <button className="bg-white shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] w-[133px] h-[25px] flex justify-center items-center space-x-2">
                    <span className="text-[12px] text-[#8DBE3D] font-[400]">
                      일정 알림 보내기
                    </span>
                    <span>
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 6.70833C0 5.31944 0.309028 4.04514 0.927083 2.88542C1.54514 1.72569 2.375 0.763889 3.41667 0L4.39583 1.33333C3.5625 1.94444 2.89931 2.71528 2.40625 3.64583C1.91319 4.57639 1.66667 5.59722 1.66667 6.70833H0ZM15 6.70833C15 5.59722 14.7535 4.57639 14.2604 3.64583C13.7674 2.71528 13.1042 1.94444 12.2708 1.33333L13.25 0C14.2917 0.763889 15.1215 1.72569 15.7396 2.88542C16.3576 4.04514 16.6667 5.31944 16.6667 6.70833H15ZM1.66667 14.2083V12.5417H3.33333V6.70833C3.33333 5.55556 3.68056 4.53125 4.375 3.63542C5.06945 2.73958 5.97222 2.15278 7.08333 1.875V1.29167C7.08333 0.944444 7.20486 0.649306 7.44792 0.40625C7.69097 0.163194 7.98611 0.0416667 8.33333 0.0416667C8.68056 0.0416667 8.9757 0.163194 9.21875 0.40625C9.46181 0.649306 9.58333 0.944444 9.58333 1.29167V1.875C10.6944 2.15278 11.5972 2.73958 12.2917 3.63542C12.9861 4.53125 13.3333 5.55556 13.3333 6.70833V12.5417H15V14.2083H1.66667ZM8.33333 16.7083C7.875 16.7083 7.48264 16.5451 7.15625 16.2188C6.82986 15.8924 6.66667 15.5 6.66667 15.0417H10C10 15.5 9.83681 15.8924 9.51042 16.2188C9.18403 16.5451 8.79167 16.7083 8.33333 16.7083ZM5 12.5417H11.6667V6.70833C11.6667 5.79167 11.3403 5.00694 10.6875 4.35417C10.0347 3.70139 9.25 3.375 8.33333 3.375C7.41667 3.375 6.63195 3.70139 5.97917 4.35417C5.32639 5.00694 5 5.79167 5 6.70833V12.5417Z"
                          fill="#8DBE3D"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-2 space-x-5">
                  <div className="flex space-x-8">
                    <div className="flex flex-col space-y-4">
                      <span className="text-[15px] font-[400]">■ 시간</span>
                      <div className="flex flex-col justify-between space-y-10 h-full">
                        <div className="w-[195px] h-[42px] text-[15px] font-[400] flex justify-center items-center rounded-[20px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                          필드 - 09:30 ~ 11:00
                        </div>
                        <div className="w-[195px] h-[42px] text-[15px] font-[400] flex justify-center items-center rounded-[20px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                          피지컬 - 14:30 ~ 15:00
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <span className="text-[15px] font-[400]">■ 장소</span>
                      <div className="flex flex-col justify-between space-y-10 h-full">
                        <div className="w-[195px] h-[42px] text-[15px] font-[400] flex justify-center items-center rounded-[20px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                          강릉종합운동장
                        </div>
                        <div className="w-[195px] h-[42px] text-[15px] font-[400] flex justify-center items-center rounded-[20px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                          파워베이스
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1">
                    <div className="flex flex-col space-y-4">
                      <span className="text-[15px] font-[400]">
                        ■ 훈련상세계획
                      </span>
                      <div className="flex flex-col space-y-8">
                        <div className="flex items-center justify-between space-x-2">
                          <div className="py-[10px] px-[20px] text-[15px] font-[400] flex-1 flex justify-start items-center rounded-[20px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                            전술훈련을 해야된당 저기서 저기로 가는 훈련
                            <br />
                            전술훈련을 해야된당 저기서 저기로 가는 훈련
                            <br />
                            전술훈련을 해야된당 저기서 저기로 가는 훈련
                          </div>
                          <button
                            className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-1 px-3 rounded-[5px] text-[12px] text-[#8DBE3D] font-[700]"
                            type="button"
                          >
                            수정
                          </button>
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                          <div className="py-[10px] px-[20px] flex-1 h-[42px] text-[15px] font-[400] flex justify-start items-center rounded-[20px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                            하체훈련
                          </div>
                          <button
                            className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-1 px-3 rounded-[5px] text-[12px] text-[#8DBE3D] font-[700]"
                            type="button"
                          >
                            수정
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-[20px] font-[500]">운동부하 밸런스</h2>
            <div className="grid grid-cols-12 space-x-10">
              <div className="flex flex-col col-span-5 space-y-4">
                <div className="text-[15px] font-[400] space-x-2">
                  <span>■ 주간 트레이닝 부하</span>
                  <em className="text-[12px] text-[#CBCCCD] font-[400] not-italic">
                    (RPE X 운동시간 값)
                  </em>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className="text-[12px] font-[400] mr-4">
                    [2023년 10월 2주차]
                  </span>
                  <div className="w-full rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                    {/* <AxisWithComposition
                    xAxisData={xAxisData}
                    seriesData={seriesData}
                    yAxisIds={yAxisIds}
                    height={260}
                    margin={{ left: 40, right: 40 }}
                  /> */}
                    <LineChart
                      height={260}
                      xAxis={[
                        {
                          scaleType: "point",
                          data: [
                            "월(1일)",
                            "화(2일)",
                            "수(3일)",
                            "목(4일)",
                            "금(5일)",
                            "토(6일)",
                            "일(7일)",
                          ],
                        },
                      ]}
                      series={[
                        {
                          type: "line",
                          curve: "linear",
                          data: [125, 100, 150, 175, 125, 75, 0],
                          color: "#8DBE3D",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="flex col-span-7 space-x-10">
                <div className="grid grid-rows-1 w-[457px]">
                  <div className="text-[15px] font-[400] space-x-2">
                    <span>■ 트레이닝 밸런스</span>
                    <em className="text-[12px] text-[#CBCCCD] font-[400] not-italic">
                      (주 단위 평균 값)
                    </em>
                  </div>
                  <div className="w-full rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                    <BarChart
                      width={450}
                      height={260}
                      series={[
                        {
                          data: uData,
                          type: "bar",
                          color: "#C6E19B",
                        },
                      ]}
                      xAxis={[
                        {
                          scaleType: "band",
                          data: xLabels,
                          categoryGapRatio: 0.6,
                        },
                      ]}
                      leftAxis={null}
                    />
                  </div>
                </div>
                <div className="grid grid-rows-1 w-[404px]">
                  <span className="text-[15px] font-[400]">■ 비고</span>
                  <div className="flex flex-col justify-between w-full p-5 h-[260px] rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] text-[15px] font-[400]">
                    <p>
                      전술훈련
                      <br />* 전술 훈련에 대한 비고사항
                    </p>
                    <div className="text-right">
                      <button
                        className="shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-1 px-3 rounded-[5px] text-[12px] text-[#8DBE3D] font-[700]"
                        type="button"
                      >
                        저장
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="grid grid-cols-12 space-x-10">
              <div className="flex flex-col col-span-12 space-y-4">
                <span className="text-[15px] font-[400] space-x-2">
                  ■ 훈련부하 모니터링
                </span>
                <div className="space-y-3">
                  <div className="ml-4 text-[15px] font-[400] space-x-4">
                    <span>TSB Traning load</span>
                    <em className="text-[#CBCCCD] not-italic">
                      TSB Traning Duration
                    </em>
                  </div>
                  <div className="rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]">
                    <AxisWithComposition
                      xAxisData={xAxisData}
                      seriesData={seriesData}
                      yAxisIds={yAxisIds}
                      height={260}
                      margin={{ left: 40, right: 40 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
