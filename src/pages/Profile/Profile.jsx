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
  Typography,
  Modal,
  Upload,
  Image,
  TimePicker,
  Space,
  Popover,
  Select,
  Form,
  Input,
  Popconfirm,
} from "antd";
import ImgCrop from "antd-img-crop";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  InstagramOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
// import { PageHeader } from "../../components/page-headers/page-headers";
// import { Main } from "./style/styled";
import apiServices from "../../services/exportService";
import { readUserId } from "../../services/localServices";
import "./style/_profilePage.scss";
import NoImageProfile from "./Images/NoProfileImage.png";
import ManageEducation from "./Education";
import ManageExperience from "./Experience";
import ManageAchievements from "./Achievements";
import { API_FILE } from "../../DataConfig";
const { Option } = Select;
const { Title } = Typography;
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

function ManageProfile() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [UpdateID, setUpdateID] = useState("");
  const [loading, setLoading] = useState(true);
  const [FormSubmiting, setFormSubmiting] = useState(false);
  const [form] = Form.useForm();
  const [profileData, setProfileData] = useState([]);
  const [fileList, setFileList] = useState([]);

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const onFinish = (values) => {
    console.log(values);
    // if (fileList.length === 0) {
    //   message.info("Please add Profile Photo");
    //   return;
    // }
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("Phone", values.Phone);
    formData.append("address", values.address !== null ? values.address : "");
    formData.append("city", values.city !== null ? values.city : "");
    formData.append("state", values.state !== null ? values.state : "");
    formData.append("country", values.country !== null ? values.country : "");
    formData.append("pincode", values.pincode !== null ? values.pincode : "");
    formData.append(
      "instagram",
      values.instagram !== null ? values.instagram : ""
    );
    formData.append(
      "facebook",
      values.facebook !== null ? values.facebook : ""
    );
    formData.append(
      "linkedin",
      values.linkedin !== null ? values.linkedin : ""
    );
    formData.append("User_Id", readUserId());
    if (fileList.length !== 0) {
      formData.append("photo", fileList[0]);
    }

    setFormSubmiting(true);
    apiServices
      .post("User/update-profile/", formData)
      .then((data) => {
        console.log(data);
        loadingTableData();
        message.success(`Profile Updated Successfully`);
        setDrawerVisible(false);
        setFileList([]);
      })
      .catch((data) => {
        console.log(data);
        if (data.data?.errors) {
          let ObjectKeys = Object.keys(data.data.errors);
          ObjectKeys.map((value) => {
            message.error(data.data?.errors[value][0]);
          });
        }
      })
      .finally(() => {
        setFormSubmiting(false);
      });
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
      .get("User/profile/")
      .then((data) => {
        console.log("Profile Data", data);
        setProfileData(data.data);
        message.success("Details Fetched Successfully");
      })
      .catch((data) => {
        // message.error('Issue in Fetching Institute Details, Please try again!');
        message.error(data.data.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <>
      {/* <PageHeader className="ninjadash-page-header-main" title="Manage Profile" routes={PageRoutes} /> */}
      {loading ? (
        <div>
          <Spin tip="Loading" size="large" style={{ marginTop: "150px" }}>
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <div>
          <Row
            gutter={14}
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#F8F9Fb",
            }}
          >
            <Col xs={11} style={{ margin: "5rem 1rem 0 2rem" }}>
              <Card style={{ margin: "1rem 0rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    width={"50%"}
                    src={
                      profileData.photo
                        ? `${API_FILE}${profileData.photo}`
                        : NoImageProfile
                    }
                  />
                </div>
                <div className="PP-Section1">
                  <div className="PP-Section2">
                    <span className="PP-Text1">My Profile</span>
                    <span className="PP-Section3">
                      <InstagramOutlined
                        style={{ fontSize: "24px", margin: "0 0.5rem" }}
                        onClick={() => {
                          if (profileData.instagram) {
                            window.open(`${profileData.instagram}`, "_blank");
                          } else {
                            message.info("Please add Instagram Profile");
                          }
                        }}
                      />
                      <FacebookOutlined
                        style={{ fontSize: "24px", margin: "0 0.5rem" }}
                        onClick={() => {
                          if (profileData.facebook) {
                            window.open(`${profileData.facebook}`, "_blank");
                          } else {
                            message.info("Please add Facebook Profile");
                          }
                        }}
                      />
                      <LinkedinOutlined
                        style={{ fontSize: "24px", margin: "0 0.5rem" }}
                        onClick={() => {
                          if (profileData.linkedin) {
                            window.open(`${profileData.linkedin}`, "_blank");
                          } else {
                            message.info("Please add Linkedin Profile");
                          }
                        }}
                      />
                    </span>
                    <div>
                      <Button
                        style={{ margin: "0 0 0 1rem" }}
                        onClick={() => {
                          form.setFieldsValue({
                            ["first_name"]: profileData.first_name,
                            ["last_name"]: profileData.last_name,
                            ["email"]: profileData.email,
                            ["Phone"]: profileData.Phone,
                            ["address"]: profileData.address,
                            ["city"]: profileData.city,
                            ["state"]: profileData.state,
                            ["country"]: profileData.country,
                            ["pincode"]: profileData.pincode,
                            ["linkedin"]: profileData.linkedin,
                            ["instagram"]: profileData.instagram,
                            ["facebook"]: profileData.facebook,
                          });
                          setDrawerVisible(true);
                        }}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                  <div className="PP-Section4">
                    <div className="PP-Section5 AlignStart">
                      <p className="PP-Text2">{profileData.first_name}</p>
                      <Divider orientation="left" className="PP-Text3">
                        {/* First Name */}
                      </Divider>
                    </div>
                    <div className="PP-Section5 AlignStart">
                      <p className="PP-Text2">{profileData.last_name}</p>
                      <Divider orientation="left" className="PP-Text3">
                        {/* Last Name */}
                      </Divider>
                    </div>
                    <div className="PP-Section6 AlignStart">
                      <p className="PP-Text2">{profileData.email}</p>
                      <Divider orientation="left" className="PP-Text3">
                        {/* Email */}
                      </Divider>
                    </div>
                    <div className="PP-Section5 AlignStart">
                      <p
                        className={
                          profileData.Phone === "" ? "PP-Text4" : "PP-Text2"
                        }
                      >
                        {profileData.Phone === null
                          ? "Phone Number"
                          : profileData.Phone}
                      </p>
                      <Divider orientation="right" className="PP-Text3">
                        {/* Phone Number */}
                      </Divider>
                    </div>
                    <div className="PP-Section5 AlignStart">
                      <p className="PP-Text2">Student</p>
                      <Divider orientation="right" className="PP-Text3">
                        {/* Designation */}
                      </Divider>
                    </div>

                    <div className="PP-Section6 AlignStart">
                      <p
                        className={
                          profileData.address === null ? "PP-Text4" : "PP-Text2"
                        }
                      >
                        {profileData.address === null
                          ? "Address"
                          : profileData.address}
                      </p>
                      <Divider orientation="left" className="PP-Text3">
                        {/* Address */}
                      </Divider>
                    </div>
                    <div className="PP-Section5 AlignStart">
                      <p
                        className={
                          profileData.city === "" ? "PP-Text4" : "PP-Text2"
                        }
                      >
                        {profileData.city === "" ? "City" : profileData.city}
                      </p>
                      <Divider orientation="left" className="PP-Text3">
                        {/* City */}
                      </Divider>
                    </div>
                    <div className="PP-Section5 AlignStart">
                      <p
                        className={
                          profileData.state === "" ? "PP-Text4" : "PP-Text2"
                        }
                      >
                        {profileData.state === "" ? "State" : profileData.state}
                      </p>
                      <Divider orientation="left" className="PP-Text3">
                        {/* State */}
                      </Divider>
                    </div>
                    <div className="PP-Section5 AlignStart">
                      <p
                        className={
                          profileData.country === "" ? "PP-Text4" : "PP-Text2"
                        }
                      >
                        {profileData.country === ""
                          ? "Country"
                          : profileData.country}
                      </p>
                      <Divider orientation="left" className="PP-Text3">
                        {/*  */}
                      </Divider>
                    </div>
                    <div className="PP-Section5 AlignStart">
                      <p
                        className={
                          profileData.pincode === "" ? "PP-Text4" : "PP-Text2"
                        }
                      >
                        {profileData.pincode === ""
                          ? "pincode"
                          : profileData.pincode}
                      </p>
                      <Divider orientation="left" className="PP-Text3">
                        {/* pincode */}
                      </Divider>
                    </div>
                    <div
                      className="PP-Section3"
                      style={{ textAlign: "right", width: "100%" }}
                    >
                      <span>Last Login</span>{" "}
                      <span>
                        {" "}
                        {moment(new Date()).format("MMMM Do YYYY, h:mm:ss a")}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={11} style={{ margin: "5rem 2rem 0 1rem" }}>
              <ManageEducation />
              <ManageExperience />
              <ManageAchievements />
            </Col>
          </Row>
        </div>
      )}
      {/* For Drawer */}
      <Drawer
        title={`Update Profile`}
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
            name="first_name"
            label="First Name"
            rules={[{ required: true, message: "Please enter First Name!" }]}
          >
            <Input placeholder="Enter First Name" />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[{ required: true, message: "Please enter Last Name!" }]}
          >
            <Input placeholder="Enter Last Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email ID"
            rules={[{ required: true, message: "Please enter Email ID!" }]}
          >
            <Input placeholder="Enter Email ID" disabled />
          </Form.Item>
          <Form.Item
            name="Phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter Phone Number!" }]}
          >
            <Input placeholder="Enter Phone Number" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            // rules={[{ required: true, message: "Please enter Address!" }]}
          >
            <Input placeholder="Enter Address" />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            // rules={[{ required: true, message: "Please enter City!" }]}
          >
            <Input placeholder="Enter City" />
          </Form.Item>
          <Form.Item
            name="state"
            label="State"
            // rules={[{ required: true, message: "Please enter State!" }]}
          >
            <Input placeholder="Enter State" />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            // rules={[{ required: true, message: "Please enter Country!" }]}
          >
            <Input placeholder="Enter Country" />
          </Form.Item>
          <Form.Item
            name="pincode"
            label="PinCode"
            // rules={[{ required: true, message: "Please enter Pincode!" }]}
          >
            <Input placeholder="Enter Pincode" />
          </Form.Item>
          <Form.Item name="FilePath" label="Upload Profile Photo">
            <ImgCrop rotationSlider aspect={1 / 1}>
              <Upload listType="picture-card" fileList={fileList} {...props}>
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <div
            style={{
              fontSize: "16px",
              color: "black",
              fontWeight: "500",
              marginBottom: "1rem",
            }}
          >
            Social Media Links
          </div>
          <Form.Item
            name="linkedin"
            label="Linkedin URL"
            rules={[
              {
                type: "url",
                message: "This field must be a valid url.",
              },
            ]}
          >
            <Input placeholder="Linkedin URL" />
          </Form.Item>
          <Form.Item
            name="instagram"
            label="Instagram URL"
            rules={[
              {
                type: "url",
                message: "This field must be a valid url.",
              },
            ]}
          >
            <Input placeholder="Instagram URL" type="url" />
          </Form.Item>
          <Form.Item
            name="facebook"
            label="Facebook URL"
            rules={[
              {
                type: "url",
                message: "This field must be a valid url.",
              },
            ]}
          >
            <Input placeholder="Facebook URL" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={FormSubmiting}>
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default ManageProfile;
