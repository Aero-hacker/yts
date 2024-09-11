import { useDispatch, useSelector } from "react-redux";

import boardsSlice from "../redux/boardsSlice";

// eslint-disable-next-line react/prop-types
function Sidebar({ isSideBarOpen }) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `w-[200px] bg-white items-center`
            : `absolute bottom-14 cursor-pointer`
        }
      >
        <div className="relative">
          {isSideBarOpen && (
            <div className=" bg-neutral-100 p-2 px-2">
              <div className="flex flex-col h-[75vh] overflow-y-auto justify-between ">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={` flex items-baseline space-x-2 py-2 cursor-pointer hover:bg-neutral-200 pl-4  ${
                        board.isActive &&
                        " bg-neutral-500 text-white hover:bg-neutral-500"
                      } `}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <p className="font-semibold truncate">{board.name}</p>
                    </div>
                  ))}
                  <br />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
