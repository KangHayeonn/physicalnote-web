import React from "react";
import Image from "next/image";
import { PieChart } from "@mui/x-charts";

const InjuryInfo = () => {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className="w-[790px] flex space-x-8 rounded-[25px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] py-4 px-8">
      <div>
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
                  19
                </div>
              </div>
              <div className="w-[56px] h-[73px] rounded-[10px] relative bg-[#F8B3B8]">
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
                  19
                </div>
              </div>
              <div className="w-[56px] h-[73px] rounded-[10px] relative bg-[#F06671]">
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
                  19
                </div>
              </div>
              <div className="w-[56px] h-[73px] rounded-[10px] relative bg-[#E60012]">
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
                  19
                </div>
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
            <span className="text-[#000] font-[700]">65%</span>
          </div>
        </div>
      </div>
      <div>
        <div className="text-[20px] font-[700]">운동강도</div>
        <div className="w-[500px] h-[300px] flex">
          <PieChart
            series={[
              {
                data: [
                  { value: 40, color: "#FF0000" },
                  { value: 60, color: "#C1C1C1" },
                ],
                innerRadius: 40,
                outerRadius: 80,
                paddingAngle: 1,
                cornerRadius: 1,
                startAngle: 0,
                endAngle: 360,
                cx: 120,
                cy: 130,
              },
            ]}
          />
          <PieChart
            series={[
              {
                data: [
                  { value: 60, color: "#FF0000" },
                  { value: 40, color: "#C1C1C1" },
                ],
                innerRadius: 40,
                outerRadius: 80,
                paddingAngle: 1,
                cornerRadius: 1,
                startAngle: 0,
                endAngle: 360,
                cx: 80,
                cy: 130,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default InjuryInfo;
