import { Button, Card, Drawer, Form, Input, Select, message } from "antd";
import apiServices from "../../../services/exportService";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import TextArea from "antd/es/input/TextArea";
import {
  readSelectedProjectId,
  readStudentId,
  readUserId,
} from "../../../services/localServices";
import { useEffect, useState } from "react";
const BOMForm = ({
  setOpenChipBoardForm,
  openChipBoardForm,
  getEquipmentslist,
}) => {
  const [chipboard_form] = Form.useForm();

  const [ChipBoardList, setChipBoardList] = useState([]);
  useEffect(() => {
    apiServices
      .get(`${apiEndpoints.Configuration.FormData.HardwareList}`)
      .then((Data) => {
        console.log(Data);
        let TempData = [];
        Data.data.map((dataa) => {
          TempData.push({
            label: dataa.hardware_name,
            value: dataa.hardware_id,
          });
        });
        console.log(TempData);
        setChipBoardList(TempData);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleCreateEquipment = (values) => {
    values["User"] = readUserId();
    values["STUDENT_ID"] = readStudentId();
    values["Project_ID"] = readSelectedProjectId();
    if (openChipBoardForm.parentId.ComponentID) {
      values["ComponentID"] = openChipBoardForm.parentId.ComponentID;
    }
    if (openChipBoardForm.parentId.EquipmentID) {
      values["EquipmentID"] = openChipBoardForm.parentId.EquipmentID;
    }
    let APIURL =
      openChipBoardForm.type === "Create"
        ? apiEndpoints.Configuration.ChipBoard.Create
        : `${apiEndpoints.Configuration.ChipBoard.Edit}${openChipBoardForm.data.ChipBoardID}/`;

    apiServices
      .post(APIURL, values)
      .then(() => {
        message.success("Chip Board Added Successfully");
        chipboard_form.resetFields();
        getEquipmentslist();

        setOpenChipBoardForm((prevState) => ({
          ...prevState,
          status: false,
          type: "",
        }));
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  };

  function UpdateValues() {
    chipboard_form.setFieldsValue({
      ["hardware_id"]: openChipBoardForm.data.hardware_id,
      ["Description"]: openChipBoardForm.data.Description,
      ["ModelNumber"]: openChipBoardForm.data.ModelNumber,
      ["CountryOrigin"]: openChipBoardForm.data.CountryOrigin,
    });
  }
  let InitialReset = true;
  if (InitialReset) {
    chipboard_form.resetFields();
    InitialReset = false;
  }
  if (openChipBoardForm.type === "Update") {
    UpdateValues();
  }
  return (
    <>
      <Drawer
        title={`${openChipBoardForm.type} a Chip Board`}
        onClose={() =>
          setOpenChipBoardForm((prevState) => ({
            ...prevState,
            status: false,
            type: "",
          }))
        }
        open={openChipBoardForm.status}
      >
        <Form
          name="chipboard_form"
          form={chipboard_form}
          onFinish={handleCreateEquipment}
          layout="vertical"
        >
          <Form.Item
            label="Chip Board Name"
            name="hardware_id"
            rules={[
              { required: true, message: "Please input the Chip Board Name!" },
            ]}
          >
            <Select
              size="large"
              placeholder="Please Select"
              options={ChipBoardList}
            />
          </Form.Item>

          <Form.Item
            label="Chip Board Description"
            name="Description"
            rules={[{ required: true, message: "Please input Description!" }]}
          >
            <TextArea size="large" />
          </Form.Item>

          <Form.Item
            label="Model Number"
            name="ModelNumber"
            rules={[
              { required: true, message: "Please input the Model Number!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Country Origin"
            name="CountryOrigin"
            rules={[
              { required: true, message: "Please input the Country Origin!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              className="w-full"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default BOMForm;
