import {
  Button,
  Divider,
  Popconfirm,
  Result,
  Space,
  Spin,
  Tooltip,
} from "antd";
import EquipmentCard from "../components/equipmentCard";
import { PlusOutlined } from "@ant-design/icons";
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
import { useEffect, useState } from "react";
import ComponentCard from "../components/componentCard";
import BOMForm from "../components/bomForm";
import ProductForm from "../components/productForm";
import ProductCard from "../components/productCard";
import { useNavigate } from "react-router-dom";
import appImages from "../../../data/images";

const BOMSlide = () => {
  const navigate = useNavigate();
  const [BOMStatus, setBOMStatus] = useState("loading"); //laoding, none, Pending, done
  const [bomRequestId, setBomRequestId] = useState(null); // BOM request ID
  const [bomData, setBOMData] = useState([]); // BOM hierarchy data
  const [selectedEquipment, setSelectedEquipment] = useState(null); // selected equipment or component ID
  const [openBOMForm, setOpenBOMForm] = useState({
    status: false,
    type: "",
    parentId: null,
  }); // Toggle BOM Equipment and component creation form
  const [openProductForm, setOpenProductForm] = useState({
    status: false,
    type: "create",
    parentId: null,
  }); // Toggle BOM Equipment and component creation form
  const [compHierarchy, setCompHierarchy] = useState([]); // Component Heirarchy Nested Array
  const [compHSelectedIndexes, setCompHSelectedIndexes] = useState([]);
  //When BOMSlide component first Iinitialized
  useEffect(() => {
    onInitialize();
  }, []);

  useEffect(() => {
    console.log(compHSelectedIndexes);
  }, [compHSelectedIndexes]);

  //main action functions
  const onInitialize = () => {
    apiServices
      .get(
        `${
          apiEndpoints.home.initialProcess.bom.getBomRequest
        }${readSelectedProjectId()}`
      )
      .then((res) => {
        if (res?.data.length === 0) {
          setBOMStatus("none");
        } else {
          if (
            res.data[0].status === "Pending" ||
            res.data[0].status === "Rejected"
          ) {
            setBOMStatus("Pending");

            setBomRequestId(res.data[0].id);
            getEquipmentslist(res.data[0].id);
          } else {
            setBOMStatus(res.data[0].status);
          }
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  };

  // To get equipment and component list
  const getEquipmentslist = (bomRequestId) => {
    apiServices
      .get(`${apiEndpoints.home.initialProcess.bom.getBom}${bomRequestId}`)
      .then((bomdata) => {
        setBOMData(bomdata.data);
        setCompHierarchy([]);
        setCompHSelectedIndexes([]);
      })
      .catch((e) => console.log(e));
  };

  // Create new bom request
  const handleCreateBOMRequest = () => {
    const values = {
      project_id: readSelectedProjectId(),
      user_id: readUserId(),
      student_id: readStudentId(),
      sec_id: readSectionId(),
    };
    apiServices
      .post(
        `${
          apiEndpoints.home.initialProcess.bom.createRequest
        }${readSelectedProjectId()}`,
        values
      )
      .then((res) => {
        if (res.status === 200) {
          onInitialize();
          setBOMStatus("Pending");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {});
  };

  // when any equipment or component is selected
  const onEquipmentSelected = (equipment) => {
    setSelectedEquipment(equipment.id);
    let tempcompHSelectedIndexes = [];
    let tempCompHeirarchy = [];
    tempCompHeirarchy.push(equipment.child);
    tempcompHSelectedIndexes.push(null);
    console.log("compHierarchy", tempCompHeirarchy);
    setCompHSelectedIndexes([...tempcompHSelectedIndexes]);
    setCompHierarchy(tempCompHeirarchy);
  };

  const onComponentSelected = (component, level) => {
    let tempcompHSelectedIndexes = [];
    let tempCompHeirarchy = compHierarchy;
    console.log("level", level);
    console.log("compHierarchy", tempCompHeirarchy);
    if (level === compHSelectedIndexes.length - 1) {
      console.log("last");
      tempcompHSelectedIndexes = compHSelectedIndexes;
    } else {
      compHSelectedIndexes.map((data, i) => {
        if (i <= level) {
          tempcompHSelectedIndexes.push(data);
        }
      });
      tempcompHSelectedIndexes.push(null);
    }
    tempcompHSelectedIndexes[level] = component.id;
    tempCompHeirarchy[level + 1] = component.child;

    // tempcompHSelectedIndexes.push(component.id);
    if (tempcompHSelectedIndexes[level + 1] === null) {
    } else {
      tempcompHSelectedIndexes.push(null);
      tempCompHeirarchy.push([]);
    }

    setCompHSelectedIndexes([...tempcompHSelectedIndexes]);
    setCompHierarchy(tempCompHeirarchy);
  };

  const onFinalBOMSubmit = () => {
    apiServices
      .post(`${apiEndpoints.home.initialProcess.bom.submitBOM}${bomRequestId}/`)
      .then((res) => {
        onInitialize();
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      {BOMStatus === "loading" ? (
        <Spin />
      ) : BOMStatus === "Accepted" ? (
        <BOMApproved />
      ) : BOMStatus === "UnderReview" ? (
        <BOMUnderReview />
      ) : BOMStatus === "none" ? (
        <div className="flex flex-col items-center">
          <Space direction="vertical" className="items-center">
            <Title level={3}>Bill of Materials (BOM)</Title>
            <Paragraph className="max-w-3xl text-center">
              A bill of materials is a list of the raw materials,
              sub-assemblies, intermediate assemblies, sub-components, parts,
              and the quantities of each needed to manufacture an end product
            </Paragraph>
            <Button
              className="w-full"
              size="large"
              type="primary"
              onClick={handleCreateBOMRequest}
            >
              Create BOM
            </Button>
          </Space>
        </div>
      ) : BOMStatus === "Pending" ? (
        <>
          <Space
            direction="horizontal"
            className="ml-2 mb-4 py-2 w-full text-xl font-regular items-center justify-between  bg-gray-50 rounded-xl border-solid border-gray-100"
          >
            <p className="ml-4">Bill of Materials</p>
            <Popconfirm
              title="Submit BOM & Request for Approval"
              description="Are you sure to submit BOM?"
              onConfirm={onFinalBOMSubmit}
              okText="Confirm"
              cancelText="No"
            >
              <Button size="large" type="primary" className="mr-2">
                Request for Approval
              </Button>
            </Popconfirm>
          </Space>
          <Space
            direction="vertical"
            className=" w-full items-start overflow-auto"
          >
            <Space className="flex flex-row gap-4 justify-start items-start w-full">
              <EquipmentSection />
              {selectedEquipment
                ? compHSelectedIndexes.map((data, i) => (
                    <ComponentSection
                      level={i}
                      key={i}
                      data={
                        i === 0
                          ? selectedEquipment
                          : compHSelectedIndexes[i - 1]
                      }
                    />
                  ))
                : null}
            </Space>
            {/* Bom Form */}
            <BOMForm
              bomRequestId={bomRequestId}
              openBomForm={openBOMForm}
              getEquipmentslist={getEquipmentslist}
              setOpenBomForm={setOpenBOMForm}
              selectedParentId={selectedEquipment}
            />
            {/* Product form */}
            <ProductForm
              bomRequestId={bomRequestId}
              openBomForm={openProductForm}
              getEquipmentslist={getEquipmentslist}
              setOpenBomForm={setOpenProductForm}
            />
          </Space>{" "}
        </>
      ) : null}
    </>
  );

  function EquipmentSection() {
    return (
      <>
        <div className="h-[62vh] flex flex-col bg-gray-50 px-4 pt-2 pb-4 rounded-xl border-solid border-gray-100">
          <Space className="justify-between items-center mb-3  w-[18rem]">
            <p className="text-lg font-semibold">Modules</p>
            <Tooltip title={"Add new Modules"}>
              <Button
                onClick={() =>
                  setOpenBOMForm({
                    status: true,
                    type: "equipment",
                    parentId: null,
                  })
                }
                size="large"
                type="outlined"
                icon={<PlusOutlined />}
              >
                Add
              </Button>
            </Tooltip>
          </Space>
          <div className="flex flex-col gap-2 overflow-auto ">
            {bomData.map((data, index) => (
              <EquipmentCard
                key={index}
                data={data}
                onEquipmentSelected={onEquipmentSelected}
                selectedEquipment={selectedEquipment}
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  function ComponentSection({ level, data }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      getProductslist();
    }, []);

    const getProductslist = () => {
      apiServices
        .get(`${apiEndpoints.home.initialProcess.bom.getProduct}${data}`)
        .then((data) => {
          setProducts(data.data);
        })
        .catch((e) => console.log(e));
    };

    return (
      <>
        <div className="h-[55vh] flex flex-col bg-gray-50 px-4 pt-2 pb-4 rounded-xl border-solid border-gray-100">
          <Space className="items-center mb-3  w-[20rem] bg-primary rounded-lg mt-2">
            {/* <p className="text-lg font-semibold">Components</p> */}
            <Tooltip title={"Add new equipment"}>
              <Button
                className="w-full"
                onClick={() =>
                  setOpenBOMForm({
                    status: true,
                    type: "component",
                    parentId: data,
                  })
                }
                size="large"
                type="primary"
                icon={<PlusOutlined />}
              >
                Component
              </Button>
            </Tooltip>
            <Button
              className="w-full"
              onClick={() =>
                setOpenProductForm({
                  status: true,
                  type: "create",
                  parentId: data,
                })
              }
              size="large"
              type="primary"
              icon={<PlusOutlined />}
            >
              Product
            </Button>
          </Space>
          <div className="flex flex-col gap-2 overflow-auto ">
            <p className="text-sm">Components</p>

            {compHierarchy[level].map((component, i) => (
              <ComponentCard
                key={i}
                data={component}
                onComponentSelected={onComponentSelected}
                selectedComponent={compHSelectedIndexes[level]}
                level={level}
              />
            ))}
            {products.length !== 0 ? <p className="text-sm">Products</p> : null}

            {products.map((product, i) => (
              <ProductCard data={product} key={i} />
            ))}
          </div>
        </div>
      </>
    );
  }

  function BOMUnderReview() {
    return (
      <>
        <Result
          icon={
            <img
              className="h-20"
              src={appImages.pageWise.initialProcess.underreview}
            />
          }
          title="Your project BOM is under review!"
          extra={<></>}
        />
      </>
    );
  }

  function BOMApproved() {
    return (
      <>
        <Result
          status="success"
          title="Great! Your Bill of material is approved."
          subTitle=""
          extra={[
            <Button
              onClick={() => navigate("/dashboard/home")}
              type="primary"
              key="console"
            >
              Done
            </Button>,
          ]}
        />
      </>
    );
  }
};

export default BOMSlide;
