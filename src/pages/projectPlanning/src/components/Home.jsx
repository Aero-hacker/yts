import { useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";

function Home() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  // const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div className={"flex h-[61vh] bg-neutral-50"}>
      {/* <Sidebar
        setIsBoardModalOpen={setIsBoardModalOpen}
        isBoardModalOpen={isBoardModalOpen}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      /> */}

      <div className="overflow-x-auto flex custom-scrollbar">
        {columns.length > 0 ? (
          <>
            {columns.map((col, index) => (
              <Column key={index} colIndex={index} />
            ))}
            {/* <Button
              onClick={() => {
                setIsBoardModalOpen(true);
              }}
              size="middle"
              type="default"
              className="mt-3 ml-3 min-w-[200px]"
            >
              + Add Column
            </Button> */}
          </>
        ) : (
          <>
            <EmptyBoard type="edit" />
          </>
        )}
      </div>
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Home;
