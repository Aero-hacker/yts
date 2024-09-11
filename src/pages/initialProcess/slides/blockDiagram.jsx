import React, { useEffect, useState } from "react";
import { LinkOutlined } from "@ant-design/icons";
import { Button, Form, Input, Result, Space, Spin, Upload } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import apiServices from "../../../services/exportService";
import { apiEndpoints } from "../../../utils/apiEndPoints";
import {
  readSectionId,
  readSelectedProjectId,
  readStudentId,
  readUserId,
} from "../../../services/localServices";
import appImages from "../../../data/images";
import { UploadOutlined } from "@ant-design/icons";

const BlockDiagramSlide = ({ setCurrentTab, currentTab }) => {
  const [form] = Form.useForm();
  const [blockDiagramStatus, setBlockDiagramStatus] = useState("loading"); //laoding, none, pending, Accepted
  const [selectedFile, setSelectedFile] = useState([]);
  const [FetchedData, setFetchedData] = useState("");
  const [ReSubmit, setReSubmit] = useState(false);

  useEffect(() => {
    onInitialize();
  }, []);

  //Basic Functions
  const handleFileChange = (event) => {
    // console.log();
    setSelectedFile(event.target.files[0]);
  };

  const props = {
    onRemove: (file) => {
      const index = selectedFile.indexOf(file);
      const newFileList = selectedFile.slice();
      newFileList.splice(index, 1);
      setSelectedFile(newFileList);
    },
    beforeUpload: (file) => {
      setSelectedFile([file]);
      return false;
    },
    selectedFile,
  };

  //main Action Functions
  const onInitialize = () => {
    apiServices
      .get(
        `${
          apiEndpoints.home.initialProcess.blockDiagram.get
        }${readSelectedProjectId()}/`
      )
      .then((res) => {
        if (res?.data.length === 0) {
          setBlockDiagramStatus("none");
        } else {
          if (res.data[0].status) {
            if (res.data[0].status === "Accepted") {
              setCurrentTab(2);
            }
            setBlockDiagramStatus(res.data[0].status);
            setFetchedData(res.data[0]);
          } else {
            setBlockDiagramStatus("none");
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  };

  const handleSubmitPlan = (values) => {
    const formData = new FormData();
    let PostURL;
    if (ReSubmit) {
      PostURL = `${apiEndpoints.home.initialProcess.blockDiagram.update}${FetchedData.DID}/`;
      formData.append("upload_diagram", selectedFile[0]);
      formData.append("Description", values.description);
    } else {
      PostURL = `${apiEndpoints.home.initialProcess.blockDiagram.create}`;
      formData.append("upload_diagram", selectedFile[0]);
      formData.append("Description", values.description);
      formData.append("User_Id", readUserId());
      formData.append("Project_ID", readSelectedProjectId());
      formData.append("stud_id", readStudentId());
      formData.append("Sec_ID", readSectionId());
    }

    console.log(values);
    apiServices
      .post(PostURL, formData)
      .then((res) => {
        setBlockDiagramStatus("UnderReview");
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  };

  return (
    <>
      {blockDiagramStatus === "loading" ? (
        <Spin />
      ) : blockDiagramStatus === "none" ? (
        <UploadBlockDiagramSection />
      ) : blockDiagramStatus === "UnderReview" ? (
        <BlockDiagramUnderReview />
      ) : blockDiagramStatus === "Accepted" ? (
        <BlockDiagramApproved />
      ) : blockDiagramStatus === "Rejected" ? (
        <BlockDiagramRejected />
      ) : null}
    </>
  );

  function UploadBlockDiagramSection() {
    return (
      <>
        <div className="flex flex-col items-center">
          <Space direction="vertical" className="items-center">
            <Title level={3}>Upload the project Block Diagram</Title>

            <Paragraph>
              If you are using{" "}
              <a
                href="https://www.drawio.com/"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                draw.io{" "}
              </a>
              or similar websites for your block diagram then please attach the
              url here.
            </Paragraph>

            <Form onFinish={handleSubmitPlan} form={form} layout="vertical">
              <Upload
                {...props}
                listType="picture"
                className="upload-list-inline"
                defaultFileList={[...selectedFile]}
                // onPreview={onPreview}
                maxCount={1}
              >
                {selectedFile.length === 0 && (
                  <Button
                    icon={<UploadOutlined />}
                    style={{ width: "350px", height: "60px" }}
                  >
                    Upload
                  </Button>
                )}
              </Upload>
              <Form.Item label={"Description"} name="description">
                <Input
                  name="description"
                  type="Description"
                  size="large"
                  placeholder="Enter your project plan description if any"
                  prefix={<LinkOutlined />}
                />
              </Form.Item>

              <Button
                className="w-full"
                htmlType="submit"
                size="large"
                type="primary"
              >
                Request for Approval
              </Button>
            </Form>
          </Space>
        </div>
      </>
    );
  }

  function BlockDiagramUnderReview() {
    return (
      <>
        <Result
          icon={
            <img
              className="h-20"
              src={appImages.pageWise.initialProcess.underreview}
            />
          }
          title="Your project block diagram is under review!"
          extra={<></>}
        />
      </>
    );
  }

  function BlockDiagramApproved() {
    return (
      <>
        <Result
          status="success"
          title="Great! Your project block diagram is approved."
          subTitle=""
          extra={[
            <Button
              onClick={() => setCurrentTab(2)}
              type="primary"
              key="console"
            >
              Next
            </Button>,
          ]}
        />
      </>
    );
  }

  function BlockDiagramRejected() {
    return (
      <>
        <Result
          status="error"
          title="Project block diagram Rejected"
          subTitle="Please revisit your project plan and do the needful."
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                setBlockDiagramStatus("none");
                setReSubmit(true);
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
export default BlockDiagramSlide;
