import React from "react";
import { cls } from "@/utils";

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
        "flex items-center space-x-2",
        classnames || "justify-start"
      )}
    >
      {tabs.map((tab, idx) => (
        <button
          key={`tab${idx}`}
          type="button"
          onClick={() => onTabClick(tab.key)}
          className={cls(
            "px-1 py-2 text-[20px] font-[700]",
            activeTab === tab.key ? "text-[#0e0e0e]" : "text-[#B9B9C3]"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabBar01;
