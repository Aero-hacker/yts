import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import boardsSlice from "../redux/boardsSlice";
import { Button, DatePicker, Divider, Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function AddEditTaskModal({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);
  const [date, setDate] = useState();

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const options = columns.map((col, index) => {
    return {
      value: index,
      label: col.name,
    };
  });

  const onChangeStatus = (e, d) => {
    setStatus(d.label);
    setNewColIndex(d.value);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          id: crypto.randomUUID(),
          title,
          description,
          subtasks,
          status,
          dates: [JSON.stringify(date[0]), JSON.stringify(date[1])],
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
          dates: [JSON.stringify(date[0]), JSON.stringify(date[1])],
        })
      );
    }
  };

  useEffect(() => {
    if (type === "edit") {
      let newArr = [dayjs(task.start), dayjs(task.end)];
      setDate(newArr);
    }
  }, []);

  console.log(task);

  return (
    <div
      className={
        device === "mobile"
          ? "fixed flex dropdown inset-0 bg-[rgba(0,0,0,0.5)] z-50"
          : "fixed flex inset-0 bg-[rgba(0,0,0,0.5)] z-50"
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      {/* Modal Section */}

      <div
        className=" scrollbar-hide overflow-y-auto  bg-white
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full p-6"
      >
        <h3 className=" text-lg m-0">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-500">Task Name</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=" e.g Take coffee break"
            id="task-name-input"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-500">Description</label>
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          />
          {type === "edit" ? (
            <>
              <DatePicker.RangePicker
                value={[dayjs(task.start), dayjs(task.end)]}
                onChange={(e) => {
                  setDate([e[0].$d, e[1].$d]);
                }}
              />
              {/* <p>{JSON.stringify(task.start)}</p> */}
            </>
          ) : (
            <DatePicker.RangePicker
              onChange={(e) => {
                setDate([e[0].$d, e[1].$d]);
              }}
            />
          )}
        </div>

        <div className="flex flex-col space-y-3">
          <Divider orientation="left">Subtasks</Divider>
          {subtasks.map((subtask, index) => (
            <div key={index} className=" flex items-center gap-3 w-full ">
              <Input
                onChange={(e) => {
                  onChangeSubtasks(subtask.id, e.target.value);
                }}
                value={subtask.title}
                placeholder=" e.g Take coffee break"
              />
              <Button
                onClick={() => {
                  onDelete(subtask.id);
                }}
                danger
              >
                <CloseOutlined />
              </Button>
            </div>
          ))}

          <Button
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
          >
            Add New Subtask
          </Button>
        </div>

        <div className="flex flex-col space-y-3">
          <Divider orientation="left">Current Status</Divider>

          <Select
            defaultValue={status}
            onChange={onChangeStatus}
            options={options}
          />

          <Button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setIsAddTaskModalOpen(false);
                type === "edit" && setIsTaskModalOpen(false);
              }
            }}
          >
            {type === "edit" ? " save edit" : "Create task"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
