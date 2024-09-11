const ComponentCard = ({
  data,
  onComponentSelected,
  selectedComponent,
  level,
}) => {
  return (
    <>
      <div
        onClick={() => onComponentSelected(data, level)}
        className={`flex flex-row gap-4 items-center bg-white border-solid ${
          selectedComponent === data.id
            ? "border-primary bg-primary_light text-primary"
            : "border-gray-200 "
        } rounded-xl p-4 py-3 pl-5 cursor-pointer`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          fill="currentColor"
          class="bi bi-box-seam"
          viewBox="0 0 16 16"
        >
          <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
        </svg>
        <div className="flex flex-col w-full">
          <span className="text-md w-full mb-1 font-medium">{data.name}</span>
          <p className="text-primary text-sm font-semibold">
            ₹{data.product_total_cost === "null" ? 0 : data.product_total_cost}
          </p>
        </div>
        {/* <span className="text-md w-full">{data.name}</span> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </div>
    </>
  );
};

export default ComponentCard;
