import React, { useEffect, useRef, useState } from "react";
import { LinkOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Result,
  Space,
  Spin,
  Upload,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import apiServices from "../../services/exportService";
import { apiEndpoints } from "../../utils/apiEndPoints";
import {
  readSectionId,
  readSelectedProjectId,
  readStudentId,
  readUserId,
} from "../../services/localServices";
import appImages from "../../data/images";
import "./style.scss";
import { UploadOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import { API_FILE } from "../../DataConfig";
const ProjectCompletion = () => {
  const [form] = Form.useForm();
  const [planStatus, setPlanStatus] = useState("loading"); //laoding, none, pending, done
  const [FetchedData, setFetchedData] = useState("");

  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedFile2, setSelectedFile2] = useState([]);
  const [selectedFile3, setSelectedFile3] = useState([]);

  const [ReSubmit, setReSubmit] = useState(false);
  const [SubmitStatus, setSubmitStatus] = useState(false);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [InspectionState, setInspectionState] = useState("remote_inspection");
  useEffect(() => {
    onInitialize();
  }, []);

  const props1 = {
    onRemove: (file) => {
      const index = selectedFile.indexOf(file);
      const newFileList = selectedFile.slice();
      newFileList.splice(index, 1);
      setSelectedFile(newFileList);
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        setSelectedFile([]);
      } else {
        setSelectedFile([file]);
      }
    },
    selectedFile,
  };
  const props2 = {
    onRemove: (file) => {
      const index = selectedFile2.indexOf(file);
      const newFileList = selectedFile2.slice();
      newFileList.splice(index, 1);
      setSelectedFile2(newFileList);
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("video/");
      if (!isImage) {
        message.error("You can only upload video files!");
        setSelectedFile2([]);
      } else {
        setSelectedFile2([file]);
      }
    },
    selectedFile,
  };
  const props3 = {
    onRemove: (file) => {
      const index = selectedFile3.indexOf(file);
      const newFileList = selectedFile3.slice();
      newFileList.splice(index, 1);
      setSelectedFile3(newFileList);
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("application/");
      if (!isImage) {
        message.error("You can only upload files!");
        setSelectedFile3([]);
      } else {
        setSelectedFile3([file]);
      }
    },
    selectedFile,
  };

  function FetchCertificate() {
    setSubmitStatus(true);
    apiServices
      .post(`${apiEndpoints.ProjectCompletion.GetCertificate}`, {
        stud_id: readStudentId(),
        Project_ID: readSelectedProjectId(),
      })
      .then((res) => {
        console.log(res);
        let url = `${API_FILE}${res.data?.file_url}`;
        axios({
          url,
          method: "GET",
          responseType: "blob",
        })
          .then((response) => {
            const href = window.URL.createObjectURL(response.data);
            const anchorElement = document.createElement("a");
            anchorElement.href = href;
            anchorElement.download = "Certificate.pdf";
            document.body.appendChild(anchorElement);
            anchorElement.click();
            document.body.removeChild(anchorElement);
            window.URL.revokeObjectURL(href);
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      })
      .finally(() => {
        setSubmitStatus(false);
      });
  }

  const onInitialize = () => {
    apiServices
      .get(
        `${
          apiEndpoints.ProjectCompletion.GetByProject
        }${readSelectedProjectId()}/`
      )
      .then((res) => {
        console.log(res);
        if (res?.data.length === 0) {
          setPlanStatus("none");
        } else {
          if (res.data[0].remote_inspection) {
            if (res.data[0].remote_inspection === "Accepted") {
              // setCurrentTab(1);
              setPlanStatus(res.data[0].physical_inspection);
              setInspectionState("physical_inspection");
            } else {
              setPlanStatus(res.data[0].remote_inspection);
              setInspectionState("remote_inspection");
            }
            setFetchedData(res.data[0]);
          } else {
            setPlanStatus("none");
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  };

  const handleSubmitPlan = () => {
    const formData = new FormData();
    let PostURL;
    if (ReSubmit) {
      PostURL = `${apiEndpoints.ProjectCompletion.Update}${FetchedData.pcid}/`;
      formData.append("description", content);
      if (selectedFile.length !== 0) {
        formData.append("image", selectedFile[0]);
      }
      if (selectedFile2.length !== 0) {
        formData.append("video", selectedFile2[0]);
      }
      if (selectedFile3.length !== 0) {
        formData.append("documentation", selectedFile3[0]);
      }

      formData.append("User_Id", readUserId());
      formData.append("Project_ID", readSelectedProjectId());
      formData.append("stud_id", readStudentId());
      formData.append("Sec_ID", readSectionId());
    } else {
      if (selectedFile.length === 0) {
        message.error("Please Upload Project Image");
        return;
      }
      if (selectedFile2.length === 0) {
        message.error("Please Upload Project Video");
        return;
      }
      if (selectedFile3.length === 0) {
        message.error("Please Upload Project Document");
        return;
      }
      PostURL = `${apiEndpoints.ProjectCompletion.Create}`;
      formData.append("description", content);
      formData.append("image", selectedFile[0]);
      formData.append("video", selectedFile2[0]);
      formData.append("documentation", selectedFile3[0]);
      formData.append("User_Id", readUserId());
      formData.append("Project_ID", readSelectedProjectId());
      formData.append("stud_id", readStudentId());
      formData.append("Sec_ID", readSectionId());
    }
    console.log(selectedFile);
    setSubmitStatus(true);
    apiServices
      .post(PostURL, formData)
      .then((res) => {
        setPlanStatus("UnderReview");
        console.log(res);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setSubmitStatus(false);
      });
  };

  return (
    <>
      <div>
        {
          <>
            {planStatus === "loading" ? (
              <Spin />
            ) : planStatus === "none" ? (
              <UploadProjectPlanSection />
            ) : planStatus === "UnderReview" ? (
              <ProjectPlanUnderReview />
            ) : planStatus === "Accepted" ? (
              <ProjectPlanApproved />
            ) : planStatus === "Rejected" ? (
              <ProjectPlanRejected />
            ) : null}
          </>
        }
      </div>
    </>
  );
  function UploadProjectPlanSection() {
    return (
      <>
        {" "}
        <div className="flex flex-col items-center">
          <Space direction="vertical" className="items-center">
            <Title level={3}>Upload the Data for Project Verificaton</Title>

            <Paragraph>
              If you are using{" "}
              <a
                href="https://www.bitrix24.in/"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                Bitrix24{" "}
              </a>
              or similar websites for your project planning then please attach
              the url here.
            </Paragraph>
          </Space>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "45%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
                className="AntdUploadCustom"
              >
                <Title level={5}>Upload Image of the Project</Title>

                <Upload
                  {...props1}
                  listType="picture"
                  className="upload-list-inline"
                  defaultFileList={[...selectedFile]}
                  // onPreview={onPreview}
                  type="image/*"
                  maxCount={1}
                >
                  {selectedFile.length === 0 && (
                    <Button
                      icon={<UploadOutlined />}
                      style={{ width: "100%", height: "60px" }}
                    >
                      Upload
                    </Button>
                  )}
                </Upload>
              </div>
              <div
                style={{
                  width: "45%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
                className="AntdUploadCustom"
              >
                <Title level={5}>Upload Video of the Project</Title>

                <Upload
                  {...props2}
                  listType="picture"
                  className="upload-list-inline"
                  defaultFileList={[...selectedFile2]}
                  // onPreview={onPreview}
                  type="image/*"
                  maxCount={1}
                >
                  {selectedFile2.length === 0 && (
                    <Button
                      icon={<UploadOutlined />}
                      style={{ width: "100%", height: "60px" }}
                    >
                      Upload
                    </Button>
                  )}
                </Upload>
              </div>
              <div
                style={{
                  width: "45%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
                className="AntdUploadCustom"
              >
                <Title level={5}>
                  Upload Document or Report of the Project
                </Title>

                <Upload
                  {...props3}
                  listType="picture"
                  className="upload-list-inline"
                  defaultFileList={[...selectedFile3]}
                  // onPreview={onPreview}
                  type="image/*"
                  maxCount={1}
                >
                  {selectedFile3.length === 0 && (
                    <Button
                      icon={<UploadOutlined />}
                      style={{ width: "100%", height: "60px" }}
                    >
                      Upload
                    </Button>
                  )}
                </Upload>
              </div>
            </div>
            <div
              style={{
                margin: "2rem 0",
              }}
            >
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </div>
            <Button
              className="w-full"
              style={{ marginBottom: "2rem" }}
              // htmlType="submit"
              size="large"
              type="primary"
              loading={SubmitStatus}
              onClick={(e) => {
                e.preventDefault();
                handleSubmitPlan();
              }}
            >
              Submit Project Report
            </Button>
          </div>
        </div>
      </>
    );
  }

  function ProjectPlanUnderReview() {
    return (
      <>
        <Result
          icon={
            <img
              className="h-20"
              src={appImages.pageWise.initialProcess.underreview}
            />
          }
          title={
            FetchedData.remote_inspection === "UnderReview"
              ? "Your Project Remote Inspection is under review!"
              : FetchedData.remote_inspection === "Accepted"
              ? FetchedData.physical_inspection === "UnderReview"
                ? "Your Project Physical Inspection is under review!"
                : "Under Review"
              : "Under Review"
          }
          extra={
            <>
              <Title level={5}>
                {FetchedData.remarks !== null &&
                  `Remarks: ${FetchedData.remarks}`}
              </Title>
            </>
          }
        />
      </>
    );
  }

  function ProjectPlanApproved() {
    return (
      <>
        <Result
          status="success"
          title="Great! Your Project is Completed."
          subTitle="Approved"
          extra={[
            <Button
              onClick={() => {
                FetchCertificate();
              }}
              type="primary"
              key="console"
              loading={SubmitStatus}
            >
              Download Certificate
            </Button>,
          ]}
        />
      </>
    );
  }

  function ProjectPlanRejected() {
    return (
      <>
        <Result
          status="error"
          title={`${
            InspectionState === "remote_inspection"
              ? "Remote Inspection Rejected"
              : "Physical Inspection Rejected"
          }`}
          subTitle="Please revisit your project and do the needful."
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                setPlanStatus("none");
                setReSubmit(true);
                setContent(FetchedData.description);
              }}
            >
              Try Again
            </Button>,
            <Button key="buy">Contact Teacher</Button>,
          ]}
        ></Result>
      </>
    );
  }
};

export default ProjectCompletion;
