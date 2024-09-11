import { Button, Form, List, Modal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import Subtask from "../components/Subtask";
import AddEditTaskModal from "./AddEditTaskModal";
import { Dropdown, Select } from "antd";
import NDelete from "./NewDelete";
import { EllipsisOutlined } from "@ant-design/icons";
import NewAddEditTaskModal from "./NewEditTaskModal";
// eslint-disable-next-line react/prop-types
const NTaskModal = ({ taskIndex, colIndex, setIsTaskModalOpen }) => {
  const handleCancel = () => {
    setIsTaskModalOpen(false);
  };
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

  const onClose = () => {
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
    <>
      <Modal
        title="Task Details"
        open={true}
        onOk={onClose}
        onCancel={handleCancel}
      >
        <div className=" relative flex gap-4 justify-between w-full items-center">
          <h1 className="text-base m-0 text-pretty line-clamp-2 font-semibold">
            {task.title}
          </h1>
          <Dropdown
            placement="bottomRight"
            trigger={["click"]}
            menu={{
              items,
            }}
          >
            <Button size="small">
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        </div>

        {subtasks.length == 0 ? (
          <div className="my-3 space-y-2">
            <span className="block text-neutral-500">No SubTasks</span>
            <Button onClick={setOpenEditModal} size="middle">
              Add subtask
            </Button>
          </div>
        ) : (
          <>
            <p className="my-4 text-left">
              Subtasks ({completed}/{subtasks.length})
            </p>
            <List
              size="small"
              bordered
              className="my-4"
              dataSource={subtasks}
              renderItem={(item, index) => (
                <List.Item>
                  <Subtask
                    index={index}
                    taskIndex={taskIndex}
                    colIndex={colIndex}
                    key={index}
                  />
                </List.Item>
              )}
            />
          </>
        )}

        <Form layout="vertical" size="middle">
          <Form.Item label="Status">
            <Select
              value={status}
              onChange={onChange}
              options={selectOptions}
            />
          </Form.Item>
        </Form>
        {isDeleteModalOpen && (
          <NDelete
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            onDeleteBtnClick={onDeleteBtnClick}
            type="task"
            title={task.title}
          />
        )}

        {isAddTaskModalOpen && (
          <NewAddEditTaskModal
            setIsAddTaskModalOpen={setIsAddTaskModalOpen}
            setIsTaskModalOpen={setIsTaskModalOpen}
            type="edit"
            taskIndex={taskIndex}
            prevColIndex={colIndex}
          />
        )}
      </Modal>
    </>
  );
};
export default NTaskModal;
