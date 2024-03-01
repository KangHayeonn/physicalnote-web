import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import DatePickerComponent from "@/components/common/datepicker";
import Button from "@/components/common/button";
import ProfileInfo from "@/components/player/detail/profileInfo";
import AlertInfo from "@/components/player/detail/alertInfo";
import HooperIndexInfo from "@/components/player/detail/hooperIndexInfo";
import InjuryInfo from "@/components/player/detail/InjuryInfo";
import UrineInfo from "@/components/player/detail/urineInfo";
import FeedbackInfo from "@/components/player/detail/feedbackInfo";
import WeeklyAvgInfo from "@/components/player/detail/weeklyAvgInfo";
import BodyCheckInfo from "@/components/player/detail/bodyCheckInfo";
import Api from "@/api/player";
import { getFullDateToString } from "@/utils/dateFormat";
import { useRecoilState } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import { playerDetail } from "@/constants/mock/player";

const ManagePlayerDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [initDate, setInitDate] = useState<Date>(new Date());
  const [searchDate, setSearchDate] = useState<Date>(new Date());

  const [playerData, setPlayerData] = useRecoilState(playerDetailSelector);

  const toggleDate = (type: string) => {
    const today = new Date();

    if (type === "lastWeek") {
      const lastWeek = today.setDate(today.getDate() - 7);
      setInitDate(new Date(lastWeek));
    }

    if (type === "yesterday") {
      const yesterday = today.setDate(today.getDate() - 1);
      setInitDate(new Date(yesterday));
    }

    if (type === "today") {
      setInitDate(today);
    }
  };

  const getPlayerDetail = async () => {
    setPlayerData(playerDetail);
    /*await Api.v1GetPlayerDetail(
      Number(id),
      getFullDateToString(searchDate)
    ).then((res) => console.log(res.data));*/
  };

  const init = () => {
    setInitDate(new Date());
  };

  useEffect(() => {
    getPlayerDetail();
  }, [searchDate]);

  return (
    <div className="min-w-[2000px]">
      <Layout>
        <div className="flex items-center space-x-[30px]">
          <h1 className="text-[28px] font-[700]">선수관리</h1>{" "}
        </div>
        <div className="flex items-center justify-end space-x-2 mb-10">
          <Button
            type="button"
            text="지난주"
            classnames="h-[36px] px-4 text-[#8DBE3D] text-[13px] font-[700]"
            onClick={() => toggleDate("lastWeek")}
          />
          <Button
            type="button"
            text="어제"
            classnames="h-[36px] px-4 text-[#8DBE3D] text-[13px] font-[700]"
            onClick={() => toggleDate("yesterday")}
          />
          <Button
            type="button"
            text="오늘"
            classnames="h-[36px] px-4 text-[#8DBE3D] text-[13px] font-[700]"
            onClick={() => toggleDate("today")}
          />
          <DatePickerComponent
            calendarType="free"
            initDate={initDate}
            changeDate={setSearchDate}
          />
          <Button
            type="button"
            text="초기화"
            classnames="h-[36px] px-4 text-[#000] text-[13px] font-[700]"
            onClick={init}
          />
        </div>
        <div className="space-y-8">
          <div className="flex flex-col space-y-2">
            <div className="w-full flex space-x-10">
              <ProfileInfo />
              <AlertInfo />
            </div>
          </div>
          <div className="flex flex-col space-y-7">
            <div className="text-[20px] font-[700]">일일 체크</div>
            <div className="w-full flex space-x-10">
              <HooperIndexInfo />
              <InjuryInfo />
              <UrineInfo />
            </div>
            <div className="w-full flex space-x-10">
              <FeedbackInfo />
              <div className="w-[295px]"></div>
            </div>
          </div>
          <div className="flex flex-col space-y-7">
            <div className="text-[20px] font-[700]">주간 항목별 평균</div>
            <div className="w-full flex space-x-10">
              <WeeklyAvgInfo />
              <BodyCheckInfo />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ManagePlayerDetail;
