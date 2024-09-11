import { Button, Card, Drawer, Form, Input, Select } from "antd";
import apiServices from "../../../services/exportService";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import TextArea from "antd/es/input/TextArea";

const BOMForm = ({
  bomRequestId,
  getEquipmentslist,
  setOpenBomForm,
  openBomForm,
  type,
  selectedParentId,
}) => {
  const [form] = Form.useForm();

  const handleCreateEquipment = (values) => {
    values["request_id"] = bomRequestId;
    if (openBomForm.type === "equipment") {
      values["bom_type"] = openBomForm.type;
    } else {
      values["bom_type"] = openBomForm.type;
      values["parent_id"] = openBomForm.parentId;
    }

    apiServices
      .post(`${apiEndpoints.home.initialProcess.bom.creatBom}`, values)
      .then(() => {
        getEquipmentslist(bomRequestId);
        setOpenBomForm((prevState) => ({
          ...prevState,
          status: false,
          type: "",
        }));
        form.resetFields();
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  };

  return (
    <>
      <Drawer
        title={`Create a new ${openBomForm.type}`}
        onClose={() => {
          setOpenBomForm((prevState) => ({
            ...prevState,
            status: false,
            type: "",
          }));
          form.resetFields();
        }}
        open={openBomForm.status}
      >
        <Form
          name="component_form"
          onFinish={handleCreateEquipment}
          layout="vertical"
          form={form}
        >
          <Form.Item label="Item Type" name="bom_type">
            <Card className="text-lg border-primary ChangePaddingCardBody">
              {openBomForm.type}
            </Card>
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item label="Description" name="description">
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
