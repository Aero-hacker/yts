import React, { useState } from "react";
import { Button, Table, Modal, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CodePushData from "../data/dummyDataCodePush";
import apiServices from "../../../services/exportService";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import "../style.css";
import { ESP_Dev1_Generation } from "../CustomGeneration/ChipBoards/ESP32_Dev1";
import { readUserId } from "../../../services/localServices";
import moment from "moment";
import { API_FILE } from "../../../DataConfig";
const InventoryTable = ({ data, fetchList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [JSONData, setJSONData] = useState({});
  const [JSONData2, setJSONData2] = useState({});
  const [BinFileProcessing, setBinFileProcessing] = useState(false);
  const [ConnectBoard, setConnectBoard] = useState(true);

  const [SelectedJSONID, setSelectedJSONID] = useState();
  const [BinFileStatus, setBinFileStatus] = useState(false);
  const [BinFileName, setBinFileName] = useState(false);
  const [JSONName, setJSONName] = useState();
  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Equipment",
      dataIndex: "Equipment",
      key: "Equipment",
    },
    {
      title: "Bin File Status",
      dataIndex: "BinFileState",
      key: "BinFileState",
      render: (item) => <>{item ? "True" : "False"}</>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (item, items) => (
        <>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setSelectedJSONID(items.Data.jsondata_id);
              setBinFileStatus(items.BinFileState);
              setBinFileName(items.Data.embedded_generated_name);
              setJSONName(items.Name);
              setJSONData(items.Data.json);
              setJSONData2(items.Data.json2);
              console.log("Complete Data", items);
              console.log("Hardware Json Data", items.Data.json);
              console.log("Hardware Json Data2", items.Data.json2);
            }}
            type="primary"
            size="large"
          >
            Push Code
          </Button>
        </>
      ),
    },
  ];
  function GenerateEmbeddedCode(JSONData) {
    // To Generate Embedded Code
    let FinalData = ESP_Dev1_Generation(
      JSONData,
      JSONData2,
      JSONName,
      setBinFileProcessing
    );

    // setBinFileProcessing(false);
    // return;
    // For Generating Bin File
    const formData = new FormData();
    formData.append("name", FinalData?.Name);
    formData.append("version", "V1.00");
    formData.append("code", FinalData?.EmbeddedCode);
    formData.append("hardware_name", "esp32:esp32:nodemcu-32s");
    formData.append("filename", FinalData?.FileName);
    formData.append("User_Id", readUserId());

    apiServices
      .post(apiEndpoints.CodePush.GenerateBinFile, formData)
      .then((data) => {
        console.log(data);
        let TempFilePath = `${API_FILE}/media/Embedded/Arduino/${FinalData?.FileName}/${FinalData?.FileName}.ino.bin`;
        let TempDate = new Date();

        apiServices
          .post(`${apiEndpoints.CodePush.UpdateJSON}${SelectedJSONID}/`, {
            embedded_generated_code_state: true,
            embedded_generated_name: FinalData?.FileName,
            embedded_generated_time: moment(TempDate).format(
              "MMMM Do YYYY, h:mm:ss a"
            ),
          })
          .then((data) => {
            console.log(data);
            message.success(`Embedded Bin File code Generation Success`);
            GenerateManifest(TempFilePath);
            setConnectBoard(false);
            fetchList();
          });
      })
      .catch((data) => {
        console.log(data);
        if (data?.data?.message) {
          message.error(data?.data?.message);
        } else {
          message.error("Something went wrong");
        }
        if (data?.response?.data?.message) {
          navigator.clipboard.writeText(`${data?.response?.data?.message}`);
          message.info("Error is Copied to Clipboard");
        }
      })
      .finally(() => {
        setBinFileProcessing(false);
      });
  }
  function GenerateManifest(TempFilePath) {
    let myDynamicManifest = {
      name: JSONName,
      version: "Pezala_V1.0",
      new_install_prompt_erase: false,
      builds: [
        {
          chipFamily: "ESP32",
          parts: [
            {
              path: `${API_FILE}/media/Embedded/Arduino/FixedFiles/boot_app0.bin`,
              offset: 57344,
            },
            {
              path: TempFilePath,
              offset: 65536,
            },
            {
              path: `${API_FILE}/media/Embedded/Arduino/FixedFiles/BootLoaderFile.ino.bootloader.bin`,
              offset: 4096,
            },
            {
              path: `${API_FILE}/media/Embedded/Arduino/FixedFiles/PartionFile.ino.partitions.bin`,
              offset: 32768,
            },
          ],
        },
      ],
    };
    console.log("<-----------File Path Generated---------------->");
    console.log({
      TempFilePath: TempFilePath,
      DynamicManifest: myDynamicManifest,
    });
    const stringManifest = JSON.stringify(myDynamicManifest);
    const blob = new Blob([stringManifest], { type: "application/json" });
    const manifestURL = URL.createObjectURL(blob);
    document
      .querySelector("esp-web-install-button")
      .setAttribute("manifest", manifestURL);
  }
  return (
    <>
      <Table dataSource={data} columns={columns} />
      <Modal
        title="Generate Bin File"
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          setConnectBoard(true);
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", color: "gray" }}>
            Please click on the 'Generate Bin File' button below to generate the
            embedded software for the version you have selected.
          </div>
          <Button
            type="primary"
            loading={BinFileProcessing}
            disabled={!ConnectBoard}
            style={{ width: "180px", margin: "1rem 0" }}
            onClick={() => {
              if (BinFileStatus) {
                let TempFilePath = `${API_FILE}/media/Embedded/Arduino/${BinFileName}/${BinFileName}.ino.bin`;
                GenerateManifest(TempFilePath);
                setConnectBoard(false);
                message.info("Bin File Exists!");
              } else {
                GenerateEmbeddedCode(JSONData);
              }
            }}
          >
            Generate Bin File
          </Button>
          <div style={{ textAlign: "center", color: "gray" }}>
            After generating the Bin File, proceed by clicking on 'Connect
            Board' to transfer and upload the code to the hardware.
          </div>
          <esp-web-install-button
            id="installButton"
            manifest=""
            onClick={() => {
              setIsModalOpen(false);
              setConnectBoard(true);
            }}
          >
            <Button
              disabled={ConnectBoard}
              style={{ width: "180px", margin: "1rem 0" }}
              slot="activate"
              type="primary"
              role="button"
            >
              Connect Board
            </Button>
          </esp-web-install-button>
        </div>
      </Modal>
    </>
  );
};
export default InventoryTable;
