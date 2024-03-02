import React, { useState, useEffect, ChangeEvent } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Button from "@/components/common/button";
import { searchCategoryList } from "@/constants/mock/searchCategoryList";
import DropDown from "@/components/common/dropdown";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  addressKeywordSelector,
  searchPlayerGraderState,
} from "@/recoil/search/searchState";
import { AddressResponseType, UserSimpleInfoType } from "@/types/schedule";
import DatePickerComponent from "@/components/common/datepicker";
import TimePickerComponent from "@/components/common/timepicker";
import Api from "@/api/schedule";
import SearchForm from "@/components/common/searchForm";
import CategoryForm from "@/components/schedule/create/categoryForm";
import PlayerForm from "@/components/schedule/create/playerForm";
import ImageForm from "@/components/schedule/create/imageForm";
import {
  categorySelector,
  imageFilesSelector,
  imageUrlsSelector,
  playerCheckSelector,
  selectCategorySelector,
} from "@/recoil/schedule/scheduleState";
import { getFullDateToString } from "@/utils/dateFormat";
import { showToast } from "@/utils";
import useDebounce from "@/utils/hooks/useDebounce";
import { getTimeFormat } from "@/utils/strFormat";

const CreateSchedule: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [searchGrader, setSearchGrader] = useRecoilState(
    searchPlayerGraderState
  );
  const [searchKeyword, setSearchKeyword] = useRecoilState(
    addressKeywordSelector
  );
  const checkbox = useRecoilValue(playerCheckSelector);
  const [category, setCategory] = useRecoilState(categorySelector);
  const [selectCategory, setSelectCategory] = useRecoilState(
    selectCategorySelector
  );
  const [imageFiles, setImageFiles] = useRecoilState(imageFilesSelector);
  const setImageUrls = useSetRecoilState(imageUrlsSelector);

  const [initDate, setInitDate] = useState<Date>(new Date());
  const [searchDate, setSearchDate] = useState<Date>(new Date());
  const [initStartTime, setInitStartTime] = useState<string>("09:00");
  const [initEndTime, setInitEndTime] = useState<string>("09:00");
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("09:00");
  const [title, setTitle] = useState<string>("");
  const [titleTextCnt, setTitleTextCnt] = useState<number>(0);
  const [previewList, setPreviewList] = useState<Array<AddressResponseType>>(
    []
  );
  const [playerList, setPlayerList] = useState<Array<string>>([]);
  const [playerIdList, setPlayerIdList] = useState<Array<number>>([]);
  const [importantPlayer, setImportantPlayer] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [players, setPlayers] = useState<string>("");

  const debouncedQuery = useDebounce(searchKeyword, 250);

  const onSearchGraderChange = (grader: string) => {
    setSearchGrader(grader);
  };

  const changeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const init = () => {
    setSearchGrader("ALL");
    setPlayerList([]);
    setPlayerIdList([]);
    setSelectCategory(-1);
    setImageFiles([]);
    setSearchKeyword("");
    setImportantPlayer(false);
    setPlayers("");
    setCategory({ id: -1, name: "", colorCode: "" });
  };

  const getTitleTextCnt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 15) {
      setTitle(value);
      setTitleTextCnt(value.length);
    }
  };

  const getSearchAddress = async () => {
    await Api.v1SearchAddress(debouncedQuery).then((res) => {
      const { items } = res.data;
      setPreviewList([...items]);
    });
  };

  const checkPlayer = () => {
    const checkedPlayers = checkbox
      .filter((item) => item.check)
      .map((item) => item.name);

    const checkedPlayerIds = checkbox
      .filter((item) => item.check)
      .map((item) => item.id);

    const newCheckedPlayerIds = [...playerIdList, ...checkedPlayerIds];
    const newCheckedPlayers = [...playerList, ...checkedPlayers];

    setPlayerIdList([...new Set(newCheckedPlayerIds)]);
    setPlayerList([...new Set(newCheckedPlayers)]);
  };

  const isValidationSchedule = (
    title: string,
    categoryId: number,
    playerIds: Array<number>
  ) => {
    if (!title) {
      showToast("일정 이름을 입력하세요.");
      return false;
    }

    if (categoryId === -1) {
      showToast("목록 선택은 필수입니다.");
      return false;
    }

    if (playerIds.length === 0) {
      showToast("선수를 선택해주세요.");
      return false;
    }

    return true;
  };

  const createFormData = () => {
    const formData = new FormData();

    if (imageFiles) {
      imageFiles.forEach((image) => {
        formData.append("file", image);
      });
    }

    return formData;
  };

  const isFormDataEmpty = (formData: FormData) => {
    const entries = formData.entries();
    return entries.next().done;
  };

  const uploadImages = async () => {
    const formData = createFormData();

    if (isFormDataEmpty(formData)) {
      return null;
    }

    try {
      const res = await Api.v1UploadImage("schedule", formData);
      const { status, data } = res;

      if (status === 200 && data?.uploaded) {
        return data.url;
      }
    } catch {
      showToast("이미지 업로드 문제가 발생했습니다.");
    }

    return null;
  };

  const editSchedule = async () => {
    const newTitle = title.trim();
    if (!isValidationSchedule(newTitle, selectCategory, playerIdList)) return;

    const urls = await uploadImages();

    const params = {
      name: title,
      address: searchKeyword,
      calendarCategoryId: selectCategory,
      content: content,
      recordDate: getFullDateToString(searchDate),
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
      images: urls ? urls : [],
      importantYn: importantPlayer,
      playerGrade: searchGrader,
      userIds: playerIdList,
    };

    try {
      await Api.v1UpdateSchedule(Number(id), params).then((res) => {
        const { status } = res;
        if (status == 200) {
          init();
          router.push("/schedule");
          showToast("일정이 정상 수정되었습니다.");
        }
      });
    } catch {
      showToast("일정 입력값을 확인해주세요.");
    }
  };

  const deleteSchedule = async () => {
    try {
      await Api.v1DeleteSchedule(Number(id)).then((res) => {
        const { status } = res;
        if (status === 200) {
          showToast("일정이 삭제되었습니다.");
          router.replace("/schedule");
        }
      });
    } catch {
      showToast("일정 삭제에 실패하였습니다.");
    }
  };

  const getInitSchedule = async () => {
    await Api.v1GetScheduleDetail(Number(id)).then((res) => {
      const {
        address,
        content,
        startTime,
        endTime,
        images,
        name,
        userSimpleInfo,
        importantYn,
      } = res.data;

      const playerArr: Array<string> = [];
      const playerIdArr: Array<number> = [];
      userSimpleInfo.map((item: UserSimpleInfoType) => {
        playerArr.push(item.name);
        playerIdArr.push(item.id);
      });

      setPlayerList(playerArr);
      setPlayerIdList(playerIdArr);
      setSelectCategory(-1);
      setSearchKeyword("");
      setImportantPlayer(importantYn);
      setTitle(name);
      setContent(content);
      setInitStartTime(getTimeFormat(startTime));
      setInitEndTime(getTimeFormat(endTime));
      setImageUrls(images);
    });
  };

  useEffect(() => {
    init();
    getInitSchedule();
  }, []);

  useEffect(() => {
    setSelectCategory(category.id);
  }, [category]);

  useEffect(() => {
    setPlayers(playerList.join(", "));
  }, [playerList]);

  useEffect(() => {
    checkPlayer();
  }, [checkbox]);

  useEffect(() => {
    if (debouncedQuery) getSearchAddress();
  }, [debouncedQuery]);

  return (
    <div className="min-w-[1900px]">
      <Layout>
        <div className="flex items-center space-x-[30px]">
          <h1 className="text-[28px] font-[700]">일정관리</h1>
          <DropDown
            dropDownList={searchCategoryList}
            changeText={onSearchGraderChange}
          />
        </div>
        <div className="flex mt-10 space-x-10">
          <div className="flex flex-col space-y-6 w-[624px]">
            <div className="flex items-center space-x-3">
              <h2 className="text-[20px] font-[700]">일정 기록하기</h2>
              <div
                className="cursor-pointer"
                onClick={() => setImportantPlayer(!importantPlayer)}
              >
                <Image
                  src={
                    importantPlayer
                      ? "/images/star_checked.svg"
                      : "/images/star_unchecked.svg"
                  }
                  width={0}
                  height={0}
                  alt="like button"
                  style={{ width: "24px", height: "auto" }}
                />
              </div>
            </div>
            <CategoryForm />
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between space-x-6 relative">
                <span className="w-10 font-[700] text-[15px]">이름</span>
                <input
                  type="text"
                  value={title}
                  placeholder="일정 이름을 입력하세요."
                  className="w-[684px] h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] focus:border-transparent focus:ring-0"
                  onChange={getTitleTextCnt}
                  maxLength={15}
                />
                <div className="absolute right-4 bottom-2 text-[14px] text-[#B9B9C3] font-[400]">
                  <span>{titleTextCnt}</span>
                  <span>/15</span>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-6">
                <span className="w-10 font-[700] text-[15px]">위치</span>
                <SearchForm
                  search={searchKeyword}
                  searchPreviewList={previewList}
                />
              </div>
              <div className="flex items-center justify-between space-x-6">
                <span className="w-10 font-[700] text-[15px]">시간</span>
                <div className="flex items-center space-x-2">
                  <DatePickerComponent
                    calendarType="free"
                    initDate={initDate}
                    changeDate={setSearchDate}
                  />
                  <div className="flex items-center space-x-1">
                    <TimePickerComponent
                      initTime={initStartTime}
                      changeTime={setStartTime}
                    />
                    <span>~</span>
                    <TimePickerComponent
                      initTime={initEndTime}
                      changeTime={setEndTime}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-6">
                <span className="w-10 font-[700] text-[15px]">선수</span>
                <input
                  type="text"
                  value={players}
                  placeholder="선수를 선택하세요."
                  className="w-[684px] h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] focus:border-transparent focus:ring-0"
                  readOnly
                />
              </div>
              <ImageForm />
              <div className="flex flex-col space-y-4">
                <span className="font-[700] text-[15px]">훈련내용</span>
                <textarea
                  placeholder="훈련 내용을 입력하세요."
                  className="resize-none py-5 px-4 h-[324px] border-none shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] outline-none focus:border-transparent focus:ring-0 p-0 placeholder:text-[#CBCCCD]"
                  maxLength={1000}
                  value={content}
                  onChange={changeContent}
                ></textarea>
              </div>
              <div className="flex items-center space-x-2 justify-end py-4">
                <Button
                  type="submit"
                  text="삭제"
                  classnames="text-[#8DBE3D] text-[12px] font-[700]"
                  onClick={deleteSchedule}
                />
                <Button
                  type="submit"
                  text="등록"
                  classnames="text-[#8DBE3D] text-[12px] font-[700]"
                  onClick={editSchedule}
                />
              </div>
            </div>
          </div>
          <PlayerForm />
        </div>
      </Layout>
    </div>
  );
};

export default CreateSchedule;
