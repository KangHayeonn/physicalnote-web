import React from "react";
import Image from "next/image";

interface ItemProps {
  imageUrl?: string | null;
  position: string;
  name: string;
}

const Item = ({ imageUrl, position, name }: ItemProps) => {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className="cursor-pointer shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[20px] w-[150px] h-[182px] flex flex-col justify-center items-center space-y-1">
      <div>
        <Image
          loader={imageLoader}
          src={
            imageUrl && imageUrl !== "string"
              ? imageUrl
              : "/images/profile_default.svg"
          }
          width={0}
          height={0}
          alt="profile image"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "46px",
          }}
        />
      </div>
      <div className="text-[14px] font-[500]">{position}</div>
      <div className="text-[14px] font-[500]">{name}</div>
    </div>
  );
};

export default Item;
