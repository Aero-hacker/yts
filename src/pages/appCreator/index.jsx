import { TreeSelect } from "antd";
import AppBuilder from "./components/builder.jsx";
import AppCreatorHeader from "./components/header.jsx";
import { chipboardhirarchy } from "./data/test.jsx";
import { useState } from "react";
const AppCreator = () => {
  const [AppJSONData, setAppJSONData] = useState({});
  const [SelectedEquipmentID, setSelectedEquipmentID] = useState();
  const [FetchedJSONData, setFetchedJSONData] = useState({});
  const convertToTreeData = (data) => {
    return data.map((item) => {
      const treeNode = {
        title: item.EquipmentName,
        key: `equipment_${item.EquipmentID}`,
        children: [],
      };

      // Add configurations
      if (item.configurations && item.configurations.length > 0) {
        treeNode.children.push(
          ...item.configurations.map((config) => ({
            title: `Configuration: ${config.publish}`,
            key: `configuration_${config.id}`,
          }))
        );
      }

      // Recursively add components and chip boards
      if (item.components && item.components.length > 0) {
        treeNode.children.push(
          ...convertToTreeData(item.components),
          ...convertChipBoardsToTreeData(item.chip_boards)
        );
      }

      return treeNode;
    });
  };

  const convertChipBoardsToTreeData = (chipBoards) => {
    return chipBoards.map((chipBoard) => ({
      title: chipBoard.Description,
      key: `chipboard_${chipBoard.ChipBoardID}`,
      children: chipBoard.configurations.map((config) => ({
        title: `Configuration: ${config.publish}`,
        key: `configuration_${config.id}`,
      })),
    }));
  };

  const treeData = convertToTreeData(chipboardhirarchy);
  // console.log(treeData);
  return (
    <>
      <AppCreatorHeader
        AppJSONData={AppJSONData}
        setAppJSONData={setAppJSONData}
        SelectedEquipmentID={SelectedEquipmentID}
        setSelectedEquipmentID={setSelectedEquipmentID}
        FetchedJSONData={FetchedJSONData}
        setFetchedJSONData={setFetchedJSONData}
      />

      <div className="mt-[60px]">
        <AppBuilder
          AppJSONData={AppJSONData}
          setAppJSONData={setAppJSONData}
          SelectedEquipmentID={SelectedEquipmentID}
          setSelectedEquipmentID={setSelectedEquipmentID}
          FetchedJSONData={FetchedJSONData}
          setFetchedJSONData={setFetchedJSONData}
        />
      </div>
    </>
  );
};

export default AppCreator;
