import React, { useState } from "react";
import { Button, Drawer, message, Select } from "antd";
import { Form, Input } from "antd";
import apiServices from "../../services/exportService";
import { apiEndpoints } from "../../utils/apiEndPoints";
const items = [
  { value: "PezalaAdmin", label: <span>PezalaAdmin</span> },
  { value: "Academic", label: <span> Academic</span> },
  { value: "Organization", label: <span> Organization </span> },
  { value: "Private", label: <span>Private </span> },
  { value: "Workshop", label: <span>Workshop </span> },
];

const TicketGenerationForm = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    const response = await apiServices.get(apiEndpoints.auth.profile);
    if (response.status === 200) {
      const { email, Phone } = response?.data;
      values["phone"] = Phone;
      values["email"] = email;
      values["username"] = values.project;
      const result = await fetch(apiEndpoints.ticket.create, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!result.ok) {
        messageApi.error("Oops something went wrong.");
      }
      const responseData = await result.json();
      messageApi.success(responseData?.message);
      form.resetFields();
      setIsSubmitting(false);
      setOpen(false);
    } else {
      setIsSubmitting(false);
      messageApi.error("Oops something went wrong.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Drawer title="Basic Drawer" open={open} onClose={() => setOpen(false)}>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Project"
            name="project"
            rules={[
              {
                required: true,
                message: "Please input your project!",
              },
            ]}
          >
            <Select options={items} />
          </Form.Item>

          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Issue"
            name="issue"
            rules={[
              {
                required: true,
                message: "Please input your issue!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button loading={isSubmitting} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default TicketGenerationForm;
