import React from "react";
import { Button, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "hardware_name",
    dataIndex: "hardware_name",
    key: "hardware_name",
  },
  {
    title: "model_name",
    dataIndex: "model_name",
    key: "model_name",
  },
  {
    title: "quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Total Pins",
    dataIndex: "number_of_pins",
    key: "number_of_pins",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (item) => (
      <>
        <Button size="large" type="text" icon={<EditOutlined />} />
        <Button size="large" type="text" danger icon={<DeleteOutlined />} />
      </>
    ),
  },
];

const InventoryTable = ({ data }) => (
  <Table dataSource={data} columns={columns} />
);
export default InventoryTable;
