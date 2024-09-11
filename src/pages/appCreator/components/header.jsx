import appImages from "../../../data/images";
import {
  Avatar,
  Button,
  Popconfirm,
  Select,
  Space,
  Tooltip,
  message,
  Spin,
  Form,
  Input,
  Modal,
} from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  UserOutlined,
  CloudUploadOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
  WifiOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { MdPassword } from "react-icons/md";
import { CiHashtag } from "react-icons/ci";
import { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";

import {
  handleLogout,
  readProjectsList,
  readSelectedProjectId,
  readStudentId,
  setProjectsList,
  setSelectedProjectId,
  readUserId,
} from "../../../services/localServices";
import apiServices from "../../../services/exportService";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import { useNavigate } from "react-router-dom";

const AppCreatorHeader = ({
  AppJSONData,
  setAppJSONData,
  SelectedEquipmentID,
  setSelectedEquipmentID,
  FetchedJSONData,
  setFetchedJSONData,
}) => {
  const navigate = useNavigate();
  const [SaveStatus, setSaveStatus] = useState(false);
  const [EquipLoadStatus, setEquipLoadStatus] = useState(false);
  const [SelectedProjectID, setSelectedProjectID] = useState(
    readSelectedProjectId()
  );
  // const [SelectedEquipmentID, setSelectedEquipmentID] = useState();
  const [projects, setProjects] = useState(
    readProjectsList() ? readProjectsList() : []
  );
  const [equipments, setequipments] = useState({});
  const [JSONDataLoading, setJSONDataLoading] = useState(false);

  const [form] = Form.useForm();
  const [ShowModal, setShowModal] = useState(false);
  function CloseShowModal() {
    setShowModal(false);
  }
  useEffect(() => {
    onInitialize();
    GetEquipmentsList(readSelectedProjectId());
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error(errorInfo.errorFields[0].errors);
  };

  function SubmitAppCreatorData(values) {
    console.log("Form Values", values);
    console.log("Initial Data ", FetchedJSONData);

    // return;
    setSaveStatus(true);
    console.log(AppJSONData);
    let PostBody = {
      project_id: SelectedProjectID,
      equipment_id: SelectedEquipmentID,
      name: values.VersionAlias,
      json: AppJSONData,
      json2: {
        ...values,
        Topic: `${readUserId()}_${SelectedProjectID}_${SelectedEquipmentID}_${Date.now()}`,
      },
      embedded_generated_code_state: false,
    };
    apiServices
      .post(`${apiEndpoints.AppEditor.SaveJson}`, PostBody)
      .then((data) => {
        console.log(data);
        message.success("Saved Successfully");
        form.resetFields();
      })
      .catch((e) => {})
      .finally(() => {
        setSaveStatus(false);
        setShowModal(false);
      });
  }
  // For Modal & Form Data

  //main action functions
  const onInitialize = () => {
    if (readProjectsList()) {
      // console.log(readProjectsList());
    } else {
      apiServices
        .get(`${apiEndpoints.home.projects.read}${readStudentId()}/`)
        .then((res) => {
          let tempProjects = [];
          res?.data?.map((e) => {
            tempProjects.push({
              value: e.ProjectID,
              label: e.ProjectName,
              initialprocessstatus: e.initialprocessstatus,
            });
          });
          setProjectsList(tempProjects);
          setProjects(tempProjects);
        })
        .catch((e) => console.log(e))
        .finally(() => {});
    }
  };

  const GetEquipmentsList = (ProjectID) => {
    setEquipLoadStatus(true);
    apiServices
      .get(`${apiEndpoints.Configuration.CompleteData}${ProjectID}/`)
      .then((res) => {
        let tempProjects = [];
        res?.data?.map((e) => {
          tempProjects.push({ value: e.EquipmentID, label: e.EquipmentName });
        });
        setequipments(tempProjects);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setEquipLoadStatus(false);
      });
  };

  const GetJSONData = (EquipmentID) => {
    setJSONDataLoading(true);
    apiServices
      .get(`${apiEndpoints.AppEditor.GetJson}${EquipmentID}/`)
      .then((res) => {
        console.log(res.data[0]);
        setFetchedJSONData(res.data[0]);
        // setequipments(tempProjects);
      })
      .catch((e) => {
        console.log(e);
        setFetchedJSONData();
      })
      .finally(() => {
        setJSONDataLoading(false);
      });
  };

  const OnLogout = () => {
    //localService
    handleLogout();
    navigate("/login");
  };

  return (
    <>
      <Spin spinning={JSONDataLoading} fullscreen />

      <header className="fixed flex flex-col items-center justify-center z-50 w-full bg-white text-sm h-[60px]">
        <nav
          className="max-w-8xl flex basis-full items-center w-full"
          aria-label="Global"
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-row items-center ml-4">
              <div className="">
                <img className="h-8 mr-5" src={appImages.common.Logo} alt="" />
              </div>
              <div className="flex flex-row gap-2">
                <Select
                  className="w-[10rem]"
                  size="large"
                  placeholder="Select Project"
                  defaultValue={JSON.parse(readSelectedProjectId())}
                  options={projects}
                  onChange={(data) => {
                    console.log("---->", data);
                    let ProjectsList = readProjectsList();
                    ProjectsList.map((dataa) => {
                      if (dataa.value == data) {
                        if (!dataa.initialprocessstatus) {
                          message.info(
                            "Please Complete the Initial Configuration"
                          );
                          navigate("/dashboard/projects");
                        }
                      }
                    });
                    GetEquipmentsList(data);
                    setSelectedProjectID(data);
                    setFetchedJSONData();
                    setSelectedEquipmentID(null);
                  }}
                />
                <Select
                  className="w-[10rem]"
                  placeholder="Select Equipment"
                  size="large"
                  defaultValue={null}
                  value={SelectedEquipmentID}
                  loading={EquipLoadStatus}
                  // defaultValue={JSON.parse(readSelectedProjectId())}
                  options={equipments}
                  onChange={(data) => {
                    setSelectedEquipmentID(data);
                    GetJSONData(data);
                  }}
                />
              </div>
            </div>

            <Space className="mr-4">
              <Tooltip title="Projects">
                <Button
                  type="text"
                  onClick={() => navigate("/dashboard/projects")}
                  size="large"
                  shape="circle"
                  icon={<HomeOutlined />}
                />
              </Tooltip>

              <Tooltip title="Dashboard">
                <Button
                  type="text"
                  onClick={() => navigate("/dashboard")}
                  size="large"
                  shape="circle"
                  icon={<MdDashboard />}
                />
              </Tooltip>

              <Tooltip title="Announcements">
                <Button
                  type="text"
                  size="large"
                  shape="circle"
                  icon={<InfoCircleOutlined />}
                />
              </Tooltip>
              <Tooltip title="Settings">
                <Button
                  type="text"
                  size="large"
                  shape="circle"
                  icon={<SettingOutlined />}
                />
              </Tooltip>
              <Tooltip title="Account">
                <Button
                  type="text"
                  size="large"
                  shape="circle"
                  icon={<UserOutlined />}
                />
              </Tooltip>

              <Tooltip title="Live Preview">
                <Button
                  // type="primary"
                  size="large"
                  icon={<PlayCircleOutlined />}
                >
                  Live Preview
                </Button>
              </Tooltip>

              <Popconfirm
                title="Publish to Server"
                description="Are you sure to publish?"
                onConfirm={() => {
                  if (FetchedJSONData !== undefined) {
                    if (FetchedJSONData.json2 !== null) {
                      form.setFieldsValue({
                        ["VersionAlias"]: FetchedJSONData.json2.VersionAlias,
                        ["WiFi_SSID"]: FetchedJSONData.json2.WiFi_SSID,
                        ["WiFi_Password"]: FetchedJSONData.json2.WiFi_Password,
                      });
                    } else {
                      form.resetFields();
                    }
                  } else {
                    form.resetFields();
                  }
                  setShowModal(true);
                }}
                okText="Confirm"
                cancelText="No"
              >
                <Tooltip title="Publish">
                  <Button
                    type="primary"
                    size="large"
                    icon={<CloudUploadOutlined />}
                    loading={SaveStatus}
                    disabled={!SelectedEquipmentID}
                  >
                    Publish
                  </Button>
                </Tooltip>
              </Popconfirm>
            </Space>
          </div>
        </nav>
        <div className="h-[1px] bg-gray-200 w-full"></div>
      </header>
      <Modal
        title="Fill the Details"
        open={ShowModal}
        // onOk={handleOk}
        // width={"0%"}
        onCancel={CloseShowModal}
        footer={[<Button onClick={CloseShowModal}>Close</Button>]}
      >
        <Form
          form={form}
          name="WifiConfig"
          layout="vertical"
          onFinish={SubmitAppCreatorData}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Version Alias"
            name="VersionAlias"
            rules={[
              {
                required: true,
                message: "Please input the Version Alias Name!",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter Version Alias Name"
              prefix={<CiHashtag size={22} />}
            />
          </Form.Item>
          <Form.Item
            label="WiFi SSID"
            name="WiFi_SSID"
            rules={[
              {
                required: true,
                message: "Please input the SSID!",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter WiFi SSID"
              prefix={<WifiOutlined size={22} />}
            />
          </Form.Item>
          <Form.Item
            label="WiFi Password"
            name="WiFi_Password"
            rules={[
              {
                required: true,
                message: "Please input the Password!",
              },
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Enter WiFi Password"
              size="large"
              prefix={<MdPassword size={22} />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={SaveStatus}
              className="w-full"
              htmlType="submit"
              size="large"
              type="primary"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AppCreatorHeader;
