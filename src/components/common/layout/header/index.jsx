import Search from "antd/es/input/Search";
import appImages from "../../../../data/images";
import {
  Avatar,
  Button,
  Popconfirm,
  Select,
  Space,
  Tooltip,
  message,
} from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  NotificationOutlined,
  SettingOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { appColors } from "../../../../theme/common/colors";
import { pagesInsideProject } from "./config";
import { useEffect, useState } from "react";
import {
  handleLogout,
  readProjectsList,
  readSelectedProjectId,
  readStudentId,
  setProjectsList,
  setSelectedProjectId,
} from "../../../../services/localServices";
import apiServices from "../../../../services/exportService";
import { apiEndpoints } from "../../../../utils/apiEndPoints";
import { useNavigate } from "react-router-dom";
import ChangePassowrd from "./ChangePassword";
const AppHeader = () => {
  const navigate = useNavigate();
  const currentUrl = window.location.pathname;

  const [projects, setProjects] = useState(
    readProjectsList() ? readProjectsList() : []
  );

  useEffect(() => {
    onInitialize();
  }, []);

  //main action functions
  const onInitialize = () => {
    if (readProjectsList()) {
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

  const OnLogout = () => {
    //localService
    handleLogout();
    navigate("/login");
  };

  return (
    <>
      <header className="fixed shadow flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full border-b text-sm py-2.5 sm:py-4 bg-[#0f172a]">
        <nav
          className="max-w-8xl flex basis-full items-center w-full mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="">
            <img
              className=" mr-10"
              src={appImages.common.LogoWithTitle}
              alt=""
              height={"40px"}
            />
          </div>

          <div className="w-full flex items-center justify-between ms-auto sm:gap-x-3 sm:order-3">
            {pagesInsideProject.includes(currentUrl) ? (
              <Select
                className="w-[12rem]"
                size="large"
                defaultValue={parseInt(readSelectedProjectId())}
                options={projects}
                onChange={(e) => {
                  let ProjectsList = readProjectsList();
                  ProjectsList.map((data) => {
                    if (data.value == e) {
                      if (!data.initialprocessstatus) {
                        message.info(
                          "Please Complete the Initial Configuration"
                        );
                        navigate("/dashboard/projects");
                      } else {
                        setSelectedProjectId(e);
                        window.location.reload();
                      }
                    }
                  });
                }}
              />
            ) : // <Search
            //   placeholder="Search for projects"
            //   style={{
            //     width: 300,
            //   }}
            //   size="large"
            // />
            null}
            <Space className="ml-auto">
              {/* {pagesInsideProject.includes(currentUrl) ? (
                <Tooltip title="Projects">
                  <Button
                    onClick={() => navigate("/dashboard/projects")}
                    size="large"
                    shape="circle"
                    icon={<HomeOutlined />}
                  />
                </Tooltip>
              ) : null} */}

              {/* <Tooltip title="Announcements">
                <Button
                  size="large"
                  shape="circle"
                  icon={<NotificationOutlined />}
                />
              </Tooltip> */}

              <Tooltip title="Home">
                <Button
                  size="large"
                  shape="circle"
                  icon={<HomeOutlined />}
                  onClick={() => {
                    navigate("/dashboard/projects");
                  }}
                />
              </Tooltip>

              <Popconfirm
                title="Logout"
                description="Are you sure to logout?"
                onConfirm={OnLogout}
                okText="Confirm"
                cancelText="No"
              >
                <Tooltip title="Logout">
                  <Button
                    size="large"
                    shape="circle"
                    icon={<LogoutOutlined />}
                  />
                </Tooltip>
              </Popconfirm>

              <Tooltip title="Profile">
                <Avatar
                  size="large"
                  style={{
                    backgroundColor: appColors.primary,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/dashboard/profile");
                  }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
            </Space>
          </div>
        </nav>
      </header>
      <ChangePassowrd />
    </>
  );
};

export default AppHeader;
