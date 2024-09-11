import { useState } from "react";
import { Tag, Descriptions, Modal, Badge, Button, message } from "antd";
import { EyeFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import apiServices from "../../../services/exportService";
const EquipmentCard = ({
  key,
  data,
  onEquipmentSelected,
  selectedEquipment,
  getEquipmentslist,
  setOpenEquipmentForm,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const DeleteRequest = () => {
    apiServices
      .delete(
        `${apiEndpoints.Configuration.Equipment.Delete}${data.EquipmentID}`
      )
      .then((EquData) => {
        message.success("Equipment Deleted Successfully");
        console.log(EquData);
        setIsModalOpen(false);
        getEquipmentslist();
      })
      .catch((e) => console.log(e));
  };

  const items = [
    {
      key: "1",
      label: "Equipment Name",
      children: data.EquipmentName,
      span: 4,
    },
    {
      key: "2",
      label: "Description",
      children: data.Description,
      span: 4,
    },
    {
      key: "3",
      label: "Created Date",
      children: moment(data.DtCrte).format("MMMM Do YYYY"),
      span: 4,
    },
    {
      key: "4",
      label: "Updated Date",
      children: moment(data.DtChd).format("MMMM Do YYYY"),
      span: 4,
    },
    {
      key: "5",
      label: "Action",
      children: (
        <>
          <Button
            type="primary"
            size="medium"
            icon={<EditOutlined />}
            style={{ width: "100px", marginRight: "1rem" }}
            onClick={() => {
              setOpenEquipmentForm({
                status: true,
                type: "Update",
                parentId: data.EquipmentID,
                data: data,
              });
            }}
          >
            Update
          </Button>
          <Button
            type="primary"
            size="medium"
            icon={<DeleteOutlined />}
            danger
            style={{ width: "100px" }}
            onClick={() => {
              DeleteRequest();
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
  return (
    <>
      <div
        className={`flex flex-row gap-2 items-center bg-white border-solid ${
          selectedEquipment === data.EquipmentID
            ? "border-primary bg-primary_light text-primary"
            : "border-gray-200 "
        } rounded-xl p-4 py-3 pl-5 `}
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
          <p className="text-md w-full mb-1 font-bold">{data.EquipmentName}</p>
          <span className="text-primary text-sm font-semibold">
            {data.Description}
          </span>
        </div>

        <EyeFilled
          style={{ fontSize: "22px", padding: "0.5rem", cursor: "pointer" }}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          fill="currentColor"
          className="bi bi-chevron-right"
          viewBox="0 0 16 16"
          style={{ padding: "0.5rem", cursor: "pointer" }}
          onClick={() => {
            onEquipmentSelected(data);
            console.log("Equipment Selected", data);
          }}
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </div>
      <Modal
        title="Equipment"
        width={800}
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            {/* <Button
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Close
            </Button> */}
          </>
        )}
      >
        <Descriptions
          title="Equipment Data"
          bordered
          items={items}
          column={{
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
        />
      </Modal>
    </>
  );
};

export default EquipmentCard;
