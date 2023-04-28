import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import "@stream-io/stream-chat-css/dist/css/index.css";
import { ThemeProvider } from 'styled-components';
import { Cookies } from "react-cookie";

const filters = { type: "messaging" };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const CurrChannel = () => {
  const [client, setClient] = useState(null);
  const cookies = new Cookies();
  const chatToken = cookies.get("chatToken");
  const id = cookies.get("id");
  const name = cookies.get("name");
  
  useEffect(() => {
    const newClient = new StreamChat("gc8733b2v4gs");
    const theme = {
        colors: {
          primary: '#FF00000', // change this to your desired color
        },
      };
    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log("connection lost");
      setClient(newClient);
    };

    newClient.on("connection.changed", handleConnectionChange);

    newClient.connectUser(
      {
        id: id,
        name: name,
      },
      chatToken
    );

    return () => {
      newClient.off("connection.changed", handleConnectionChange);
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  }, []);

  if (!client) return null;

  return (
    <Chat client={client}>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default CurrChannel;
