import { Select, message } from "antd";
import { useState } from "react";
import TimeLine from "react-gantt-timeline";
import { useDispatch, useSelector } from "react-redux";
// import { config } from "./ganttConfig";
import "./gannt.css";
import boardsSlice from "../src/redux/boardsSlice";

export default function GanttChart() {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  const [timeLinePeriod, setTimeLinePeriod] = useState("");

  if (!activeBoard) {
    return (
      <div>
        <h3 className=" text-gray-500 font-normal text-base">
          You don&apos;t have any boards yet. Please create one to view timeline
          for that board
        </h3>
      </div>
    );
  }

  const allColTask = activeBoard.columns.map((col) => {
    return col.tasks;
  });

  // change title -> name
  const finalArray = allColTask.flat().map((item) => {
    return {
      ...item,
      name: item.title,
    };
  });

  if (finalArray.length === 0) {
    return (
      <div>
        <h3 className=" text-gray-500 font-normal text-sm">
          No Tasks in{" "}
          <strong className="font-semibold underline">
            {activeBoard.name}
          </strong>{" "}
          board yet!! Create some and come back
        </h3>
      </div>
    );
  }

  function handleTaskUpdate(e, props) {
    dispatch(
      boardsSlice.actions.changeDate({
        e,
        // eslint-disable-next-line react/prop-types
        dates: JSON.stringify([props.start, props.end]),
      })
    );
    message.success(`Task timeline updated successfully`);
  }

  const handleChange = (value) => {
    setTimeLinePeriod(value);
  };

  return (
    <div className="h-full">
      <div className="flex items-center gap-3 h-full">
        <span>
          Currently viewing for{" "}
          <strong className="font-semibold underline">
            {activeBoard.name}
          </strong>
          &nbsp; Board
        </span>
        <Select
          size="middle"
          className="w-24"
          defaultValue="month"
          onChange={handleChange}
          options={[
            {
              value: "day",
              label: "Day",
            },
            {
              value: "week",
              label: "Week",
            },
            {
              value: "month",
              label: "Month",
            },
            {
              value: "year",
              label: "Year",
            },
          ]}
        />
      </div>
      <br />
      <div className="h-screen">
        <TimeLine
          onUpdateTask={handleTaskUpdate}
          mode={timeLinePeriod}
          data={finalArray}
        />
      </div>
    </div>
  );
}
