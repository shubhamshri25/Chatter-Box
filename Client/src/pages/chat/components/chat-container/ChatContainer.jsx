import ChatHeader from "./components/ChatHeader";
import MessageContainer from "./components/MessageContainer";
import MessageBar from "./components/MessageBar";

const ChatContainer = () => {
  return (
    <div className="fixed top-0 w-[100vw] h-[100vh] bg-[#1c1d25] flex flex-col md:static md:flex-1 ">
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  );
};

export default ChatContainer;
