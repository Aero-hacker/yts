import React, { useState } from "react";
import { Button, Drawer, Form } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import boardsSlice from "../redux/boardsSlice";
import { DatePicker, Divider, Input, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const NewAddEditTaskModal = ({
  type,
  device,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) => {
  const [open, setOpen] = useState(true);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setIsAddTaskModalOpen(false);
  };
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

  return (
    <>
      <Drawer
        width={500}
        title={type === "edit" ? "Edit Task" : "Add New Task"}
        onClose={onClose}
        open={open}
      >
        <div
          onClick={(e) => {
            if (e.target !== e.currentTarget) {
              return;
            }
            setIsAddTaskModalOpen(false);
          }}
        >
          <div>
            <Form layout="vertical">
              <Form.Item label="Task name">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder=" e.g Take coffee break"
                />
              </Form.Item>
              <Form.Item label="Description">
                <Input.TextArea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Enter start & end date">
                {type === "edit" ? (
                  <>
                    <DatePicker.RangePicker
                      className="w-full"
                      value={[dayjs(task.start), dayjs(task.end)]}
                      onChange={(e) => {
                        setDate([e[0].$d, e[1].$d]);
                      }}
                    />
                  </>
                ) : (
                  <DatePicker.RangePicker
                    className="w-full"
                    onChange={(e) => {
                      setDate([e[0].$d, e[1].$d]);
                    }}
                  />
                )}
              </Form.Item>

              <div className="flex flex-col space-y-3">
                <span>-- Subtasks --</span>
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
              <br />
              <div className="flex flex-col space-y-3">
                <span>-- Status --</span>
                <Select
                  defaultValue={status}
                  onChange={onChangeStatus}
                  options={options}
                />

                <Button
                  type="primary"
                  onClick={() => {
                    const isValid = validate();
                    if (isValid) {
                      onSubmit(type);
                      setIsAddTaskModalOpen(false);
                      type === "edit" && setIsTaskModalOpen(false);
                    }
                  }}
                >
                  {type === "edit" ? "Save Changes" : "Create task"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default NewAddEditTaskModal;
