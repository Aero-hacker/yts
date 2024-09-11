import "react-chat-elements/dist/main.css";
import { ChevronDown, WifiOff } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import Chats from "./components/Chats";
import Input from "./components/Input";
import Header from "./components/Header";
import Messages from "./components/Messages";
import {
  readSelectedProjectId,
  readToken,
} from "../../../services/localServices";
import { Spin } from "antd";

import apiServices from "../../../services/exportService";
import { apiEndpoints } from "../../../utils/apiEndPoints";

let socket;
export default function Chat() {
  const btnRef = useRef();
  const listRef = useRef(null);
  const socketRef = useRef(false);
  const [data, setData] = useState();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  function connectToSocket(selectedTeam) {
    if (socketRef.current) {
      socket.close();
      setConnected(false);
    }
    const url = `wss://dchat.pezala.in/ws/chat/?team_id=${selectedTeam}&token="${readToken()}"`;
    socket = new WebSocket(url);
    socket.onopen = function () {
      setIsLoading(false);
      socketRef.current = true;
      setConnected(true);
      console.log("Connected to the WebSocket server");
    };

    socket.onmessage = function (event) {
      const parsedEvent = JSON.parse(event.data);
      if (parsedEvent.action === "send") {
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random(),
            message: parsedEvent.message,
            sender: parsedEvent.sender,
            sender_id: parsedEvent.sender_id,
            time: parsedEvent.time,
          },
        ]);
      } else if (parsedEvent.action === "delete") {
        setMessages((prev) => {
          const newArray = [...prev];
          return newArray.map((msg) => {
            if (msg.id === parsedEvent.message_id) {
              msg.deleted = true;
              msg.message = "Message deleted by the user";
            }
            return msg;
          });
        });
      } else {
        setData(parsedEvent);
        setMessages(parsedEvent.previous_messages);
      }
    };

    socket.onclose = function () {
      setConnected(false);
      console.log("Disconnected from the WebSocket server");
    };
  }

  function sendMessage(message) {
    setMessages((prev) => {
      return [
        ...prev,
        {
          id: messages.length + 1,
          message: message.message,
          sender: message.sender,
          sender_id: message.sender_id,
          time: new Date().toISOString(),
        },
      ];
    });
    socket.send(JSON.stringify(message));
  }

  // Please throttle
  function handleScroll(event) {
    if (!btnRef.current) return;
    const scrollHeight = event.target.scrollHeight;
    const pageY = event.target.scrollTop + event.target.clientHeight;
    if (Math.abs(pageY - scrollHeight) > 100) {
      btnRef.current.style.display = "block";
    } else {
      btnRef.current.style.display = "none";
    }
  }

  function scrollIntoView() {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }

  async function fetchTeamDetails() {
    const response = await apiServices.get(
      `${
        apiEndpoints.home.projects.GetTeamDetailsByInstitute
      }${readSelectedProjectId()}/`
    );
    if (response.status === 200) {
      setTeams(response.data);
    }
  }

  useEffect(() => {
    fetchTeamDetails();
    return () => {
      if (!socketRef.current) {
        socket.close();
      }
    };
  }, []);

  useLayoutEffect(() => {
    scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (teams.length !== 0) {
      setSelectedTeam(() => {
        return { teamId: teams[0].TEAMID, teamName: teams[0].TeamName };
      });
      connectToSocket(teams[0].TEAMID);
    }
  }, [teams]);

  useEffect(() => {
    if (selectedTeam) {
      connectToSocket(selectedTeam.teamId);
    }
  }, [selectedTeam]);

  if (!data) return;
  if (!teams) return;

  return (
    <div className="bg-gray-200 h-screen flex divide-x-2">
      {isLoading === true ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="basis-[330px] __charts shadow grow-0 relative overflow-hidden shrink-0 bg-white h-full">
            {/* {!connected ? (
              <div className="bg-red-100 absolute bottom-0 w-full px-4 py-2 space-y-1">
                <div className="flex items-center justify-center text-red-600 gap-3 font-medium">
                  <p>Disconnected !!</p>
                </div>
                <div className="text-sm text-center font-medium">
                  <button
                    className="underline"
                    onClick={() => connectToSocket(selectedTeam)}
                  >
                    Reconnect
                  </button>
                </div>
              </div>
            ) : null} */}
            <Chats data={data} teams={teams} fn={setSelectedTeam} />
          </div>
          {!connected ? (
            <div className="p-4 h-screen w-screen grid place-items-center bg-white">
              <Spin>{"Loading..."}</Spin>
            </div>
          ) : (
            <div className="bg-white flex-grow flex flex-col">
              {/* Header */}
              <div>
                <Header data={data} selectedTeam={selectedTeam} />
              </div>
              {/* Message List */}
              <div
                ref={listRef}
                onScroll={handleScroll}
                className="flex-grow overflow-y-auto py-5 relative __messages_list"
              >
                <Messages
                  data={messages}
                  socket={socket}
                  reconnect={connectToSocket}
                  selectedTeam={selectedTeam}
                />
                <button
                  ref={btnRef}
                  onClick={scrollIntoView}
                  className="sticky bottom-0 left-1/2 -translate-x-1/2 focus-visible:ring rounded-full text-neutral-700 hidden"
                >
                  <ChevronDown />
                </button>
              </div>
              {/* Input */}
              <Input fn={sendMessage} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
