const ProductCard = ({ data }) => {
  return (
    <>
      <div
        className={`flex flex-row gap-4 items-center bg-white border-solid border-gray-200 rounded-xl p-4 py-3 pl-5 cursor-pointer`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-back"
          viewBox="0 0 16 16"
        >
          <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
        </svg>
        <div className="flex flex-col w-full">
          <span className="text-md w-full mb-1 font-medium">{data.name}</span>
          <p className="text-primary text-sm font-semibold">
            ₹{data.total_cost === "null" ? 0 : data.total_cost}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
