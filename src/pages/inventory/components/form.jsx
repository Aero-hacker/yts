import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import apiServices from "../../../services/exportService";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import axios from "axios";
import { hardwareList } from "../data/dummyData";
import {
  readSelectedProjectId,
  readStudentId,
  readUserId,
} from "../../../services/localServices";

const InventoryAddItemForm = ({ setOpenModal, refresh }) => {
  const [form] = Form.useForm();
  const [serialNumberFields, setSerialNumberFields] = useState([]);
  const [hardwares, setHardwares] = useState([]);

  useEffect(() => {
    onInitialize();
  }, []);

  const onInitialize = () => {
    setHardwares(convertToSelectOptions(hardwareList));
    // axios
    //   .get("https://adminapi.pezala.in/api/hardware/get-hardware-listing/")
    //   .then((res) => {
    //     console.log(res);
    //   });
  };

  const convertToSelectOptions = (hardwareList) => {
    return hardwareList.map((hardware) => ({
      value: hardware.hardware_id,
      label: `${hardware.hardware_name} - ${hardware.model_name}`,
    }));
  };

  const onFinish = (values) => {
    const serialNumbers = values.serial_numbers.map(
      (item) => item.serial_number
    );

    const updatedValues = { ...values, serial_number: serialNumbers };
    delete updatedValues.serial_numbers;

    updatedValues["project_id"] = readSelectedProjectId();
    updatedValues["user_id"] = readUserId();
    updatedValues["student_id"] = readStudentId();

    console.log("Received values:", updatedValues);
    apiServices
      .post(apiEndpoints.inventory.addItem, updatedValues)
      .then()
      .finally(() => {
        refresh();
        setOpenModal(false);
      });
  };

  const handleQuantityChange = (value) => {
    const fields = [];
    for (let i = 0; i < value; i++) {
      fields.push(
        <Form.Item
          key={i}
          name={["serial_numbers", i, "serial_number"]}
          label={`Serial Number ${i + 1}`}
          rules={[
            { required: true, message: "Please input the serial number!" },
          ]}
        >
          <Input />
        </Form.Item>
      );
    }
    setSerialNumberFields(fields);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="Add Inventory Items"
      onFinish={onFinish}
    >
      <Form.Item
        label="Hardware"
        name="hardware_id"
        rules={[{ required: true, message: "Please input the hardware ID!" }]}
      >
        <Select placeholder="Select hardware" options={hardwares} />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: "Please input the quantity!" }]}
      >
        <Input
          placeholder="0"
          onChange={(e) => handleQuantityChange(e.target.value)}
        />
      </Form.Item>

      {serialNumberFields}

      <Form.Item>
        <Button
          className="w-full"
          size="large"
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InventoryAddItemForm;
