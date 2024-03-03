import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PieChart } from "@mui/x-charts";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import { IntensityInfoType, RiskInfoType } from "@/types/player";

const InjuryInfo = () => {
  const playerDetail = useRecoilValue(playerDetailSelector);
  const [riskData, setRiskData] = useState<RiskInfoType>();
  const [intensityData, setIntensityData] = useState<IntensityInfoType[]>([]);

  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  useEffect(() => {
    setRiskData(playerDetail?.riskInfo);
    setIntensityData(playerDetail?.intensityInfo);
  }, [playerDetail]);

  return (
    <div className="w-full flex space-x-8 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div className="w-full">
        <div className="text-[20px] font-[700] space-x-1">
          <span>부상위험도</span>
          <em className="text-[16px] text-[#CBCCCD] font-[400] not-italic">
            (단위 : %)
          </em>
        </div>
        <div className="w-[280px] h-[300px] flex flex-col justify-center items-center space-y-6">
          <div className="w-full flex flex-col justify-content items-center">
            <div className="flex items-center space-x-4">
              <div className="w-[56px] h-[73px] rounded-[10px] relative bg-[#FDE6E8] relative">
                {riskData?.injuryLevel && riskData?.injuryLevel < 7 ? (
                  <>
                    <Image
                      loader={imageLoader}
                      src="/icons/man.svg"
                      width={0}
                      height={0}
                      priority
                      alt="man icon"
                      style={{
                        width: "27px",
                        height: "39px",
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                      }}
                    />
                    <div className="absolute bottom-[5px] right-[5px] font-[700] text-[#fff]">
                      {riskData?.injuryLevel}
                    </div>
                  </>
                ) : null}
              </div>
              <div className="w-[56px] h-[73px] rounded-[10px] relative bg-[#F8B3B8]">
                {riskData?.injuryLevel &&
                riskData?.injuryLevel >= 7 &&
                riskData?.injuryLevel < 14 ? (
                  <>
                    <Image
                      loader={imageLoader}
                      src="/icons/man.svg"
                      width={0}
                      height={0}
                      priority
                      alt="man icon"
                      style={{
                        width: "27px",
                        height: "39px",
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                      }}
                    />
                    <div className="absolute bottom-[5px] right-[5px] font-[700] text-[#fff]">
                      {riskData?.injuryLevel}
                    </div>
                  </>
                ) : null}
              </div>
              <div className="w-[56px] h-[73px] rounded-[10px] relative bg-[#F06671]">
                {riskData?.injuryLevel &&
                riskData?.injuryLevel >= 14 &&
                riskData?.injuryLevel < 21 ? (
                  <>
                    <Image
                      loader={imageLoader}
                      //src={data.profile || "/images/profile_default.svg"}
                      src="/icons/man.svg"
                      width={0}
                      height={0}
                      priority
                      alt="man icon"
                      style={{
                        width: "27px",
                        height: "39px",
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                      }}
                    />
                    <div className="absolute bottom-[5px] right-[5px] font-[700] text-[#fff]">
                      {riskData?.injuryLevel}
                    </div>
                  </>
                ) : null}
              </div>
              <div className="w-[56px] h-[73px] rounded-[10px] relative bg-[#E60012]">
                {riskData?.injuryLevel && riskData?.injuryLevel >= 21 ? (
                  <>
                    <Image
                      loader={imageLoader}
                      //src={data.profile || "/images/profile_default.svg"}
                      src="/icons/man.svg"
                      width={0}
                      height={0}
                      priority
                      alt="man icon"
                      style={{
                        width: "27px",
                        height: "39px",
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                      }}
                    />
                    <div className="absolute bottom-[5px] right-[5px] font-[700] text-[#fff]">
                      {riskData?.injuryLevel}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className="text-[16px] text-[#C1C1C1] font-[700] space-x-14 ml-[8px]">
              <span>0</span>
              <span>7</span>
              <span>14</span>
              <span>21</span>
              <span>28</span>
            </div>
          </div>
          <div className="space-x-3">
            <span className="text-[#FF2738] font-[700]">관리요망</span>
            <span className="text-[#000] font-[700]">
              {riskData?.injuryPercent}%
            </span>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="text-[20px] font-[700]">운동강도</div>
        <div className="min-w-[300px] h-[300px] flex">
          {intensityData.length !== 0 ? (
            <>
              {intensityData.map((item, idx) => (
                <div key={`injury-intensity${idx}`} className="w-full relative">
                  <div className="w-[200px] h-full">
                    <PieChart
                      key={`intensity${idx}`}
                      series={[
                        {
                          data: [
                            { value: item.level, color: "#FF0000" },
                            { value: 100 - item.level, color: "#C1C1C1" },
                          ],
                          innerRadius: 40,
                          outerRadius: 80,
                          paddingAngle: 1,
                          cornerRadius: 1,
                          startAngle: 0,
                          endAngle: 360,
                          cx: 100,
                        },
                      ]}
                    />
                  </div>
                  <div className="text-[16px] font-[700] absolute bottom-[30px] left-[60px]">
                    {item.type}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="min-h-[260px] flex items-center justify-center w-full py-10 font-bold">
              데이터가 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InjuryInfo;
