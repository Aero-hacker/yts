import { Button, Card, Drawer, Form, Input, Select, message } from "antd";
import apiServices from "../../../services/exportService";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import TextArea from "antd/es/input/TextArea";
import {
  readSelectedProjectId,
  readStudentId,
  readUserId,
} from "../../../services/localServices";
const BOMForm = ({
  setOpenComponentForm,
  openComponentForm,
  getEquipmentslist,
}) => {
  const [component_form] = Form.useForm();

  const handleCreateEquipment = (values) => {
    values["User"] = readUserId();
    values["STUDENT_ID"] = readStudentId();
    values["Project_ID"] = readSelectedProjectId();
    if (openComponentForm.parentId.ComponentID) {
      values["parent_component"] = openComponentForm.parentId.ComponentID;
    }
    if (openComponentForm.parentId.EquipmentID) {
      values["EquipmentID"] = openComponentForm.parentId.EquipmentID;
    }

    let APIURL =
      openComponentForm.type === "Create"
        ? apiEndpoints.Configuration.Component.Create
        : `${apiEndpoints.Configuration.Component.Edit}${openComponentForm.data.ComponentID}/`;

    apiServices
      .post(APIURL, values)
      .then(() => {
        message.success("Component Added Successfully");
        component_form.resetFields();

        getEquipmentslist();
        setOpenComponentForm((prevState) => ({
          ...prevState,
          status: false,
          type: "",
        }));
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  };
  function UpdateValues() {
    component_form.setFieldsValue({
      ["ComponentName"]: openComponentForm.data.ComponentName,
      ["ComponentType"]: openComponentForm.data.ComponentType,
      ["ModelNumber"]: openComponentForm.data.ModelNumber,
      ["CountryOrigin"]: openComponentForm.data.CountryOrigin,
    });
  }
  let InitialReset = true;
  if (InitialReset) {
    component_form.resetFields();
    InitialReset = false;
  }
  if (openComponentForm.type === "Update") {
    UpdateValues();
  }
  return (
    <>
      <Drawer
        title={`${openComponentForm.type} a Component`}
        onClose={() =>
          setOpenComponentForm((prevState) => ({
            ...prevState,
            status: false,
            type: "",
          }))
        }
        open={openComponentForm.status}
      >
        <Form
          name="component_form"
          form={component_form}
          onFinish={handleCreateEquipment}
          layout="vertical"
        >
          <Form.Item
            label="Component Name"
            name="ComponentName"
            rules={[
              { required: true, message: "Please input the Component Name!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Component Type"
            name="ComponentType"
            rules={[
              { required: true, message: "Please input the Component Type!" },
            ]}
          >
            <Input size="large" />
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
