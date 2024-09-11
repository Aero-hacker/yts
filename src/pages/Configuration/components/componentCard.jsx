import { useState } from "react";
import { Tag, Descriptions, Modal, Badge, Button, message } from "antd";
import { EyeFilled, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import apiServices from "../../../services/exportService";
const ComponentCard = ({
  data,
  onComponentSelected,
  selectedComponent,
  level,
  getEquipmentslist,
  setOpenComponentForm,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [DescItems, setDescItems] = useState([]);
  const DeleteRequest = (ComponentID) => {
    apiServices
      .delete(`${apiEndpoints.Configuration.Component.Delete}${ComponentID}`)
      .then((Data) => {
        message.success("Component Deleted Successfully");
        console.log(Data);
        setIsModalOpen(false);
        getEquipmentslist();
      })
      .catch((e) => console.log(e));
  };

  function SetItemsData(data) {
    setDescItems([
      {
        key: "1",
        label: "Component Name",
        children: data.ComponentName,
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
        label: "Component Type",
        children: data.ComponentType,
        span: 4,
      },
      {
        key: "4",
        label: "Origin Country",
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
                setOpenComponentForm({
                  status: true,
                  type: "Update",
                  parentId: data.ComponentID,
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
                DeleteRequest(data.ComponentID);
              }}
            >
              Delete
            </Button>
          </>
        ),
      },
    ]);
  }

  return (
    <>
      {data.Comp.map((Dataa, i) => (
        <div
          className={`flex flex-row gap-4 items-center bg-white border-solid ${
            selectedComponent === Dataa.ComponentID
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
            <span className="text-md w-full mb-1 font-medium">
              {Dataa.ComponentName}
            </span>
            <p className="text-primary text-sm font-semibold">
              {Dataa.ModelNumber}
            </p>
          </div>
          <EyeFilled
            style={{ fontSize: "22px", padding: "0.5rem", cursor: "pointer" }}
            onClick={() => {
              SetItemsData(Dataa);
              setIsModalOpen(true);
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
            onClick={() => {
              onComponentSelected(data, level, Dataa);
              console.log("Component Selected", Dataa);
            }}
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </div>
      ))}
      <Modal
        title="Component"
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
          title="Component Data"
          bordered
          items={DescItems}
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

export default ComponentCard;
