import { useState } from "react";
import { Tag, Descriptions, Modal, Badge, Button, message } from "antd";
import { EyeFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import apiServices from "../../../services/exportService";
const ProductCard = ({ data, getEquipmentslist, setOpenChipBoardForm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const DeleteRequest = () => {
    apiServices
      .delete(
        `${apiEndpoints.Configuration.ChipBoard.Delete}${data.ChipBoardID}`
      )
      .then((Data) => {
        message.success("Chip Board Deleted Successfully");
        console.log(Data);
        setIsModalOpen(false);
        getEquipmentslist();
      })
      .catch((e) => console.log(e));
  };

  const items = [
    {
      key: "1",
      label: "Hardware ID",
      children: data.hardware_id,
      span: 4,
    },
    {
      key: "2",
      label: "Model Number",
      children: data.ModelNumber,
      span: 4,
    },
    {
      key: "3",
      label: "Description",
      children: data.Description,
      span: 4,
    },
    {
      key: "4",
      label: "Country Origin",
      children: data.CountryOrigin,
      span: 4,
    },
    {
      key: "5",
      label: "Created Date",
      children: moment(data.DtCrte).format("MMMM Do YYYY"),
      span: 4,
    },
    {
      key: "6",
      label: "Updated Date",
      children: moment(data.DtChd).format("MMMM Do YYYY"),
      span: 4,
    },
    {
      key: "7",
      label: "Action",
      children: (
        <>
          <Button
            type="primary"
            size="medium"
            icon={<EditOutlined />}
            style={{ width: "100px", marginRight: "1rem" }}
            onClick={() => {
              setOpenChipBoardForm({
                status: true,
                type: "Update",
                parentId: data.ChipBoardID,
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
          <span className="text-md w-full mb-1 font-medium">
            {data.hardware_id}
          </span>
          <p className="text-primary text-sm font-semibold">
            {data.ModelNumber}
          </p>
        </div>
        <EyeFilled
          style={{ fontSize: "22px", padding: "0.5rem", cursor: "pointer" }}
          onClick={() => {
            setIsModalOpen(true);
            console.log("Chip Board Data", data);
          }}
        />
      </div>
      <Modal
        title="Chip Board"
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
          title="Chip Board Data"
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

export default ProductCard;
