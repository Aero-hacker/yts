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
  readSelectedProjectId,
  readStudentId,
  readUserId,
} from "../../../services/localServices";
import { useEffect, useState } from "react";
import ComponentCard from "../components/componentCard";
import EquipmentForm from "../components/EquipmentForm";
import ComponentForm from "../components/ComponentForm";
import ChipBoardForm from "../components/ChipBoardForm";
import ProductForm from "../components/productForm";
import ProductCard from "../components/productCard";
import { useNavigate } from "react-router-dom";

const BOMSlide = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getEquipmentslist();
  }, []);

  const [openEquipmentForm, setOpenEquipmentForm] = useState({
    status: false,
    type: "",
    parentId: null,
  }); // Equipment Form Data
  const [openComponentForm, setOpenComponentForm] = useState({
    status: false,
    type: "",
    parentId: null,
  }); // Component Form Data
  const [openChipBoardForm, setOpenChipBoardForm] = useState({
    status: false,
    type: "",
    parentId: null,
  }); // Chip Board Form Data
  const [EquipmentData, setEquipmentData] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null); // selected equipment or component ID
  const [SelectedParentID, setSelectedParentID] = useState(0); // Parent ID is Saved

  const [BOMStatus, setBOMStatus] = useState("loading"); //laoding, none, Pending, done
  const [bomRequestId, setBomRequestId] = useState(null); // BOM request ID
  const [bomData, setBOMData] = useState([]); // BOM hierarchy data

  const [openProductForm, setOpenProductForm] = useState({
    status: false,
    type: "",
    parentId: null,
  }); // Toggle BOM Equipment form
  const [compHierarchy, setCompHierarchy] = useState([]); // Component Heirarchy Nested Array
  const [compHSelectedIndexes, setCompHSelectedIndexes] = useState([]);
  //When BOMSlide component first Iinitialized

  useEffect(() => {
    console.log(EquipmentData);
  }, [EquipmentData]);

  // To get equipment and component list
  const getEquipmentslist = () => {
    apiServices
      .get(
        `${apiEndpoints.Configuration.CompleteData}${readSelectedProjectId()}`
      )
      .then((EquData) => {
        setEquipmentData(EquData.data);
        setCompHierarchy([]);
        setCompHSelectedIndexes([]);
      })
      .catch((e) => console.log(e));
  };

  // when any equipment is selected
  const onEquipmentSelected = (equipment) => {
    setSelectedEquipment(equipment.EquipmentID);
    let tempcompHSelectedIndexes = [];
    let tempCompHeirarchy = [];
    tempCompHeirarchy.push([
      { Comp: equipment.components, Chip: equipment.chip_boards },
    ]);
    tempcompHSelectedIndexes.push(null);
    console.log("compHierarchy", tempCompHeirarchy);
    setCompHSelectedIndexes([...tempcompHSelectedIndexes]);
    setCompHierarchy(tempCompHeirarchy);
  };

  const onComponentSelected = (component, level, SelectedData) => {
    console.log(component);
    console.log(SelectedData);
    setSelectedParentID(SelectedData.ComponentID);
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
    tempcompHSelectedIndexes[level] = SelectedData.ComponentID;
    tempCompHeirarchy[level + 1] = [
      {
        Comp: SelectedData.components,
        Chip: SelectedData.chip_boards,
      },
    ];

    if (tempcompHSelectedIndexes[level + 1] === null) {
    } else {
      tempcompHSelectedIndexes.push(null);
      tempCompHeirarchy.push([]);
    }

    setCompHSelectedIndexes([...tempcompHSelectedIndexes]);
    setCompHierarchy(tempCompHeirarchy);
  };

  return (
    <>
      <Space
        direction="horizontal"
        className="ml-2 mb-4 py-2 w-full text-xl font-regular items-center justify-between  bg-gray-50 rounded-xl border-solid border-gray-100"
      >
        <p className="ml-4">Configuration</p>
        {/* <Popconfirm
          title="Submit BOM & Request for Approval"
          description="Are you sure to submit BOM?"
          onConfirm={onFinalBOMSubmit}
          okText="Confirm"
          cancelText="No"
        >
          <Button size="large" type="primary" className="mr-2">
            Request for Approval
          </Button>
        </Popconfirm> */}
      </Space>
      <Space direction="vertical" className=" w-full items-start overflow-auto">
        <Space className="flex flex-row gap-4 justify-start items-start w-full">
          <EquipmentSection />
          {selectedEquipment
            ? compHSelectedIndexes.map((data, i) => (
                <ComponentSection
                  level={i}
                  key={i}
                  SelectedEquipmentID={selectedEquipment}
                  SelectedParentID={SelectedParentID}
                  compHSelectedIndexes={compHSelectedIndexes}
                  data={
                    i === 0 ? selectedEquipment : compHSelectedIndexes[i - 1]
                  }
                />
              ))
            : null}
        </Space>
        {/* Equipment Form */}
        <EquipmentForm
          openEquipmentForm={openEquipmentForm}
          setOpenEquipmentForm={setOpenEquipmentForm}
          getEquipmentslist={getEquipmentslist}
        />
        {/* Component Form */}
        <ComponentForm
          openComponentForm={openComponentForm}
          setOpenComponentForm={setOpenComponentForm}
          getEquipmentslist={getEquipmentslist}
        />
        {/* Chip Board Form */}
        <ChipBoardForm
          openChipBoardForm={openChipBoardForm}
          setOpenChipBoardForm={setOpenChipBoardForm}
          getEquipmentslist={getEquipmentslist}
        />
        {/* Product form
        <ProductForm
          bomRequestId={bomRequestId}
          openBomForm={openProductForm}
          getEquipmentslist={getEquipmentslist}
          setOpenEquipmentForm={setOpenProductForm}
        /> */}
      </Space>{" "}
    </>
  );

  function EquipmentSection() {
    return (
      <>
        <div className="h-[62vh] flex flex-col bg-gray-50 px-4 pt-2 pb-4 rounded-xl border-solid border-gray-100">
          <Space className="justify-between items-center mb-3  w-[18rem]">
            <p className="text-lg font-semibold">Equipments</p>
            <Tooltip title={"Add new equipment"}>
              <Button
                onClick={() =>
                  setOpenEquipmentForm({
                    status: true,
                    type: "Create",
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
            {EquipmentData.map((data, index) => (
              <EquipmentCard
                key={index}
                data={data}
                onEquipmentSelected={onEquipmentSelected}
                selectedEquipment={selectedEquipment}
                getEquipmentslist={getEquipmentslist}
                setOpenEquipmentForm={setOpenEquipmentForm}
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  function ComponentSection({
    level,
    data,
    SelectedEquipmentID,
    SelectedParentID,
    compHSelectedIndexes,
  }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      setProducts(
        compHierarchy[level][0].Chip != undefined
          ? compHierarchy[level][0].Chip
          : []
      );
    }, []);
    let ParentID;
    if (compHierarchy[level][0].Comp[0]) {
      ParentID =
        compHierarchy[level][0].Comp[0].parent_component !== null
          ? (ParentID = {
              ComponentID: compHierarchy[level][0].Comp[0].parent_component,
            })
          : (ParentID = { EquipmentID: SelectedEquipmentID });
    } else {
      if (compHSelectedIndexes.length === 1) {
        ParentID = {
          EquipmentID: SelectedEquipmentID,
        };
      } else {
        ParentID = {
          ComponentID: SelectedParentID,
        };
      }
    }

    return (
      <>
        <div className="h-[55vh] flex flex-col bg-gray-50 px-4 pt-2 pb-4 rounded-xl border-solid border-gray-100">
          <Space className="items-center mb-3  w-[20rem] bg-primary rounded-lg mt-2">
            {/* <p className="text-lg font-semibold">Components</p> */}
            <Tooltip title={"Add new equipment"}>
              <Button
                className="w-full"
                onClick={() => {
                  setOpenComponentForm({
                    status: true,
                    type: "Create",
                    parentId: ParentID,
                  });
                  console.log("<---- Parent ID ---->", ParentID);
                }}
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
                setOpenChipBoardForm({
                  status: true,
                  type: "Create",
                  parentId: ParentID,
                })
              }
              size="large"
              type="primary"
              icon={<PlusOutlined />}
            >
              Chip Boards
            </Button>
          </Space>
          <div className="flex flex-col gap-2 overflow-auto ">
            {compHierarchy[level][0].Comp.length !== 0 ? (
              <p className="text-sm">Components</p>
            ) : null}

            {compHierarchy[level].map((component, i) => {
              if (component.Comp.length !== 0) {
                return (
                  <ComponentCard
                    key={i}
                    data={component}
                    onComponentSelected={onComponentSelected}
                    selectedComponent={compHSelectedIndexes[level]}
                    level={level}
                    getEquipmentslist={getEquipmentslist}
                    setOpenComponentForm={setOpenComponentForm}
                  />
                );
              }
            })}
            {products.length !== 0 ? (
              <p className="text-sm">Chip Board</p>
            ) : null}

            {products.map((product, i) => (
              <ProductCard
                data={product}
                key={i}
                getEquipmentslist={getEquipmentslist}
                setOpenChipBoardForm={setOpenChipBoardForm}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default BOMSlide;
