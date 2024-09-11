import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  DashboardOutlined,
  HomeOutlined,
  MobileOutlined,
  CodeOutlined,
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
  FileDoneOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { appColors } from "../../../../theme/common/colors";
import { pagesWithoutLayout } from "../../../../routes/config";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AppSidebar = () => {
  const navigate = useNavigate();
  const [CurrentURLPath, setCurrentURLPath] = useState("");
  useEffect(() => {
    let TempURL = window.location.href;
    let CurrentPaths = TempURL.split("/");
    let CurrentPath = CurrentPaths[CurrentPaths.length - 1];
    console.log(CurrentPath);
    setCurrentURLPath(CurrentPath);
  }, [window.location.href]);

  return (
    <>
      <Sidebar
        rootStyles={{
          background: "white",
        }}
      >
        <Menu
          style={{
            paddingTop: 80,
            height: "100vh",
          }}
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : active ? "white" : "black",
                  backgroundColor: active ? appColors.primary : undefined,
                };
            },
          }}
        >
          <MenuItem
            active={CurrentURLPath === "dashbaord" ? true : false}
            icon={<DashboardOutlined name="dashboard" />}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            active={CurrentURLPath === "projectplanner" ? true : false}
            onClick={() => navigate("projectplanner")}
            icon={<TableOutlined name="projectplanner" />}
          >
            Project Planner
          </MenuItem>
          <Link
            reloadDocument
            to={"/blockdiagram"}
            className="w-full h-full block visited:text-black"
          >
            <MenuItem icon={<TableOutlined name="blockdiagram" />}>
              Block Diagram
            </MenuItem>
          </Link>
          {/* <MenuItem
            active={CurrentURLPath === "inventory" ? true : false}
            icon={<ShopOutlined name="inventory" />}
            onClick={() => navigate("inventory")}
          >
            Inventory
          </MenuItem> */}
          <MenuItem
            active={CurrentURLPath === "configuration" ? true : false}
            onClick={() => navigate("configuration")}
            icon={<SettingOutlined name="configuration" />}
          >
            Configuration
          </MenuItem>
          <MenuItem
            active={CurrentURLPath === "app-creator" ? true : false}
            onClick={() => navigate("app-creator")}
            icon={<MobileOutlined name="appcreator" />}
          >
            App Creator
          </MenuItem>
          <MenuItem
            active={CurrentURLPath === "code-push" ? true : false}
            onClick={() => navigate("code-push")}
            icon={<CodeOutlined name="appcreator" />}
          >
            Code Push
          </MenuItem>
          <MenuItem
            active={CurrentURLPath === "project-completion" ? true : false}
            onClick={() => navigate("project-completion")}
            icon={<FileDoneOutlined name="projectCompletion" />}
          >
            Project Completion
          </MenuItem>{" "}
          <MenuItem
            active={CurrentURLPath === "chat" ? true : false}
            onClick={() => navigate("/chat")}
            icon={<FileDoneOutlined name="Chat" />}
          >
            Chat
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
