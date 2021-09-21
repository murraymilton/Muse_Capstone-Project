import React, { useEffect, useState } from "react";
import "./chat.css";
import { addPerson, ChatEngine, getOrCreateChat } from "react-chat-engine";
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
        const { username } = user;
        await axios.put(
          "https://api.chatengine.io/users/",
          {
            username,
            secret: username,
          },
          { headers: { "PRIVATE-KEY": process.env.REACT_APP_CHAT_ENGINE_KEY } }
        );
        const authObject = {
          publicKey: process.env.REACT_APP_CHAT_ENGINE_ID,
          userName: process.env.REACT_APP_CHAT_SOCIAL_CHAT_TITLE,
          userSecret: process.env.REACT_APP_CHAT_SOCIAL_CHAT_TITLE,
        };
        const chatID = process.env.REACT_APP_CHAT_SOCIAL_CHAT_ID;
        addPerson(authObject, chatID, username, setChat);
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
        {user && (
          <ChatEngine
            height="100vh"
            projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
            userName={user.username}
            userSecret={user.username}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
          />
        )}
      </>
    </motion.div>
  );
};

export default Chat;
