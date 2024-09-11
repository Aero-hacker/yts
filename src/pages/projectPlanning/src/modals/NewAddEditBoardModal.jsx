import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import boardsSlice from "../redux/boardsSlice";

// eslint-disable-next-line react/prop-types
const NAddEditBoard = ({ setIsBoardModalOpen, type }) => {
  const handleOk = () => {
    setIsBoardModalOpen(false);
  };
  const handleCancel = () => {
    setIsBoardModalOpen(false);
  };
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [name, setName] = useState("");
  // const [newColumns, setNewColumns] = useState([
  //   { name: "Todo", tasks: [], id: uuidv4() },
  //   { name: "In-Progress", tasks: [], id: uuidv4() },
  //   { name: "Review", tasks: [], id: uuidv4() },
  //   { name: "Hold", tasks: [], id: uuidv4() },
  //   { name: "Completed", tasks: [], id: uuidv4() },
  //   { name: "Cancelled", tasks: [], id: uuidv4() },
  // ]);
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", tasks: [], id: uuidv4(), color: "bg-red-500" },
    { name: "In-Progress", tasks: [], id: uuidv4(), color: "bg-yellow-500" },
    { name: "Review", tasks: [], id: uuidv4(), color: "bg-blue-500" },
    { name: "Hold", tasks: [], id: uuidv4(), color: "bg-purple-500" },
    { name: "Completed", tasks: [], id: uuidv4(), color: "bg-green-500" },
    { name: "Cancelled", tasks: [], id: uuidv4(), color: "bg-gray-500" },
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
  useEffect(() => {
    if (type === "edit") {
      console.log(name);
      setName(name);
    }
  }, []);
  console.log(name)
  return (
    <>
      <Modal
        title={`${type === "edit" ? "Edit" : "Add New"} Board`}
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <div className="flex flex-col">
          <Form layout="vertical" onFinish={() => onSubmit(type)}>
            <Form.Item
              label="Name"
              name="boardname"
              initialValue={name}
              rules={[{ required: true, message: "Please enter a Board name" }]}
            >
              <Input
                autoFocus
                size="middle"
                onChange={(e) => setName(e.target.value)}
                placeholder="eg: Web design"
              />
            </Form.Item>
            <div className="flex gap-2 items-center justify-end">
              <Button
                key="cancel"
                onClick={() => {
                  setIsBoardModalOpen(false);
                }}
                size="middle"
              >
                Cancel
              </Button>
              <Button htmlType="submit" size="middle" type="primary">
                {type === "add" ? "Create" : "Save"}
              </Button>
            </div>
          </Form>
        </div>
        <div className="flex flex-col">
          {/* <Form size="middle">
            {newColumns.map((column, index) => (
              <div key={index} className="flex items-center gap-3">
                <Form.Item className="w-full">
                  <Input
                    onChange={(e) => {
                      onChange(column.id, e.target.value);
                    }}
                    value={column.name}
                    className="w-[100%]"
                  />
                </Form.Item>
                <Button
                  onClick={() => {
                    onDelete(column.id);
                  }}
                  size="small"
                  className="-mt-3"
                >
                  <CloseOutlined />
                </Button>
              </div>
            ))}
          </Form> */}
          {/* <div className="space-y-2">
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
          </div> */}
        </div>
      </Modal>
    </>
  );
};
export default NAddEditBoard;
