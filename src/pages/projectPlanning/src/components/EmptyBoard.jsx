import React, { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { Button } from "antd";
import NAddEditBoard from "../modals/NewAddEditBoardModal";

function EmptyBoard({ type }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  return (
    <div className=" bg-white w-full flex flex-col  items-center justify-center">
      <h3 className=" text-gray-500 font-normal text-sm">
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <Button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        size="middle"
      >
        {type === "edit" ? "Add New Column" : "Add New Board"}
      </Button>
      {isBoardModalOpen && (
        <NAddEditBoard type={type} setIsBoardModalOpen={setIsBoardModalOpen} />
      )}
    </div>
  );
}

export default EmptyBoard;
