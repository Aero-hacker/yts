/* eslint-disable react/prop-types */
import { Dropdown, Space } from "antd";
import { ChevronDown } from "lucide-react";
import {
  getInstituteId,
  readSelectedProjectId,
  readUserId,
} from "../../../../services/localServices";

export default function Message({ msg, socket }) {
  const loggedUser_id = Number.parseInt(readUserId());
  function currentTime(date) {
    const now = new Date(date);
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  function deleteMessage(id) {
    const action = {
      action: "delete",
      message_id: id,
      sender_id: loggedUser_id,
      project_id: Number.parseInt(readSelectedProjectId()) || 100,
      institute_id: Number.parseInt(getInstituteId()),
    };
    socket.send(JSON.stringify(action));
  }

  const itemClick = (e, id) => {
    if (e.key === "0") {
      deleteMessage(id);
    }
  };
  return (
    <div className="space-y-1 relative group">
      <div className="absolute top-0 right-0 hidden group-hover:block cursor-pointer bg-blue-100">
        {msg.sender_id === loggedUser_id && (
          <Dropdown
            placement="topLeft"
            menu={{
              items: [
                {
                  disabled: msg.deleted,
                  label: "Delete",
                  key: "0",
                },
                {
                  disabled: true,
                  label: "Forward",
                  key: "1",
                },
                {
                  disabled: true,
                  label: "Reply",
                  key: "2",
                },
              ],
              onClick: (e) => itemClick(e, msg.id),
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <ChevronDown size={19} className="text-neutral-600" />
              </Space>
            </a>
          </Dropdown>
        )}
      </div>
      <div>
        <p className="font-semibold text-xs">
          {msg.sender_id === loggedUser_id ? "" : msg.sender || "No-User"}
        </p>
      </div>
      <div className="flex justify-between items-center gap-3">
        <p className={msg.deleted ? "italic text-neutral-600 text-sm" : ""}>
          {msg.sender_id === loggedUser_id && msg.deleted
            ? "You deleted this message"
            : msg.message}
        </p>
        <p className="text-xs text-right text-neutral-500 shrink-0 self-end break-keep select-none ">
          {currentTime(new Date(msg.time))}
        </p>
      </div>
    </div>
  );
}
