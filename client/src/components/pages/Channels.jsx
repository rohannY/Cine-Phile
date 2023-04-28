import copy from "../../assets/Copy.svg";
import React, { useRef, useEffect } from "react";
import { StreamChat } from 'stream-chat';
import { Cookies } from "react-cookie";

const Chats = async () => {

  const apiKey = 'gc8733b2v4gs';
  const chatClient = StreamChat.getInstance(apiKey);
  const cookies = new Cookies();
  const chatToken = cookies.get('chatToken');
  const id = cookies.get('id')
  const name = cookies.get('name');
  const email = cookies.get('email');
  if (chatToken) {
    chatClient.connectUser({
      id: cookies.get('id'),
      name: cookies.get('name'),
      email: cookies.get('email')
    }, chatToken)
  }
  const filter = { members: { $in: [id] } };
  const channels = await chatClient.queryChannels(filter);









  const chatRef = useRef();
  useEffect(() => {
    chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  });

  return (
    <>
      <div className="mx-auto shadow-lg rounded-lg -my-14 font-satoshi">
        <div className="grid grid-cols-12">
          <div className="h-auto col-span-3 w-full px-3 py-4 rounded-3xl bg-[#232627]">
            <h1 className="py-5 px-4 text-3xl">Channels</h1>
            <div className="px-3 py-3">
              <div className="space-x-5 flex items-center bg-[#181A1B] px-10 py-4 rounded-3xl cursor-pointer border border-gray-700 hover:drop-shadow-xl ">
                <img
                  src="https://m.media-amazon.com/images/M/MV5BNzVkYWY4NzYtMWFlZi00YzkwLThhZDItZjcxYTU4ZTMzMDZmXkEyXkFqcGdeQXVyODUxOTU0OTg@._V1_FMjpg_UY1000_.jpg"
                  className="h-14 w-14 rounded-2xl border border-white"
                />
                <p className="text-xl font-medium font-satoshi">Brooklyn 99</p>
              </div>
            </div>
          </div>

          <div className="h-auto col-span-6 w-full px-3 py-4 rounded-3xl bg-[#232627] mx-6">
            <div className="flex items-center">
            <h1 className="py-5 px-7 text-2xl font-figtree font-medium">
              Brooklyn 99 Stans
            </h1>
            <img src={copy} className="h-7 cursor-pointer"/>
            </div>
            <div className="px-3 py-3">
              <div
                className="overflow-y-auto h-[440px] space-y-10 mb-10"
                ref={chatRef}
              >
                <div className="px-5 space-y-2">
                  <p className="text-[#d98900] text-xl font-medium">
                    John Smith
                  </p>
                  <p className="font-light">
                    Hey guys, have you seen Brooklyn 99? I just finished binging
                    it and it's hilarious!
                  </p>
                </div>

              </div>

              {/* Chat Box */}
              <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-[#2D3133]">
                <textarea
                  id="chat"
                  rows={1}
                  className="resize-none outline-none block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg dark:bg-[#2D3133]  dark:placeholder-gray-400 dark:text-white"
                  placeholder="Your message..."
                  defaultValue={""}
                />
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
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

              <div>

              </div>
            </div>
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
