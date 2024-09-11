import React, { lazy, Suspense, useState, useEffect } from "react";
import moment from "moment";
import {
  Row,
  Col,
  Skeleton,
  Button,
  Card,
  Drawer,
  Table,
  Tag,
  Spin,
  Breadcrumb,
  Divider,
  message,
  Avatar,
  Typography,
  Modal,
  Image,
  TimePicker,
  Space,
  Popover,
  Select,
  Form,
  Input,
  Popconfirm,
} from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Images from "./Images/experience.svg";

import apiServices from "../../services/exportService";

import { readUserId } from "../../services/localServices";

import "./style/_profilePage.scss";
const { Option } = Select;
const { Title } = Typography;
const { Meta } = Card;

const PageRoutes = [
  {
    path: "/home",
    breadcrumbName: "Home",
  },
  {
    path: "#",
    breadcrumbName: "Profile",
  },
];

function ManageExperience() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [UpdateID, setUpdateID] = useState("");
  const [loading, setLoading] = useState(true);
  const [FormSubmiting, setFormSubmiting] = useState(false);
  const [type, setType] = useState("create");
  const [form] = Form.useForm();
  const [FetchData, setFetchData] = useState([]);

  const onFinish = (values) => {
    console.log(values);
    let SubmitValues1 = {
      Designation: values.Designation,
      OrgName: values.OrgName,
      User_Id: readUserId(),
    };
    setFormSubmiting(true);
    let URL1 =
      type == "create"
        ? "staff/Create-Experience/"
        : `staff/Update-Experience/${UpdateID}/`;
    apiServices
      .post(URL1, SubmitValues1)
      .then((data) => {
        console.log(data);
        loadingTableData();
        message.success(
          `Experience ${type == "create" ? "Created" : "Updated"} Successfully`
        );
      })
      .catch((data) => {
        message.error("Issue in Creating or Updating Data, Please try again!");
      })
      .finally(() => {
        setDrawerVisible(false);
        setFormSubmiting(false);
      });
  };
  const deleteData = (Key1) => {
    apiServices
      .delete(`staff/Delete-Experience/${Key1}/`)
      .then((data) => {
        console.log(data);
        message.success("Experience Deleted Successfully");
        loadingTableData();
      })
      .catch((data) => {
        message.error("Issue in Deleting Experience, Please try again!");
      })
      .finally(() => {});
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo.errorFields[0].errors);
  };
  useEffect(() => {
    loadingTableData();
  }, []);
  const loadingTableData = () => {
    setLoading(true);
    apiServices
      .get("staff/Get-Experience/")
      .then((data) => {
        console.log("Experience Data", data);
        setFetchData(data.data);
        // message.success('Details Fetched Successfully');
      })
      .catch((data) => {
        // message.error('Issue in Fetching Institute Details, Please try again!');
        // message.error(data.data.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Card
        title="Experience"
        className="MainBody"
        extra={
          <div>
            <Button
              onClick={() => {
                setType("create");
                form.resetFields();
                setDrawerVisible(true);
              }}
            >
              Add Experience
            </Button>
          </div>
        }
        style={{ padding: "opx", margin: "1rem 0" }}
      >
        {FetchData.length === 0 && (
          <Meta
            title={"No Experience Data is Added"}
            description={"Please Add Experience"}
            style={{ width: "79%" }}
          />
        )}
        {FetchData.map((data, index) => {
          return (
            <>
              <Row
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Meta
                  avatar={<Avatar src={Images} />}
                  title={`${data.Designation} in ${data.OrgName}`}
                  description={`Updated at ${moment(data.DtChd).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}`}
                  style={{ width: "79%" }}
                />
                <Row style={{ width: "20%" }}>
                  <div className="IconDiv">
                    <EditOutlined
                      className="IconButton"
                      onClick={() => {
                        setType("update");
                        setUpdateID(data.ExperID);
                        form.setFieldsValue({
                          ["Designation"]: data.Designation,
                          ["OrgName"]: data.OrgName,
                        });
                        setDrawerVisible(true);
                      }}
                    />
                  </div>
                  <div className="IconDiv">
                    <Popconfirm
                      title={`Are you sure to delete?`}
                      onConfirm={() => {
                        deleteData(data.ExperID);
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined className="IconButton" />
                    </Popconfirm>
                  </div>
                </Row>
              </Row>
              {FetchData.length !== index + 1 && <Divider />}
            </>
          );
        })}
      </Card>
      {/* For Drawer */}
      <Drawer
        title={`${type == "create" ? "Create" : "Edit"} Experience`}
        // placement="right"
        width={window.innerWidth > 600 ? 600 : window.innerWidth - 50}
        onClose={() => {
          setDrawerVisible(false);
        }}
        open={drawerVisible}
        style={{ zIndex: "1000" }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            name="Designation"
            label="Designation"
            rules={[{ required: true, message: "Please enter Designation!" }]}
          >
            <Input placeholder="Enter Designation" />
          </Form.Item>
          <Form.Item
            name="OrgName"
            label="Organization Name"
            rules={[
              { required: true, message: "Please enter Organization Name!" },
            ]}
          >
            <Input placeholder="Enter Organization Name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={FormSubmiting}>
              {type == "create" ? "Submit" : "Update"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default ManageExperience;
