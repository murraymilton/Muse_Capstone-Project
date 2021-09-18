import React from "react";
import './chat.css'
import {ChatEngine} from "react-chat-engine";
import ChatFeed from "../ChatFeed"
import {motion} from "framer-motion";
const Chat =() => {
    // const {userEmail, password} = currentUser;
    return(
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        >
        <>
        <ChatEngine
          height="100vh"
      projectID="ba49b670-8392-422f-a5c0-fa3e14464446"
      userName=" museuser"
      userSecret="mm1234567"
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
        </>
        </motion.div>
    )
}

export default Chat;