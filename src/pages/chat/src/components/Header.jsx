/* eslint-disable react/prop-types */
import { Info } from "lucide-react";
import { Avatar, Navbar } from "react-chat-elements";

export default function Header({ data }) {
  return (
    <div className="__header">
      <header>
        <Navbar
          className="border-b-2 p-2"
          left={
            <div className="flex gap-3 items-center">
              <Avatar
                src={`${`https://placehold.co/600x400/ccc/444?text=${data.team_name
                  .substr(0, 2)
                  .toUpperCase()}`}`}
                alt={"logo"}
                size="medium"
                type="circle flexible"
              />
              <p className="font-medium text-lg">{data.team_name}</p>
            </div>
          }
          right={
            <div className="mr-2">
              <div className="text-neutral-600 outline-none">
                <Info strokeWidth={1.9} size={20} />
              </div>
            </div>
          }
        />
      </header>
    </div>
  );
}
