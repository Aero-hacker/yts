import { Tag } from "antd";

const EquipmentCard = ({ data, onEquipmentSelected, selectedEquipment }) => {
  return (
    <>
      <div
        onClick={() => onEquipmentSelected(data)}
        className={`flex flex-row gap-4 items-center bg-white border-solid ${
          selectedEquipment === data.id
            ? "border-primary bg-primary_light text-primary"
            : "border-gray-200 "
        } rounded-xl p-4 py-3 pl-5 cursor-pointer`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="33"
          height="33"
          fill="currentColor"
          class="bi bi-box-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"
          />
        </svg>
        <div className="flex flex-col w-full">
          <span className="text-md w-full mb-1 font-bold">{data.name}</span>
          <p className="text-primary text-sm font-semibold">
            ₹{data.product_total_cost === "null" ? 0 : data.product_total_cost}
          </p>
        </div>

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

export default EquipmentCard;
