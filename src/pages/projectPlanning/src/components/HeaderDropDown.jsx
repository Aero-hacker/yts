import { useDispatch, useSelector } from "react-redux";

import boardsSlice from "../redux/boardsSlice";

// eslint-disable-next-line react/prop-types
function HeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }) {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className=" py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}

      <div className=" bg-white shadow-md shadow-[#364e7e1a]  w-full  py-4">
        <h3 className="text-gray-600 font-semibold mx-4 mb-8 ">
          ALL BOARDS ({boards?.length})
        </h3>

        <div className=" dropdown-borad  ">
          {boards.map((board, index) => (
            <div
              className={` flex items-baseline space-x-2 px-5 py-2  ${
                board.isActive && " bg-[#635fc7] text-white"
              } `}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <p>{board.name}</p>
            </div>
          ))}

          <div
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className=" flex items-baseline space-x-2  text-[#635fc7] px-5 py-2"
          >
            <p>Create New Board </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
