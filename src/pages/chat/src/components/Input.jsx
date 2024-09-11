/* eslint-disable react/prop-types */
import { Paperclip, Send } from "lucide-react";
import { useId, useRef } from "react";
import {
  getInstituteId,
  readSelectedProjectId,
  readUserId,
} from "../../../../services/localServices";

export default function Input({ fn }) {
  const id = useId();
  const inpRef = useRef(null);

  function sendMessage(event) {
    event.preventDefault();
    if (!inpRef.current || !inpRef.current.value.trim()) {
      inpRef.current.focus();
      return;
    }
    const message = {
      action: "send",
      message: inpRef.current.value,
      sender: "Sender name",
      sender_id: Number.parseInt(readUserId()),
      project_id: Number.parseInt(readSelectedProjectId()) || 100,
      institute_id: Number.parseInt(getInstituteId()),
    };
    fn(message);
    inpRef.current.value = "";
  }
  return (
    <div className="__input">
      <div className="px-6 py-2 flex gap-2 justify-center">
        <form onSubmit={sendMessage} className="max-w-xl flex-grow flex gap-2">
          <textarea
            type="text"
            ref={inpRef}
            placeholder="Type a message...."
            className="__chat_input text-left outline-none w-full bg-neutral-200 text-black caret-black px-3 py-2 border-none text-base peer max-h-[100px] overflow-y-auto"
          />
          <button
            type="submit"
            className="px-3 py-3 self-end peer-placeholder-shown:-translate-x-1/2 peer-placeholder-shown:opacity-0 peer-placeholder-shown:pointer-events-none transition-all duration-200 bg-blue-100 outline-none focus-visible:ring flex items-center gap-2"
          >
            <Send strokeWidth={0} size={18} className="fill-blue-800" />
          </button>
        </form>
      </div>
    </div>
  );
}
