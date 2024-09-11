import moment from "moment";
import {
  EyeOutlined,
  EditOutlined,
  ArrowRightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Card,
  Image,
  Modal,
  Table,
  Space,
  Button,
  Form,
  Drawer,
  Input,
  message,
  Upload,
  Tag,
} from "antd";
import appImages from "../../../data/images";
import React, { useState, useEffect } from "react";
const { Meta } = Card;
import apiServices from "../../../services/exportService";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import ImgCrop from "antd-img-crop";
import "./style.scss";
import { API_FILE } from "../../../DataConfig";
const ProjectCard = ({ index, handleClick, data, onInitialize }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [FormSubmiting, setFormSubmiting] = useState(false);

  const [form] = Form.useForm();

  const [TeamDataLoading, setTeamDataLoading] = useState(false);
  const [selectedData, setselectedData] = useState({});
  const [showUserData, setShowUserData] = useState([]);
  const [showUserData2, setShowUserData2] = useState([]); // For Team
  const [showModalUserData, setShowModalUserData] = useState(false);
  const [showModalUserData2, setShowModalUserData2] = useState(false);
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
  const UserDatacolumns = [
    {
      title: "Field",
      dataIndex: "field",
      width: 150,
    },
    {
      title: "Deatils",
      dataIndex: "details",
      width: 250,
      render: (_, record) => (
        <Space style={{ flexWrap: "wrap" }}>
          {Array.isArray(record.details)
            ? record.details.map((data) => {
                console.log(data);
                return (
                  <Tag
                    color="blue"
                    style={{
                      height: "40px",
                      display: "flex",
                      fontSize: "14px",
                      textAlign: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                      cursor:
                        record.field === "Team Name" ? "pointer" : "default",
                    }}
                    onClick={() => {
                      if (record.field === "Team Name") {
                        FetchTeamDetails(data.TeamID);
                        setShowModalUserData(false);
                        setShowModalUserData2(true);
                      }
                    }}
                  >
                    {data.StudentName}
                  </Tag>
                );
              })
            : record.details}
        </Space>
      ),
    },
  ];

  const onFinish = (values) => {
    console.log(values);
    let MergedValues = { ...selectedData, ...values };
    delete MergedValues.project_image;
    MergedValues.Other_Section === null
      ? delete MergedValues.Other_Section
      : "";
    MergedValues.projectcompletion_id === null
      ? delete MergedValues.projectcompletion_id
      : "";

    let TeamIDs = [];
    MergedValues.Team_details.map((data) => {
      TeamIDs.push(data.Team_ID);
    });
    console.log(TeamIDs);
    delete MergedValues.Team_details;
    // MergedValues.Team_ID = TeamIDs;
    // console.log(MergedValues);
    // fileList.forEach((file) => {
    //   MergedValues.project_image = file;
    // });
    // return;
    const formData = new FormData();
    Object.keys(MergedValues).forEach((key) => {
      formData.append(key, MergedValues[key]);
    });
    fileList.forEach((file) => {
      formData.append("project_image", file);
    });
    TeamIDs.map((item) => {
      formData.append("Team_ID", item);
    });
    setFormSubmiting(true);

    apiServices
      .post(`staff/Update-Project/${selectedData.ProjectID}/`, formData)
      .then((data) => {
        console.log(data);
        // message.success("Project Updated Successfully");
        setDrawerVisible(false);
        onInitialize();
        setFileList([]);
      })
      .catch((data) => {
        message.error("Failed to update Project! Please try again");
        console.log(data);
      })
      .finally(() => {
        setFormSubmiting(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo.errorFields[0].errors);
  };

  function FetchTeamDetails(SelectedTeamID) {
    setTeamDataLoading(true);
    apiServices
      .get(`${apiEndpoints.home.projects.TeamDetails}${SelectedTeamID}/`)
      .then((res) => {
        console.log(res);
        let TeamData = res.data[0];
        let StudentList = [];
        let EStudentList = [];
        TeamData.students_details.map((StudentData) => {
          StudentList.push({
            StudentID: StudentData.STUDID,
            StudentName: `${StudentData.first_name} ${StudentData.last_name}`,
          });
        });
        TeamData.other_institute_members_details.map((StudentData) => {
          EStudentList.push({
            StudentID: StudentData.member_id,
            StudentName: `${StudentData.first_name} ${StudentData.last_name}`,
          });
        });
        let TeamDetails = {
          ["Team Name"]: TeamData.TeamName,
          ["Mentor"]: TeamData.Mentor,
          ["Lead Student"]: StudentList.filter(
            (data) => data.StudentID === TeamData.lead
          ),
          ["Students"]: StudentList,
          ["External Students"]: EStudentList,

          ["Team Created Date"]: moment(TeamData.DtCrte).format("MMMM Do YYYY"),
          ["Last Updated"]: moment(TeamData.DtChd).format("MMMM Do YYYY"),
        };
        let Keys2 = Object.keys(TeamDetails);
        let RowData2 = [];
        Keys2.map((fielddata) => {
          RowData2.push({
            field: fielddata,
            details: TeamDetails[fielddata],
          });
        });
        console.log(RowData2);
        setShowUserData2(RowData2);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setTeamDataLoading(false);
      });
  }

  function handleViewClick() {
    setselectedData(data);
    let TeamDetails = [];
    data.Team_details.map((teamdata) => {
      TeamDetails.push({
        StudentName: teamdata.TeamName,
        TeamID: teamdata.Team_ID,
      });
    });
    let SelectedObject = {
      ["Project Name"]: data.ProjectName,
      ["Team Name"]: TeamDetails,
      ["Project Type"]: data.project_type,
      ["Aim"]: data.Aim,
      ["Description"]: data.Description,
      ["Hardware"]: data.Hardware,
      ["Software"]: data.Software,
      ["Problem Statement"]: data.ProblemStatementent,
      ["Uniqueness"]: data.Uniqueness,
      ["Budget Amount"]: data.budget_amount,
      ["Funding Type"]:
        data.funding_type === "funding_agency"
          ? data.Agency_name
          : data.funding_type,
      ["Project Created Date"]: moment(data.DtCrte).format("MMMM Do YYYY"),
      ["Project Completion Date"]: moment(data.project_deadline).format(
        "MMMM Do YYYY"
      ),
      ["Last Updated"]: moment(data.DtChd).format("MMMM Do YYYY"),
    };
    let Keys = Object.keys(SelectedObject);
    let RowData = [];
    Keys.map((fielddata) => {
      RowData.push({
        field: fielddata,
        details: SelectedObject[fielddata],
      });
    });
    setShowUserData(RowData);
    setShowModalUserData(true);
  }

  console.log(data);

  return (
    <>
      <Card
        className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
        style={{ width: 300 }}
        cover={
          <Image
            src={
              data.project_image === undefined
                ? appImages.pageWise.projects.projectImage
                : `${API_FILE}${data.project_image}`
            }
            style={{
              objectFit: "cover",
              width: "100%",
              height: "200px",
            }}
            // onClick={() => handleClick(data)}
          />
        }
        actions={[
          // <EyeOutlined
          //   onClick={() => {
          //     handleViewClick();
          //   }}
          //   style={{ fontSize: "18px" }}
          //   key="View"
          // />,
          <EditOutlined
            onClick={() => {
              setFileList([]);
              setselectedData(data);
              setDrawerVisible(true);
              form.setFieldsValue({
                ...data,
              });
            }}
            style={{ fontSize: "16px" }}
            key="Edit"
          />,
          <ArrowRightOutlined
            style={{ fontSize: "16px" }}
            onClick={() => {
              console.log(data);
              handleClick(data);
            }}
            key="Open"
          />,
        ]}
      >
        <Meta
          title={data?.ProjectName}
          description={`${moment(data?.DtCrte).format(
            "MMMM Do YYYY"
          )} - ${moment(data?.project_deadline).format("MMMM Do YYYY")}`}
        />
      </Card>
      <Modal
        centered
        open={showModalUserData}
        // closable={false}
        onOk={() => {
          setShowModalUserData(false);
        }}
        onCancel={() => {
          setShowModalUserData(false);
        }}
        width={600}
        footer={null}
      >
        <Card
          title={`${selectedData.ProjectName} Details`}
          style={{ marginBottom: "1rem" }}
        >
          <Table
            columns={UserDatacolumns}
            dataSource={showUserData}
            pagination={{
              pageSize: 5,
            }}
            // scroll={{
            //   y: 240,
            // }}
          />
        </Card>
      </Modal>
      <Modal
        centered
        open={showModalUserData2}
        // closable={false}
        onOk={() => {
          setShowModalUserData2(false);
          setShowModalUserData(true);
        }}
        onCancel={() => {
          setShowModalUserData2(false);
          setShowModalUserData(true);
        }}
        width={600}
        footer={null}
      >
        <Card title={`Team Details`} style={{ marginBottom: "1rem" }}>
          <Table
            loading={TeamDataLoading}
            columns={UserDatacolumns}
            dataSource={showUserData2}
            pagination={{
              pageSize: 5,
            }}
            // scroll={{
            //   y: 240,
            // }}
          />
        </Card>
      </Modal>
      <Drawer
        title={`Edit Project`}
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
            name="Description"
            label="Description"
            rules={[{ required: true, message: "Please enter Description!" }]}
          >
            <Input placeholder="Enter Description" />
          </Form.Item>
          <Form.Item
            name="ProblemStatementent"
            label="Problem Statementent"
            rules={[
              { required: true, message: "Please enter Problem Statementent!" },
            ]}
          >
            <Input placeholder="Enter Problem Statementent" />
          </Form.Item>
          <Form.Item
            name="Aim"
            label="Aim"
            rules={[{ required: true, message: "Please enter Aim!" }]}
          >
            <Input placeholder="Enter Aim" />
          </Form.Item>
          <Form.Item
            name="Uniqueness"
            label="Uniqueness"
            rules={[{ required: true, message: "Please enter Uniqueness!" }]}
          >
            <Input placeholder="Enter Uniqueness" />
          </Form.Item>
          <Form.Item
            name="Hardware"
            label="Hardware Used"
            rules={[{ required: true, message: "Please enter Hardware Used!" }]}
          >
            <Input placeholder="Enter Hardware Name" />
          </Form.Item>
          <Form.Item
            name="Software"
            label="Software Used"
            rules={[{ required: true, message: "Please enter Software Used!" }]}
          >
            <Input placeholder="Enter Software Name" />
          </Form.Item>
          <div style={{ marginBottom: "1rem", width: "100%" }}>
            <div style={{ margin: "1rem 0", fontSize: "1rem" }}>
              Upload Thumbnail of the Project
            </div>
            <ImgCrop rotationSlider aspect={16 / 9}>
              {/* <div className="AntdUploadCustom"> */}
              <Upload listType="picture-card" fileList={fileList} {...props}>
                {fileList.length < 1 && "+ Upload"}
              </Upload>
              {/* </div> */}
            </ImgCrop>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={FormSubmiting}
              style={{ width: "100%" }}
            >
              Update Project Information
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default ProjectCard;
