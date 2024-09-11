import { useState } from "react";
import boardsSlice from "../redux/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Form, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";

// eslint-disable-next-line react/prop-types
function AddEditBoardModal({ setIsBoardModalOpen, type }) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onChange = (id, newValue) => {
    setNewColumns((prevState) => {
      const newState = [...prevState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onSubmit = (type) => {
    setIsBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardsSlice.actions.addBoard({ name, newColumns }));
    } else {
      dispatch(boardsSlice.actions.editBoard({ name, newColumns }));
    }
  };

  return (
    <div
      className="fixed right-0 top-0 px-2 py-4 bg-[rgba(0,0,0,0.5)] scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown overflow-auto"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsBoardModalOpen(false);
      }}
    >
      <div className=" scrollbar-hide bg-white max-w-md  w-full px-7 py-5">
        <h3 className="m-0">{type === "edit" ? "Edit" : "Add New"} Board</h3>
        <br />
        {/* Task Name */}

        <div className="flex flex-col">
          <Divider orientation="left">
            <p className="text-sm text-neutral-500">Board name</p>
          </Divider>

          <Form>
            <Form.Item>
              <Input
                autoFocus
                value={name}
                size="middle"
                id="board-name-input"
                onChange={(e) => setName(e.target.value)}
                placeholder="eg: Web design"
              />
            </Form.Item>
          </Form>
        </div>

        {/* Board Columns */}
        <Divider orientation="left">
          <p className="text-sm text-neutral-500">Board Columns</p>
        </Divider>

        <div className="flex flex-col">
          {newColumns.map((column, index) => (
            <div
              key={index}
              className=" flex items-center gap-3 justify-between"
            >
              <Form className="flex-1" size="middle">
                <Form.Item>
                  <Input
                    onChange={(e) => {
                      onChange(column.id, e.target.value);
                    }}
                    value={column.name}
                    className="w-[100%]"
                  />
                </Form.Item>
              </Form>
              <Button
                onClick={() => {
                  onDelete(column.id);
                }}
                size="small"
                className="-mt-3"
                danger
              >
                <CloseOutlined />
              </Button>
            </div>
          ))}
          <br />
          <div className="space-y-2">
            <Button
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", tasks: [], id: uuidv4() },
                ]);
              }}
              size="middle"
              className="w-full"
            >
              + Add New Column
            </Button>
            <Button
              onClick={() => {
                const isValid = validate();
                if (isValid === true) onSubmit(type);
              }}
              type="primary"
              size="middle"
              className="w-full"
            >
              {type === "add" ? "Create New Board" : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
