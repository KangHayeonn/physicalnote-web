import React from "react";
import { cls } from "../../libs/commons/utils";

interface Tabs {
  key: string;
  label: string;
}

interface TabBarProps {
  tabs: Tabs[];
  activeTab: string;
  onTabClick: (tabkey: string) => void;
  classnames?: string;
}

const TabBar01 = ({ tabs, activeTab, onTabClick, classnames }: TabBarProps) => {
  return (
    <div
      className={cls(
        "flex items-center  space-x-2",
        classnames || "justify-start"
      )}
    >
      {tabs.map((tab) => (
        <button
          type="button"
          onClick={() => onTabClick(tab.key)}
          className={cls(
            "px-5 py-2  rounded-3xl text-[14px] font-[400]",
            activeTab === tab.key ? "text-white bg-[#0e0e0e]" : "bg-[#F2F2F3]"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar01;
