import copy from "../../assets/Copy.svg";
import { Cookies } from "react-cookie";
import React, { useRef, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelList,
  MessageList,
  Window,
} from "stream-chat-react";
import CurrChannel from "./CurrChannel";

const Chats = () => {
  const apiKey = "gc8733b2v4gs";
  const chatClient = StreamChat.getInstance(apiKey);
  const cookies = new Cookies();
  const chatToken = cookies.get("chatToken");
  const id = cookies.get("id");
  const name = cookies.get("name");
  const email = cookies.get("email");
  const [serverMessages, setServerMessages] = useState(null); // Messages from channel
  const [currChannel, setcurrChannel] = useState();
  const [cuurrChannelName, setChannelName] = useState(null);
  const [channelMessage, setchannelMessage] = useState(""); // message -string- to store present message

  const [channels, setChannel] = useState();
  if (chatToken) {
    chatClient.connectUser(
      {
        id: id,
        name: name,
        email: email,
      },
      chatToken
    );
  }

  const chatRef = useRef();

  useEffect(() => {
    async function fetchChannels() {
      const filter = { members: { $in: [id] } };
      const data = await chatClient.queryChannels(filter);
      setChannel(data);
    }
    fetchChannels();
  }, [id]);

  const handleSubmit = () => {
    const channel = chatClient.channel("messaging", currChannel);
    if (channelMessage === "") {
      return;
    }
    const message = {
      text: channelMessage,
    };
    setchannelMessage("");
    channel.sendMessage(message);
  };

  const fetchMessages = async (chanId,chanName) => {
    // setServerMessages(
    //   matchingChannel.state.messageSets[0].messages
    // );
    setcurrChannel(chanId);
    setChannelName(chanName);
    const channel = chatClient.channel('messaging', currChannel);
    const messages = await channel.query({ messages: { limit: 10 } });
    setServerMessages(messages.messages);
  };

  return (
    <>
      <div className="mx-auto shadow-lg rounded-lg -my-14 font-satoshi">
        <div className="grid grid-cols-12">
          <div className="h-auto col-span-3 w-full px-3 py-4 rounded-3xl bg-[#232627]">
            <h1 className="py-5 px-4 text-3xl">Channels</h1>
            {channels && channels.length > 0 ? (
              channels.map((channel) => (
                <div
                  className="px-3 py-3"
                  key={channel.id}
                  onClick={() => {fetchMessages(channel.id,channel.data.name);}}
                >
                  <div className="space-x-5 flex items-center bg-[#181A1B] px-10 py-4 rounded-xl cursor-pointer border border-gray-700 hover:drop-shadow-xl ">
                    <p className="text-xl font-medium font-satoshi">
                      {channel.data.name}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No channels found</p>
            )}
          </div>

          <div className="h-auto col-span-6 w-full px-3 py-4 rounded-3xl bg-[#232627] mx-6">
            {/* <div className="flex items-center">
              <h1 className="py-5 px-7 text-2xl font-figtree font-medium">
                {cuurrChannelName}
              </h1>
              <img src={copy} className="h-7 cursor-pointer" />
            </div>
            <div className="px-3 py-3">
              <div
                className="overflow-y-auto h-[440px] space-y-10 mb-10"
                ref={chatRef}
              >
                
                {serverMessages?.map((message) => (
                  <div key={message.id} className="px-5 space-y-2">
                    <p className="text-[#d98900] text-xl font-medium">
                      {message.user.name}
                    </p>
                    <p className="font-light">{message.text}</p>
                  </div>
                ))}


              </div>

              <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-[#2D3133]">
                <textarea
                  id="chat"
                  rows={1}
                  className="resize-none outline-none block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg dark:bg-[#2D3133]  dark:placeholder-gray-400 dark:text-white"
                  placeholder="Your message..."
                  value={channelMessage}
                  onChange={(e) => setchannelMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                  onClick={handleSubmit}
                >
                  <svg
                    className="w-6 h-6 rotate-90"
                    fill="white"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div> */}

            <CurrChannel/>
          </div>

          <div className="h-auto col-span-3 w-max pl-5 pr-28 py-4 rounded-3xl bg-[#232627] ml-10">
            <h1 className="py-5 px-4 text-3xl">Online</h1>
            <div className="px-3 py-3">
              <div className="space-x-5 flex items-center px-2 py-4 rounded-xl">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <p className="text-xl font-thin font-figtree">John Smith</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
