import { Button, Card, Drawer, Form, Input, InputNumber, Select } from "antd";
import apiServices from "../../../services/exportService";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import TextArea from "antd/es/input/TextArea";
import { readUserId } from "../../../services/localServices";

const ProductForm = ({
  bomRequestId,
  getEquipmentslist,
  setOpenBomForm,
  openBomForm,
  type,
}) => {
  const handleCreateProduct = (values) => {
    console.log(openBomForm);
    values["bom_id"] = openBomForm.parentId;
    values["user_id"] = readUserId();

    apiServices
      .post(`${apiEndpoints.home.initialProcess.bom.createProduct}`, values)
      .then(() => {
        getEquipmentslist(bomRequestId);
        setOpenBomForm((prevState) => ({
          ...prevState,
          status: false,
          type: "",
        }));
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  };

  return (
    <>
      <Drawer
        title={`Create a new Product`}
        onClose={() =>
          setOpenBomForm((prevState) => ({
            ...prevState,
            status: false,
            type: "",
          }))
        }
        open={openBomForm.status}
      >
        <Form
          name="product_form"
          onFinish={handleCreateProduct}
          initialValues={{ bom_id: 1, user_id: 152, unit_of_measure: "Each" }}
          layout="vertical"
        >
          <Form.Item
            label="Serial Number"
            name="serial_number"
            rules={[
              { required: true, message: "Please input the Serial Number!" },
            ]}
          >
            <Input size="large" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the Name!" }]}
          >
            <Input size="large" className="w-full" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea size="large" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Unit of Measure"
            name="unit_of_measure"
            rules={[
              { required: true, message: "Please input the Unit of Measure!" },
            ]}
          >
            <Input size="large" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input the Quantity!" }]}
          >
            <InputNumber size="large" className="w-full" min={1} />
          </Form.Item>

          <Form.Item
            label="Cost"
            name="cost"
            rules={[{ required: true, message: "Please input the Cost!" }]}
          >
            <InputNumber size="large" className="w-full" min={0} step={0.01} />
          </Form.Item>

          <Form.Item
            label="Lead Time"
            name="lead_time"
            rules={[{ required: true, message: "Please input the Lead Time!" }]}
          >
            <InputNumber size="large" className="w-full" min={0} />
          </Form.Item>

          <Form.Item
            label="Shelf Life"
            name="shelf_life"
            rules={[
              { required: true, message: "Please input the Shelf Life!" },
            ]}
          >
            <InputNumber size="large" className="w-full" min={0} />
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

export default ProductForm;
