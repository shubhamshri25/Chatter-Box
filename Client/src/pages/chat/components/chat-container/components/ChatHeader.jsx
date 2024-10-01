import React from "react";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  return (
    <div className=" h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between gap-5 px-20 ">
      <div className="flex items-center justify-center gap-5 ">
        <div className="flex gap-3 items-center justify-center "></div>
        <div className="flex gap-5 items-center justify-center ">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300 ">
            <RiCloseFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
