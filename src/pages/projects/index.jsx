import {
  Button,
  Form,
  Modal,
  Switch,
  Input,
  Space,
  Skeleton,
  Select,
} from "antd";
import AppHeader from "../../components/common/layout/header";
import ProjectCard from "./components/card";
import { useEffect, useState } from "react";
import apiServices from "../../services/exportService";
import { apiEndpoints } from "../../utils/apiEndPoints";
import { useNavigate } from "react-router-dom";
import { DotChartOutlined } from "@ant-design/icons";
import {
  readStudentId,
  readStudentType,
  setSelectedProjectId,
  readUserId,
  setProjectsList,
} from "../../services/localServices";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState({
    projectList: true,
    projectConfig: false,
    projectConfigUpdate: false,
  });
  const [projectsData, setProjectsData] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    onInitialize();
  }, []);

  // Normal Action Functions
  const storingProjectsData = (data) => {
    setProjectsData(data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Main action Functions
  const onInitialize = () => {
    setLoading((prevState) => ({ ...prevState, projectList: true }));
    apiServices
      .get(
        `${
          readStudentType() === "STUDENT"
            ? apiEndpoints.home.projects.read
            : apiEndpoints.home.projects.readByMember
        }${readStudentId()}/`
      )
      .then((res) => {
        storingProjectsData(res.data);
        let tempProjects = [];
        res?.data?.map((e) => {
          tempProjects.push({
            value: e.ProjectID,
            label: e.ProjectName,
            initialprocessstatus: e.initialprocessstatus,
          });
        });
        setProjectsList(tempProjects);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading((prevState) => ({ ...prevState, projectList: false }));
      });
  };

  const onProjectSelected = (project) => {
    setLoading((prevLoading) => ({ ...prevLoading, projectConfig: true }));
    setSelectedProjectId(project.ProjectID); //localservices
    if (project.project_type != null) {
      if (project.initialprocessstatus) {
        navigate("/dashboard/configuration");
      } else {
        navigate("/dashboard/project/initial-process");
      }
    } else {
      setSelectedProject(project);
      setIsModalOpen(true);
      apiServices
        .get(
          `${apiEndpoints.home.projects.getConfiguration}${project.ProjectID}/`
        )
        .then((res) => {
          console.log(res);
          form.setFieldsValue(res.data[0]);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setLoading((prevLoading) => ({
            ...prevLoading,
            projectConfig: false,
          }));
        });
    }
  };

  const handleSubmitConfig = (values) => {
    let TempValues = values;
    // TempValues["initialprocessstatus"] = true;
    TempValues["User"] = readUserId();

    setLoading((prevState) => ({ ...prevState, projectConfigUpdate: true }));
    apiServices
      .post(
        `${apiEndpoints.home.projects.configuration}${selectedProject.ProjectID}/`,
        TempValues
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          navigate("/dashboard/project/initial-process");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading((prevState) => ({
          ...prevState,
          projectConfigUpdate: false,
        }));
      });
  };

  return (
    <>
      <div className="max-w-8xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className=" text-sm font-semibold text-primary"></p>
          <h1 className="pt-4 block text-xl font-bold text-gray-800 sm:text-3xl">
            All Projects
          </h1>
        </header>
        <div
          // className="grid gap-4 mt-10"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            gap: "25px",
          }}
        >
          {loading.projectList ? (
            <>
              <Skeleton.Node active={true}>
                <DotChartOutlined
                  style={{
                    fontSize: 40,
                    color: "#bfbfbf",
                  }}
                />
              </Skeleton.Node>{" "}
              <Skeleton.Node active={true}>
                <DotChartOutlined
                  style={{
                    fontSize: 40,
                    color: "#bfbfbf",
                  }}
                />
              </Skeleton.Node>{" "}
              <Skeleton.Node active={true}>
                <DotChartOutlined
                  style={{
                    fontSize: 40,
                    color: "#bfbfbf",
                  }}
                />
              </Skeleton.Node>
            </>
          ) : (
            projectsData.map((data, index) => {
              return (
                <ProjectCard
                  key={index}
                  index={index}
                  data={data}
                  handleClick={onProjectSelected}
                  onInitialize={onInitialize}
                />
              );
            })
          )}
        </div>
        <Modal
          title={isModalOpen ? selectedProject.ProjectName : ""}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <Space direction="vertical" className="w-full">
            <p className="font-thin text-2xl">Fill some basic details</p>
            <Form form={form} layout="vertical" onFinish={handleSubmitConfig}>
              {loading.projectConfig ? (
                <Skeleton />
              ) : (
                <>
                  <Form.Item label={"Project Type"} name="project_type">
                    {/* <Input
                      name="project_type"
                      type="text"
                      size="large"
                      placeholder="Enter project type"
                    /> */}
                    <Select
                      placeholder="Select project type"
                      // className="w-[12rem]"
                      size="large"
                      options={[
                        {
                          value: "Academic_Project",
                          label: "Academic Project",
                        },
                        {
                          value: "Prototype",
                          label: "Prototype",
                        },
                        {
                          value: "MVP",
                          label: "MVP",
                        },
                        {
                          value: "Go_to_Market",
                          label: "Go to Market",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label={"Project have IOT Configuration?"}
                    name="iot_configuration"
                  >
                    <Switch size="large" />
                  </Form.Item>
                  <Button
                    loading={loading.projectConfigUpdate}
                    className="w-full"
                    htmlType="submit"
                    size="large"
                    type="primary"
                  >
                    Save
                  </Button>
                </>
              )}
            </Form>
          </Space>
        </Modal>
      </div>
    </>
  );
};

export default ProjectsPage;
