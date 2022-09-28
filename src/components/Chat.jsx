import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { Icon } from '@iconify/react';

function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
        <a href='https://github.com/adrianpg10'>
          <Icon icon="akar-icons:github-fill" className="iconredes"/></a>
        <a href='https://www.linkedin.com/in/adrian-perez-gomez/'>
          <Icon icon="entypo-social:linkedin-with-circle" className="iconredes"/></a>
        </div>
       
      </div>
      <Messages/>
      <Input/>
    </div>
  );
}

export default Chat;
