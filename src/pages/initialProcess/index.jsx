import React, { useState } from "react";
import { Button, message, Space, Steps } from "antd";
import BlockDiagramSlide from "./slides/blockDiagram";
import ProjectPlanSlide from "./slides/projectPlan";
import BOMSlide from "./slides/bom";
import { useNavigate } from "react-router-dom";

const InitialProcessPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const navigate = useNavigate();
  const next = () => {
    setCurrentTab(currentTab + 1);
  };
  const prev = () => {
    setCurrentTab(currentTab - 1);
  };

  const Tabs = [
    {
      title: "Project Plans",
      content: (
        <ProjectPlanSlide
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
        />
      ),
    },
    {
      title: "Block Diagram",
      content: (
        <BlockDiagramSlide
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
        />
      ),
    },

    {
      title: "Bill of materials(BOM)",
      content: (
        <BOMSlide setCurrentTab={setCurrentTab} currentTab={currentTab} />
      ),
    },
  ];
  const items = Tabs.map((item) => ({
    key: item.title,
    description: item.description,
    title: item.title,
  }));

  return (
    <>
      <div className="max-w-8xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <Space className="w-full mb-8 mt-6 flex justify-between">
          <h1 className="block text-xl font-bold text-gray-800 sm:text-2xl  ">
            Initial Process
          </h1>
          {/* <div
            style={{
              marginTop: 24,
            }}
            className="mt-[24px] flex flex-row gap-5 items-center justify-end"
          >
            {currentTab > 0 && (
              <Button size="large" onClick={() => prev()}>
                Previous
              </Button>
            )}
            {currentTab < Tabs.length - 1 && (
              <Button type="primary" size="large" onClick={() => next()}>
                Next
              </Button>
            )}
            {currentTab === Tabs.length - 1 && (
              <Button
                type="primary"
                size="large"
                onClick={() => navigate("/dashboard/inventory")}
              >
                Done
              </Button>
            )}
          </div> */}
        </Space>
        <Steps current={currentTab} items={items} />
        <div
          className={`bg-white flex flex-col items-center justify-center my-6 ${
            currentTab === 2 ? "h-[75vh]" : "h-[61vh]"
          }  p-6 rounded-xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]`}
        >
          {Tabs[currentTab].content}
        </div>
      </div>
    </>
  );
};
export default InitialProcessPage;
