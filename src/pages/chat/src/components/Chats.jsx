/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChatList } from "react-chat-elements";

export default function Chats({ data, teams, fn }) {
  const [searchValue, setSearchValue] = useState("");
  function getLastMsg(data) {
    const lastmsg = data.previous_messages[data.previous_messages.length - 1];
    if (!lastmsg) return ["", ""];
    return [lastmsg.message, lastmsg.time];
  }
  const lastMessage = getLastMsg(data);

  const dataSource = teams
    .filter((item) => {
      if (!searchValue) return item;
      if (
        item.TeamName.toUpperCase().indexOf(searchValue.toUpperCase()) !== -1
      ) {
        return item;
      }
    })
    .map((team) => {
      return {
        unread: 0,
        teamId: team.TEAMID,
        teamName: team.TeamName,
        // date: new Date(lastMessage[1]),
        alt: team.TeamName,
        title: team.TeamName,
        subtitle: "Last message will come here",
        avatar: `${`https://placehold.co/600x400/ccc/444?text=${team.TeamName.substr(
          0,
          2
        ).toUpperCase()}`}`,
      };
    });

  function handleClick(e) {
    fn({ teamId: e.teamId, teamName: e.teamName });
  }

  return (
    <div>
      <header className="p-3 space-y-6">
        <h1 className="text-xl font-medium m-0">Messages</h1>
        <div>
          <input
            type="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search here..."
            className="px-3 py-2 bg-neutral-100 w-full border-none text-base focus-visible:ring outline-none"
          />
        </div>
      </header>
      <ChatList
        className="chat-list"
        dataSource={dataSource}
        onClick={handleClick}
      />
    </div>
  );
}
