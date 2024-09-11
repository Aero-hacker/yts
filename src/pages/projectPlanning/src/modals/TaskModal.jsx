import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import Subtask from "../components/Subtask";
import AddEditTaskModal from "./AddEditTaskModal";
import { Button, Dropdown, Select } from "antd";
import NDelete from "./NewDelete";
import { EllipsisOutlined } from "@ant-design/icons";

function TaskModal({ taskIndex, colIndex, setIsTaskModalOpen }) {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const onChange = (e, d) => {
    setStatus(e);
    setNewColIndex(d.value);
  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
      setIsTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const selectOptions = columns.map((col, index) => {
    return {
      value: index,
      label: col.name,
    };
  });

  const items = [
    {
      key: "1",
      label: <p onClick={setOpenEditModal}>Edit Task</p>,
    },
    {
      key: "2",
      danger: true,
      label: <p onClick={setOpenDeleteModal}>Delete Task</p>,
    },
  ];

  return (
    <div
      onClick={onClose}
      className=" fixed right-0 top-0 px-2 py-4 z-50 left-0 bottom-0 justify-center items-center flex dropdown bg-[rgba(0,0,0,0.5)]"
    >
      {/* MODAL SECTION */}

      <div className="max-h-[95vh]  my-auto  bg-white shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8">
        <div className=" relative flex   justify-between w-full items-center">
          <h1 className="text-lg mt-0 break-all">{task.name}</h1>
          <Dropdown
            menu={{
              items,
            }}
          >
            <Button size="middle">
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        </div>

        <p className="my-4 text-left">
          Subtasks ({completed} of {subtasks.length})
        </p>

        {/* subtasks section */}

        <div className=" mt-3 space-y-1">
          {subtasks.map((subtask, index) => {
            return (
              <Subtask
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={index}
              />
            );
          })}
        </div>

        {/* Current Status Section */}

        <div className="flex flex-col space-y-3">
          <label className="  text-sm text-gray-500">
            Current Status
          </label>
          <Select
            size="middle"
            value={status}
            onChange={onChange}
            options={selectOptions}
          />
        </div>
      </div>
      {isDeleteModalOpen && (
        <NDelete
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
}

export default TaskModal;
