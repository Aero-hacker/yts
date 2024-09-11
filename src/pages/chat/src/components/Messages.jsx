/* eslint-disable react/prop-types */

import { MessageList } from "react-chat-elements";
import Message from "./Message";
import { readUserId } from "../../../../services/localServices";

export default function Messages({ data, socket }) {
  const loggedUser_id = Number.parseInt(readUserId());
  const dataSource = data.map((msg) => {
    return {
      position: msg.sender_id === loggedUser_id ? "right" : "left",
      type: "text",
      text: <Message msg={msg} socket={socket} />,
    };
  });

  return (
    <div className="relative">
      <p className="text-center text-neutral-500 text-xs">
        Hmm. You have reached the top of the conversation
      </p>
      <div className="my-5">
        <MessageList dataSource={dataSource} />
      </div>
    </div>
  );
}
