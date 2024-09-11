/* eslint-disable react/prop-types */
import { ChatList } from "react-chat-elements";

export default function Chats({ data }) {
  console.log(data);
  function getLastMsg(data) {
    const lastmsg = data.previous_messages[data.previous_messages.length - 1];
    if (!lastmsg) return ["", ""];
    return [lastmsg.message, lastmsg.time];
  }

  const lastMessage = getLastMsg(data);

  return (
    <div>
      <header className="p-3 space-y-6">
        <h1 className="text-xl font-medium m-0">Messages</h1>
        <div>
          <input
            type="Search"
            placeholder="Search here..."
            className="px-3 py-2 bg-neutral-100 w-full border-none text-base focus-visible:ring outline-none"
          />
        </div>
      </header>
      <ChatList
        className="chat-list"
        dataSource={[
          {
            unread: 0,
            date: new Date(lastMessage[1]),
            alt: data.team_name,
            title: data.team_name,
            subtitle: lastMessage[0],
            avatar: `${`https://placehold.co/600x400/ccc/444?text=${data.team_name
              .substr(0, 2)
              .toUpperCase()}`}`,
          },
        ]}
      />
    </div>
  );
}
