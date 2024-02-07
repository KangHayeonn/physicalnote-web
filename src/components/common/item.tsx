import React from "react";

interface ItemProps {
  imageUrl?: string;
  position: string;
  name: string;
}

const Item = ({ imageUrl, position, name }: ItemProps) => {
  return (
    <div className="cursor-pointer shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[20px] w-[135px] h-[182px] flex flex-col justify-center items-center space-y-1">
      <div>
        {imageUrl ? (
          <div>
            <img src={imageUrl} />
          </div>
        ) : (
          <div className="w-[56px] h-[56px] rounded-full bg-[#D9D9D9] flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.0011 34.6361C33.0011 32.354 33.0011 31.213 32.7195 30.2845C32.0853 28.194 30.4494 26.5581 28.3589 25.924C27.4305 25.6423 26.2894 25.6423 24.0073 25.6423H15.8312C13.5491 25.6423 12.4081 25.6423 11.4796 25.924C9.38911 26.5581 7.7532 28.194 7.11905 30.2845C6.8374 31.213 6.8374 32.354 6.8374 34.6361M27.2778 12.5605C27.2778 16.6245 23.9833 19.919 19.9193 19.919C15.8553 19.919 12.5607 16.6245 12.5607 12.5605C12.5607 8.49644 15.8553 5.2019 19.9193 5.2019C23.9833 5.2019 27.2778 8.49644 27.2778 12.5605Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="text-[14px] font-[500]">{position}</div>
      <div className="text-[14px] font-[500]">{name}</div>
    </div>
  );
};

export default Item;
