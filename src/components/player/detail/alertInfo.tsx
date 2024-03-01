import React from "react";
import Image from "next/image";

const AlertInfo = () => {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className="w-full flex space-x-5 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="w-full flex flex-col space-y-8">
        <div className="text-[16px] font-[700]">미등록일 알림 보내기</div>
        <div className="w-full flex justify-center">
          <ul className="text-[16px] font-[700] flex space-x-16">
            <li className="flex flex-col items-center space-y-2">
              <div>일</div>
              <div>
                <Image
                  loader={imageLoader}
                  //src={data.profile || "/images/profile_default.svg"}
                  src="/images/alert_unchecked.svg"
                  width={0}
                  height={0}
                  priority
                  alt="alert icon"
                  style={{
                    width: "30px",
                    height: "auto",
                  }}
                />
              </div>
            </li>
            <li className="flex flex-col items-center space-y-2">
              <div>월</div>
              <div>
                <Image
                  loader={imageLoader}
                  //src={data.profile || "/images/profile_default.svg"}
                  src="/images/alert_unchecked.svg"
                  width={0}
                  height={0}
                  priority
                  alt="alert icon"
                  style={{
                    width: "30px",
                    height: "auto",
                  }}
                />
              </div>
            </li>
            <li className="flex flex-col items-center space-y-2">
              <div>화</div>
              <div>
                <Image
                  loader={imageLoader}
                  //src={data.profile || "/images/profile_default.svg"}
                  src="/images/alert_unchecked.svg"
                  width={0}
                  height={0}
                  priority
                  alt="alert icon"
                  style={{
                    width: "30px",
                    height: "auto",
                  }}
                />
              </div>
            </li>
            <li className="flex flex-col items-center space-y-2">
              <div>수</div>
              <div>
                <Image
                  loader={imageLoader}
                  //src={data.profile || "/images/profile_default.svg"}
                  src="/images/alert_unchecked.svg"
                  width={0}
                  height={0}
                  priority
                  alt="alert icon"
                  style={{
                    width: "30px",
                    height: "auto",
                  }}
                />
              </div>
            </li>
            <li className="flex flex-col items-center space-y-2">
              <div>목</div>
              <div>
                <Image
                  loader={imageLoader}
                  //src={data.profile || "/images/profile_default.svg"}
                  src="/images/alert_unchecked.svg"
                  width={0}
                  height={0}
                  priority
                  alt="alert icon"
                  style={{
                    width: "30px",
                    height: "auto",
                  }}
                />
              </div>
            </li>
            <li className="flex flex-col items-center space-y-2">
              <div>금</div>
              <div>
                <Image
                  loader={imageLoader}
                  //src={data.profile || "/images/profile_default.svg"}
                  src="/images/alert_unchecked.svg"
                  width={0}
                  height={0}
                  priority
                  alt="alert icon"
                  style={{
                    width: "30px",
                    height: "auto",
                  }}
                />
              </div>
            </li>
            <li className="flex flex-col items-center space-y-2">
              <div>토</div>
              <div>
                <Image
                  loader={imageLoader}
                  //src={data.profile || "/images/profile_default.svg"}
                  src="/images/alert_unchecked.svg"
                  width={0}
                  height={0}
                  priority
                  alt="alert icon"
                  style={{
                    width: "30px",
                    height: "auto",
                  }}
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlertInfo;
