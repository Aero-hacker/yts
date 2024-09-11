import { Button, Tabs } from "antd";
import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { CalendarOutlined, InsertRowAboveOutlined } from "@ant-design/icons";
import { Spin } from "antd";

import Kanban from "./src/App";
import GanttChart from "./gaant";
import store from "./src/redux/store";
import { apiEndpoints } from "../../utils/apiEndPoints";
import apiServices from "../../services/exportService";
import {
  readSectionId,
  readSelectedProjectId,
  readStudentId,
  readUserId,
} from "../../services/localServices";
import boardsSlice from "./src/redux/boardsSlice";

export default function ProjectPlanner() {
  return (
    <div className="overflow-hidden relative h-full rounded-md p-1 -my-6 -mx-2">
      <Provider store={store}>
        <Wrapper />
      </Provider>
    </div>
  );
}

function Wrapper() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const boards = useSelector((state) => state.boards);
  const [projectPlanningId, setProjectPlanningId] = useState(null);
  async function getProjectPlaningJson() {
    try {
      const response = await apiServices.get(
        `${apiEndpoints.ProjectPlanning.GET}${readSelectedProjectId()}/`
      );
      if (response.data.length !== 0) {
        setProjectPlanningId(response.data[0].ppid);
        if (response.data[0].upload_projectplan !== null) {
          dispatch(
            boardsSlice.actions.setInitialDate(
              response.data[0].upload_projectplan.boards
            )
          );
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function createProjectPlanningJson() {
    setLoading(true);
    let obj = {
      description: "Test",
      Project_ID: readSelectedProjectId(),
      upload_projectplan: { boards },
      stud_id: readStudentId(),
      User_Id: readUserId(),
      Sec_ID: readSectionId(),
    };
    try {
      const response = await apiServices.post(
        `${apiEndpoints.ProjectPlanning.CREATE}`,
        obj
      );
      if (response.status === 201) {
        getProjectPlaningJson();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateProjectPlanJSON() {
    setLoading(true);
    let obj = {
      description: "Test",
      Project_ID: readSelectedProjectId(),
      upload_projectplan: { boards },
      stud_id: readStudentId(),
      User_Id: readUserId(),
      Sec_ID: readSectionId(),
    };
    try {
      await apiServices.post(
        `${apiEndpoints.ProjectPlanning.UPDATE}${projectPlanningId}/`,
        obj
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const items = [
    {
      key: "1",
      label: "Kanban View",
      children: <Kanban />,
      icon: <InsertRowAboveOutlined />,
    },
    {
      key: "2",
      label: "Gantt Chart",
      children: <GanttChart />,
      icon: <CalendarOutlined />,
    },
  ];

  useEffect(() => {
    getProjectPlaningJson();
  }, []);

  return (
    <>
      <Spin spinning={loading}>
        {boards.length !== 0 ? (
          <Button
            className="absolute top-1 right-5 z-50"
            type="primary"
            loading={loading}
            size="middle"
            onClick={
              projectPlanningId == null
                ? createProjectPlanningJson
                : updateProjectPlanJSON
            }
          >
            Save
          </Button>
        ) : null}
        <Tabs size="middle" defaultActiveKey="1" items={items} />
      </Spin>
    </>
  );
}
