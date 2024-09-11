import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";
import { Button, Dropdown, Form, Select, Tooltip } from "antd";
import { EllipsisOutlined, FullscreenOutlined } from "@ant-design/icons";
import NDelete from "../modals/NewDelete";
import NAddEditBoard from "../modals/NewAddEditBoardModal";
import NewAddEditTaskModal from "../modals/NewEditTaskModal";

// eslint-disable-next-line react/prop-types
function Header({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [deafultSelectedBoard, setDefaultSelectedBoard] = useState(0);
  const [boardType, setBoardType] = useState("add");
  const [isBoardNewModalOpen, setIsNewBoardModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
      setDefaultSelectedBoard(0);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  const items = [
    {
      key: "1",
      label: <p onClick={setOpenEditModal}>Edit Board</p>,
    },
    {
      key: "2",
      danger: true,
      label: <p onClick={setOpenDeleteModal}>Delete Board</p>,
    },
  ];

  const boardOptions = boards.map((board, index) => {
    return {
      label: board.name,
      value: index,
    };
  });

  useEffect(() => {
    setDefaultSelectedBoard(0);
  }, [boards]);

  return (
    <div className="py-2 px-4 bg-neutral-100">
      <header className=" flex justify-between items-center  ">
        <div className=" flex items-center space-x-2  md:space-x-4">
          <div className=" flex items-center ">
            <div className="flex gap-2 items-center">
              <Select
                defaultValue={deafultSelectedBoard}
                options={boardOptions}
                variant="borderless"
                style={{ minWidth: 100, textAlign: "left" }}
                className="bg-primary/10 rounded-md"
                onChange={(value) => {
                  dispatch(
                    boardsSlice.actions.setBoardActive({ index: value })
                  );
                }}
                size="middle"
              />{" "}
              <Button
                onClick={() => {
                  setIsNewBoardModalOpen(true);
                }}
                size="middle"
                type="dashed"
              >
                New Board
              </Button>{" "}
              <Dropdown
                trigger={["click"]}
                menu={{
                  items,
                }}
              >
                <Button
                  size="middle"
                  type="dashed"
                  onClick={() => {
                    setBoardType("edit");
                  }}
                >
                  <p>Board options</p>
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className=" flex gap-2">
          <Button
            size="middle"
            type="dashed"
            onClick={() => {
              setIsTaskModalOpen((prevState) => !prevState);
            }}
          >
            New Task
          </Button>
        </div>
      </header>
      {isTaskModalOpen && (
        <NewAddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}{" "}
      {isBoardNewModalOpen && (
        <NAddEditBoard
          type="add"
          setIsBoardModalOpen={setIsNewBoardModalOpen}
        />
      )}
      {isBoardModalOpen && (
        <NAddEditBoard
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <NDelete
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
