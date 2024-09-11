import { useState } from "react";
import { useSelector } from "react-redux";
import NTaskModal from "../modals/NTaskModal";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };
  function formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  }

  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        tabIndex={0}
        draggable
        onDragStart={handleOnDrag}
        className={`text-left cursor-pointer p-2 -outline-offset-[3px] outline-black/40 outline-2 rounded hover:outline-dashed ${col.color}/10 transition-transform active:scale-95`}
      >
        <div className="space-y-1">
          <p className="font-semibold text-pretty leading-normal line-clamp-1">
            {task.title}
          </p>
          <p className="text-xs line-clamp-1">{task.description}</p>
          <p className="text-xs">
            {formatDate(new Date(task.start))} -&nbsp;
            {formatDate(new Date(task.end))}
          </p>
          {subtasks.length !== 0 && (
            <p className="text-xs">
              {completed}/{subtasks.length} Subtask
            </p>
          )}
        </div>
      </div>
      {isTaskModalOpen && (
        <NTaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
