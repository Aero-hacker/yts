import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import Task from "./Task";

// eslint-disable-next-line react/prop-types
function Column({ colIndex }) {
  const columnColors = [
    "bg-red-500/30",
    "bg-yellow-500/30",
    "bg-blue-500/30",
    "bg-purple-500/30",
    "bg-green-500/30",
    "bg-gray-500/30",
    "bg-red-500/10",
    "bg-yellow-500/10",
    "bg-blue-500/10",
    "bg-purple-500/10",
    "bg-green-500/10",
    "bg-gray-500/10",
    "bg-red-500/5",
    "bg-yellow-500/5",
    "bg-blue-500/5",
    "bg-purple-500/5",
    "bg-green-500/5",
    "bg-gray-500/5",
  ];

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(
        boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div onDrop={handleOnDrop} onDragOver={handleOnDragOver} className="p-2 flex flex-col">
      <div
        className={`font-semibold flex items-center justify-between gap-2 uppercase p-2.5 ${col.color}/30 rounded-t-md`}
      >
        <div className="flex gap-2 items-center">
          <p className={`rounded-full w-2 h-2 ${col.color}`} />
          <span>{col.name}</span>
        </div>
        <span>{col.tasks.length}</span>
      </div>

      <div className={`p-2 custom-scrollbar flex-1 overflow-y-auto max-h-[90%] w-[300px] ${col.color}/5 rounded-b-md`}>
        {col.tasks.length === 0 ? (
          <p className="text-neutral-500 my-4">No tasks here</p>
        ) : (
          <div className="grid gap-1 p- overflow-hidden">
            {col.tasks.map((_task, index) => (
              <Task key={index} taskIndex={index} colIndex={colIndex} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;
