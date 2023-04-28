import React, { useEffect, useState } from "react";
import Channels from "./Channels";
import { Cookies } from "react-cookie";
import { StreamChat } from "stream-chat";
import Prompt from "./Prompt";
import Loader from "./Loader";
import CurrChannel from "./CurrChannel";

const Community = () => {
  const [hasChannels, setHasChannels] = useState(false);
  const [isLoading,setisLoading]=useState(true);


  const apiKey = "gc8733b2v4gs";
  const chatClient = StreamChat.getInstance(apiKey);
  const cookies = new Cookies();
  const chatToken = cookies.get("chatToken");
  const id = cookies.get("id");
  const name = cookies.get("name");
  const email = cookies.get("email");
  
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
  useEffect(() => {
  

    async function fetchChannels() {
      const filter = { members: { $in: [id] } };
      const data = await chatClient.queryChannels(filter);
      setisLoading(false);
      console.log(data);  
      data.length > 0 ? setHasChannels(true) : setHasChannels(false);
    }
    fetchChannels();
  }, [id]);




  return (
    <div className="w-full text-white">
      <div className="w-full h-full">
        <div className="absolute w-full  top-[15%] p-4 md:p-8">
          <div>
            {isLoading ? <Loader /> : hasChannels ? <CurrChannel /> : <Prompt />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
