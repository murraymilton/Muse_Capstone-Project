import React from "react";
import './chat.css'
import {ChatEngine} from "react-chat-engine";
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
      userName=" mm357"
      userSecret="mm1234567"
    />
        </>
        </motion.div>
    )
}

export default Chat;