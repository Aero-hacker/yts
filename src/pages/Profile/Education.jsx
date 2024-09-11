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
import Images from "./Images/education.svg";

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

function ManageEducation() {
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
      Degree: values.Degree,
      University: values.University,
      User_Id: readUserId(),
    };
    setFormSubmiting(true);
    let URL1 =
      type == "create"
        ? "staff/Create-Education/"
        : `staff/Update-Education/${UpdateID}/`;
    apiServices
      .post(URL1, SubmitValues1)
      .then((data) => {
        console.log(data);
        loadingTableData();
        message.success(
          `Education ${type == "create" ? "Created" : "Updated"} Successfully`
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
      .delete(`staff/Delete-Education/${Key1}/`)
      .then((data) => {
        console.log(data);
        message.success("Education Deleted Successfully");
        loadingTableData();
      })
      .catch((data) => {
        message.error("Issue in Deleting Education, Please try again!");
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
      .get("staff/Get-Education/")
      .then((data) => {
        console.log("Education Data", data);

        setFetchData(data.data);

        // message.success('Details Fetched Successfully');
      })
      .catch((data) => {
        // message.error('Issue in Fetching Institute Details, Please try again!');
        message.error(data.data.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Card
        title="Education"
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
              Add Education
            </Button>
          </div>
        }
        style={{ padding: "opx", margin: "1rem 0" }}
      >
        {FetchData.length === 0 && (
          <Meta
            title={"No Education Data is Added"}
            description={"Please Add Education"}
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
                  title={`${data.Degree} at ${data.University}`}
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
                        setUpdateID(data.EduID);

                        form.setFieldsValue({
                          ["Degree"]: data.Degree,
                          ["University"]: data.University,
                        });
                        setDrawerVisible(true);
                      }}
                    />
                  </div>
                  <div className="IconDiv">
                    <Popconfirm
                      title={`Are you sure to delete?`}
                      onConfirm={() => {
                        deleteData(data.EduID);
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
        title={`${type == "create" ? "Create" : "Edit"} Education`}
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
            name="Degree"
            label="Degree"
            rules={[{ required: true, message: "Please enter Degree!" }]}
          >
            <Input placeholder="Enter Degree" />
          </Form.Item>
          <Form.Item
            name="University"
            label="Univeristy"
            rules={[{ required: true, message: "Please enter University!" }]}
          >
            <Input placeholder="Enter University Name" />
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

export default ManageEducation;
