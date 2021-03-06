import React, { useEffect, useState } from "react";
import "./chat.css";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import axios from "axios";
import { useSelector } from "react-redux";
import ChatFeed from "../ChatFeed";
import { motion } from "framer-motion";

const Chat = () => {
  const {
    auth: { user },
  } = useSelector((state) => ({ ...state }));
  const [chat, setChat] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.put(
          "https://api.chatengine.io/users/",
          {
            username: user.username,
            secret: user.username,
          },
          { headers: { "PRIVATE-KEY": process.env.REACT_APP_CHAT_ENGINE_KEY } }
        );
        const authObject = {
          publicKey: process.env.REACT_APP_CHAT_ENGINE_ID,
          userName: user.username,
          userSecret: data.username,
        };
        const chatObject = { title: `${user.username} chat with support` };
        getOrCreateChat(authObject, chatObject, setChat);
      } catch (err) {}
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <>
        {chat && (
          <ChatEngine
            height="100vh"
            projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
            userName={chat.admin.username}
            userSecret={chat.admin.username}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
          />
        )}
      </>
    </motion.div>
  );
};

export default Chat;
