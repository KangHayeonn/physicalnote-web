import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { DailyScheduleProps } from "@/types/schedule";
import MuiCarousel from "react-material-ui-carousel";

const DailyScheduleItem = ({
  id,
  name,
  categoryName,
  categoryColorCode,
  address,
  workoutTime,
  player,
  content,
  images,
}: DailyScheduleProps) => {
  const router = useRouter();
  const tempImages = [
    "/images/schedule_image1.svg",
    "/images/schedule_image2.svg",
  ];

  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const goEdit = () => {
    if (id) {
      router.push(`/schedule/create/${id.toString()}`);
    }
  };

  return (
    <div className="cursor-pointer shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[20px] w-full h-[300px] flex flex-col space-y-2 py-3 px-5">
      <div className="w-full flex justify-around items-center">
        <div className="w-full flex justify-start items-center space-x-1">
          <div
            className="text-[15px] font-[700] px-3"
            style={{ backgroundColor: `${categoryColorCode}` }}
          >
            {categoryName}
          </div>
        </div>
        <div onClick={goEdit}>
          <Image
            src="/icons/edit_gray.svg"
            width={0}
            height={0}
            alt="important icon"
            style={{ width: "16px", height: "auto" }}
          />
        </div>
      </div>
      <div className="h-[112px] overflow-y-scroll flex flex-col text-[15px]">
        <div className="flex space-x-1">
          <span className="min-w-[43px]">이름 - </span>
          <div className="w-full overflow-hidden overflow-ellipsis">
            <div className="w-full line-clamp-1">{name}</div>
          </div>
        </div>
        <div className="flex space-x-1">
          <span className="min-w-[43px]">장소 - </span>
          <div className="w-full overflow-hidden overflow-ellipsis">
            {address}
          </div>
        </div>
        <div className="flex space-x-1">
          <span className="min-w-[43px]">시간 - </span>
          <div className="w-full overflow-hidden overflow-ellipsis">
            <div className="w-full line-clamp-1">09:30 ~ 11:00</div>
          </div>
        </div>
        <div className="flex space-x-1">
          <span className="min-w-[43px]">선수 - </span>
          <div className="w-full max-w-[400px] break-words">{player}</div>
        </div>
        <div className="flex space-x-1">
          <span className="min-w-[73px]">훈련내용 - </span>
          <div className="w-full max-w-[400px] break-words">{content}</div>
        </div>
      </div>
      <div className="w-full h-[107px] flex justify-center slide">
        <MuiCarousel
          interval={4000}
          animation={"fade"}
          autoPlay={true}
          sx={{
            width: "25vw",
            height: "fit-content",
          }}
        >
          {images.length !== 0 ? (
            images.map((el, idx) => (
              <div
                key={`slide-image${idx}`}
                className="flex justify-center m-0 space-x-1"
              >
                <Image
                  loader={imageLoader}
                  src={`${el && el !== "string" ? el : "/images/schedule_image1.svg"}`}
                  width={0}
                  height={0}
                  alt="Schedule Image"
                  style={{ width: "149px", height: "107px" }}
                />
              </div>
            ))
          ) : (
            <Image
              loader={imageLoader}
              src={"/images/schedule_image1.svg"}
              width={0}
              height={0}
              alt="Schedule Image"
              style={{ width: "149px", height: "107px" }}
            />
          )}
        </MuiCarousel>
      </div>
    </div>
  );
};

export default DailyScheduleItem;
