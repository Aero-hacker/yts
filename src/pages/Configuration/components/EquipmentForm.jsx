import { Button, Card, Drawer, Form, Input, Select, message } from "antd";
import apiServices from "../../../services/exportService";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import TextArea from "antd/es/input/TextArea";
import {
  readSelectedProjectId,
  readStudentId,
  readUserId,
} from "../../../services/localServices";
import { useEffect } from "react";
const BOMForm = ({
  setOpenEquipmentForm,
  openEquipmentForm,
  getEquipmentslist,
}) => {
  const [equipment_form] = Form.useForm();
  const handleCreateEquipment = (values) => {
    values["User"] = readUserId();
    values["STUDENT_ID"] = readStudentId();
    values["Project_ID"] = readSelectedProjectId();

    let APIURL =
      openEquipmentForm.type === "Create"
        ? apiEndpoints.Configuration.Equipment.Create
        : `${apiEndpoints.Configuration.Equipment.Edit}${openEquipmentForm.data.EquipmentID}/`;

    apiServices
      .post(APIURL, values)
      .then(() => {
        message.success(
          `Equipment ${
            openEquipmentForm.type === "Create" ? "Added" : "Updated"
          } Successfully`
        );
        getEquipmentslist();
        equipment_form.resetFields();
        setOpenEquipmentForm((prevState) => ({
          ...prevState,
          status: false,
          type: "",
        }));
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  };
  function UpdateValues() {
    equipment_form.setFieldsValue({
      ["EquipmentName"]: openEquipmentForm.data.EquipmentName,
      ["Description"]: openEquipmentForm.data.Description,
    });
  }
  let InitialReset = true;
  if (InitialReset) {
    equipment_form.resetFields();
    InitialReset = false;
  }
  if (openEquipmentForm.type === "Update") {
    UpdateValues();
  }
  return (
    <>
      <Drawer
        title={`${openEquipmentForm.type} a Equipment`}
        onClose={() =>
          setOpenEquipmentForm((prevState) => ({
            ...prevState,
            status: false,
            type: "",
          }))
        }
        open={openEquipmentForm.status}
      >
        <Form
          name="equipment_form"
          onFinish={handleCreateEquipment}
          layout="vertical"
          form={equipment_form}
        >
          <Form.Item
            label="Equipment Name"
            name="EquipmentName"
            rules={[
              {
                required: true,
                message: "Please input the Equipment Name!",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Equipment Description"
            name="Description"
            rules={[{ required: true, message: "Please input Description!" }]}
          >
            <TextArea size="large" />
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
