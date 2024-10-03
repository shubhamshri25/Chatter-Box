import { useAppStore } from "@/store";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ChatContainer from "./components/chat-container/ChatContainer";
import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";
import ContactsContainer from "./components/contacts-container/ContactsContainer";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup your profile to continue");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className=" flex h-[100vh] overflow-hidden text-white ">
      <ContactsContainer />
      {/* <EmptyChatContainer /> */}
      {/* <ChatContainer /> */}
    </div>
  );
};

export default Chat;
