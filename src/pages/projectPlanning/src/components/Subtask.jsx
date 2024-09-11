import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";

import boardsSlice from "../redux/boardsSlice";

function Subtask({ index, taskIndex, colIndex }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const subtask = task.subtasks.find((subtask, i) => i === index);
  const checked = subtask.isCompleted;

  const onChange = () => {
    dispatch(
      boardsSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    );
  };

  return (
    <div className=" w-full flex items-center justify-start gap-4 select-none">
      <Checkbox checked={checked} onChange={onChange}>
        <p className={checked ? " line-through opacity-60" : ""}>
          {subtask.title}
        </p>
      </Checkbox>
    </div>
  );
}

export default Subtask;
