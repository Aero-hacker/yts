function ElipsisMenu({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
    <div
      className={
        type === "Boards"
          ? " absolute  top-16  right-5"
          : " absolute  top-6  right-4"
      }
    >
      <div className=" flex justify-end items-center text-left bg-white shadow-md">
        <div className=" w-40 text-sm z-50 font-medium py-1">
          <p
            onClick={() => {
              setOpenEditModal();
            }}
            className=" cursor-pointer text-gray-700 hover:bg-neutral-200 px-4 py-2"
          >
            Edit {type}
          </p>

          <p
            onClick={() => setOpenDeleteModal()}
            className=" cursor-pointer text-red-500 hover:bg-red-100 px-4 py-2"
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ElipsisMenu;
