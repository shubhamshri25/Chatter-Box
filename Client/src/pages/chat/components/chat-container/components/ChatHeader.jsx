import { useAppStore } from "@/store";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className=" h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between gap-5 px-20 ">
      <div className="flex items-center gap-5 w-full justify-between">
        <div className="flex gap-3 items-center justify-center ">
          <div className="w-12 h-12 relative">
            <Avatar className="h-12 w-12  rounded-full overflow-hidden ">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={` uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.color
                  )} `}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.email.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>
          <div>
            {selectedChatType === "contact" &&
              `${selectedChatData.firstName} ${selectedChatData.lastName}`}
          </div>
        </div>
        <div className="flex gap-5 items-center justify-center ">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300 ">
            <RiCloseFill className="text-3xl" onClick={closeChat} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
