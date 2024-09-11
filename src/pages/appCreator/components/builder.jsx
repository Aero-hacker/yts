import { useEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";
import appImages from "../../../data/images";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./styles.css";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuLayout } from "react-icons/lu";
import { BiExtension } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";
import { API_FILE2 } from "../../../DataConfig";
import Announcements from "./announcements";
import Canvas, { Field } from "./canvas";
import Sidebar, { SidebarField } from "./sidebar";
import {
  Button,
  Checkbox,
  ColorPicker,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Space,
  message,
  Avatar,
  Switch,
  Skeleton,
  Card,
  ConfigProvider,
  Tooltip,
  Modal,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { CopyOutlined } from "@ant-design/icons";
import apiServices from "../../../services/exportService";
import moment from "moment";
import CustomEditor from "../../customEditor";
const { Meta } = Card;

function getData(prop) {
  return prop?.data?.current ?? {};
}

function createSpacer({ id }) {
  return {
    id,
    type: "spacer",
    title: "spacer",
  };
}

const AppBuilder = ({
  AppJSONData,
  setAppJSONData,
  SelectedEquipmentID,
  setSelectedEquipmentID,
  FetchedJSONData,
  setFetchedJSONData,
}) => {
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
    Date.now()
  );
  const spacerInsertedRef = useRef();
  const currentDragFieldRef = useRef();
  const [activeSidebarField, setActiveSidebarField] = useState(); // only for fields from the sidebar
  const [activeField, setActiveField] = useState(); // only for fields that are in the form.
  const [data, updateData] = useImmer({
    fields: [],
  });
  const [selectedField, setSelectedField] = useState(null);
  const [modules, setModules] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [PinDisplayStates, setPinDisplayStates] = useState([]);
  const [TPinDisplayStates, setTPinDisplayStates] = useState([]);
  const [selectedPins, setSelectedPins] = useState("");
  const [toggleIOTConfig, setToggleIOTConfig] = useState(false);
  const [togglePercentageState, setTogglePercentageState] = useState(true);
  const [ModuleDataLoading, setModuleDataLoading] = useState(false);
  // Custom Code
  const [CustomCodeBlock, setCustomCodeBlock] = useState(false);
  const [CustomCodeBlockOpen, setCustomCodeBlockOpen] = useState(false);
  const [CustomCode1, setCustomCode1] = useState("");
  const [CustomCode2, setCustomCode2] = useState("");
  const [CustomCode3, setCustomCode3] = useState("");
  const [CustomCode4, setCustomCode4] = useState("");

  function CloseCustomCodeBlockOpen() {
    setCustomCodeBlockOpen(false);
  }

  function handlePinSelection(e, PinStates) {
    if (CustomCodeBlock) {
    } else {
      console.log("Selected Data", e.target);
      let TempData = [];
      PinStates.map((data) => {
        if (`${data.PinNumber}` === `${e.target.value}`) {
          // To change the State of the UI
          TempData.push({
            ...data,
            selectState: e.target.checked,
          });

          // To Update Selected Field State
          if (e.target.checked) {
            setSelectedPins({
              ...data,
              selectState: e.target.checked,
            });
          } else {
            setSelectedPins("");
          }
        } else {
          TempData.push({
            ...data,
            selectState: false,
          });
        }
      });
      setPinDisplayStates(TempData);
      setTPinDisplayStates(TempData);
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const [form] = useForm();

  const cleanUp = () => {
    setActiveSidebarField(null);
    setActiveField(null);
    currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  };
  useEffect(() => {
    console.log(data);
    setAppJSONData(data);
  }, [data]);

  useEffect(() => {
    // Updating on Equipment Change
    console.log("From Builder", FetchedJSONData);
    if (FetchedJSONData?.json) {
      updateData((draft) => {
        draft.fields = FetchedJSONData.json.fields.filter((f) => f.type !== "");
      });
    } else {
      updateData((draft) => {
        draft.fields = [];
      });
    }
  }, [FetchedJSONData]);

  const handleDragStart = (e) => {
    if (!SelectedEquipmentID) {
      message.info("Please Select Equipment");
      return;
    }

    const { active } = e;
    const activeData = getData(active);

    // This is where the cloning starts.
    // We set up a ref to the field we're dragging
    // from the sidebar so that we can finish the clone
    // in the onDragEnd handler.
    if (activeData.fromSidebar) {
      const { field } = activeData;
      const { type, props } = field;
      setActiveSidebarField(field);
      // Create a new field that'll be added to the fields array
      // if we drag it over the canvas.
      currentDragFieldRef.current = {
        id: active.id,
        type,
        name: `${type}${fields.length + 1}`,
        props: props,
      };
      return;
    }

    // We aren't creating a new element so go ahead and just insert the spacer
    // since this field already belongs to the canvas.
    const { field, index } = activeData;

    setActiveField(field);
    currentDragFieldRef.current = field;
    updateData((draft) => {
      draft.fields.splice(index, 1, createSpacer({ id: active.id }));
    });
  };

  const handleDragOver = (e) => {
    const { active, over } = e;
    const activeData = getData(active);

    // Once we detect that a sidebar field is being moved over the canvas
    // we create the spacer using the sidebar fields id with a spacer suffix and add into the
    // fields array so that it'll be rendered on the canvas.

    // This is where the clone occurs. We're taking the id that was assigned to
    // sidebar field and reusing it for the spacer that we insert to the canvas.
    if (activeData.fromSidebar) {
      const overData = getData(over);

      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({
          id: active.id + "-spacer",
        });

        updateData((draft) => {
          if (!draft.fields.length) {
            draft.fields.push(spacer);
          } else {
            const nextIndex =
              overData.index > -1 ? overData.index : draft.fields.length;

            draft.fields.splice(nextIndex, 0, spacer);
          }
          spacerInsertedRef.current = true;
        });
      } else if (!over) {
        // This solves the issue where you could have a spacer handing out in the canvas if you drug
        // a sidebar item on and then off
        updateData((draft) => {
          draft.fields = draft.fields.filter((f) => f.type !== "spacer");
        });
        spacerInsertedRef.current = false;
      } else {
        // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
        // we need to make sure we're updating the spacer position to reflect where our drop will occur.
        // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
        updateData((draft) => {
          const spacerIndex = draft.fields.findIndex(
            (f) => f.id === active.id + "-spacer"
          );

          const nextIndex =
            overData.index > -1 ? overData.index : draft.fields.length - 1;

          if (nextIndex === spacerIndex) {
            return;
          }

          draft.fields = arrayMove(draft.fields, spacerIndex, overData.index);
        });
      }
    }
  };

  const handleDragEnd = (e) => {
    const { over } = e;

    // We dropped outside of the over so clean up so we can start fresh.
    if (!over) {
      cleanUp();
      updateData((draft) => {
        draft.fields = draft.fields.filter((f) => f.type !== "spacer");
      });
      return;
    }

    // This is where we commit the clone.
    // We take the field from the this ref and replace the spacer we inserted.
    // Since the ref just holds a reference to a field that the context is aware of
    // we just swap out the spacer with the referenced field.
    let nextField = currentDragFieldRef.current;

    if (nextField) {
      const overData = getData(over);

      updateData((draft) => {
        const spacerIndex = draft.fields.findIndex((f) => f.type === "spacer");
        draft.fields.splice(spacerIndex, 1, nextField);

        draft.fields = arrayMove(
          draft.fields,
          spacerIndex,
          overData.index || 0
        );
      });
    }

    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
  };

  const { fields } = data;
  const [ChipBaordData, setChipBaordData] = useState([]);
  const [TSelectedEquipmentID, setTSelectedEquipmentID] = useState("");
  //fetching chipboard lists
  useEffect(() => {
    if (SelectedEquipmentID !== TSelectedEquipmentID) {
      setTSelectedEquipmentID(SelectedEquipmentID);
      console.log("Fetch Started");
      setModuleDataLoading(true);
      apiServices
        .get(
          `IOTconfiguration/Get-ChipBoardDetailsByEquipment/${SelectedEquipmentID}/`
        )
        .then((res) => {
          console.log(res);
          setChipBaordData(res);
          setHardwareData(res);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setModuleDataLoading(false);
        });
    } else {
      console.log("Fetch Not Started");
      setHardwareData(ChipBaordData);
    }
  }, [selectedField]);

  function setHardwareData(res) {
    let chipbaords = [];
    res.data.map((item) => {
      chipbaords.push({
        value: item.hardware[0].hardware_id,
        label: `${item.ModelNumber} (${item.Description})`,
        module: item.hardware[0],
      });
    });
    setModules(chipbaords);
    let hardware = "";
    let TempData;
    chipbaords.map((item) => {
      if (item.value === selectedField?.props?.IOTConfig?.selectedModule) {
        hardware = item;
      }
    });
    if (hardware !== "") {
      let PinStates = [];
      Object.keys(hardware?.module?.hardware_configuration).map((item, i) => {
        PinStates.push({
          ...hardware?.module?.hardware_configuration[item],
          selectState: false,
        });
      });
      console.log("HardwareData", hardware);
      console.log("PinsData", PinStates);
      if (!selectedField?.props?.CustomConfig) {
        setPinDisplayStates(PinStates);
        TempData = {
          target: {
            value: selectedField?.props?.IOTConfig?.selectedPins?.pinNumber,
            checked:
              selectedField?.props?.IOTConfig?.selectedPins?.pinData
                ?.selectState,
          },
        };
        handlePinSelection(TempData, PinStates);
      } else {
        setPinDisplayStates([]);
      }
      setSelectedModule(hardware);
    }
  }
  // const handleHeightChange = (height) => {
  //   updateFieldProperty(selectedField, "height", height);
  // };

  const handleFieldChange = (value, type) => {
    // finding selecte field index
    // let fieldIndex = data.fields.findIndex(
    //   (obj) => obj.id === selectedField.id
    // );
    // //updating field properties
    // updateData((draft) => {
    //   draft.fields[fieldIndex].props[type] = value;
    // });
    // setCustomisations((draft) => {
    //   draft[type] = value;
    // });
    // setSelectedField(data.fields[fieldIndex]);
  };

  const FieldToType = (data) => {
    switch (data) {
      case "button":
        return "toggle";
        break;
      case "switch":
        return "boolean";
        break;
      case "slider":
        return "variable";
      case "value":
        return "reading";
      case "gauge":
        return "percentage";
        break;
    }
  };

  const SaveCustomisation = (values) => {
    console.log("--", values);
    if (
      selectedModule?.module === undefined &&
      selectedField?.props?.ShowIoTConfig &&
      toggleIOTConfig
    ) {
      message.info("Please Select Module");
      return;
    }
    if (toggleIOTConfig && selectedPins === "" && !CustomCodeBlock) {
      message.info("Please Select Pin");
      return;
    }

    let TempEpochTime = parseInt(Date.now() / 1000);
    if (toggleIOTConfig) {
      values["IOTConfig"] = {
        selectedModule: selectedModule?.module.hardware_id,
        selectedPins: {
          pinNumber: selectedPins?.PinNumber,
          pinData: CustomCodeBlock
            ? {
                PinName: `GPIO${TempEpochTime}`,
              }
            : selectedPins,
          pinName: selectedField?.type + "_" + moment().valueOf(),
          Type: FieldToType(selectedField?.type),
        },
      };
    }
    if (CustomCodeBlock) {
      values["CustomConfig"] = {
        selectedModule: selectedModule?.module.hardware_id,
        selectedPins: {
          pinData: {
            PinName: `GPIO${TempEpochTime}`,
          },
        },
        CustomCode: {
          CustomCode1,
          CustomCode2,
          CustomCode3,
          CustomCode4,
        },
      };
    }
    if (selectedField?.type === "gauge") {
      values["PercentageState"] = togglePercentageState;
    }
    values["ShowIoTConfig"] = selectedField?.props?.ShowIoTConfig;
    //  finding selecte field index
    let fieldIndex = data.fields.findIndex(
      (obj) => obj.id === selectedField.id
    );
    //updating field properties
    updateData((draft) => {
      draft.fields[fieldIndex].props = values;
    });
    setSelectedField(null);
  };

  useEffect(() => {
    if (selectedField) {
      let fieldIndex = data.fields.findIndex(
        (obj) => obj.id === selectedField.id
      );
      setSelectedField(data.fields[fieldIndex]);
    }
    console.log("data", data);
  }, [data]);

  const CustomisationBar = ({}) => {
    useEffect(() => {
      form.setFieldsValue(selectedField?.props);
    }, []);

    const filterOption = (input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const onSearch = () => {};

    const onChange = (e) => {
      console.log(e);
      let TempData = {
        ...selectedField,
        props: {
          ...selectedField.props,
          IOTConfig: {
            selectedModule: e,
          },
        },
      };
      console.log(selectedField);
      console.log(TempData);
      setSelectedField(TempData);
    };

    const onIOTConfigChange = (e) => {
      setToggleIOTConfig(e);
    };

    return (
      <>
        <Form
          layout="vertical"
          form={form}
          className="w-[46vw] "
          onFinish={SaveCustomisation}
        >
          <div className="w-full flex-col">
            <Space className="w-full justify-between py-2 ">
              <p className="text-lg">{selectedField?.name} Properties</p>
              <Button
                className="mr-4"
                htmlType="submit"
                size="medium"
                type="primary"
              >
                Save
              </Button>
            </Space>

            <div className="h-full flex flex-row gap-5 pr-4">
              <div className="w-[48%] bg-gray-100 px-4 py-4 rounded-[14px]">
                {selectedField?.props?.height ? (
                  <label className="block mb-2">
                    Height:
                    <Form.Item name={"height"}>
                      <Input
                        value={selectedField.props.height}
                        type="number"
                        className=" p-1 w-full border-none rounded-[10px]"
                        onChange={(e) =>
                          handleFieldChange(e.target.value, "height")
                        }
                      />
                    </Form.Item>
                  </label>
                ) : null}

                {selectedField?.props?.fontSize ? (
                  <label className="block mb-2">
                    Font Size:
                    <Form.Item name={"fontSize"}>
                      <InputNumber
                        value={selectedField.props.fontSize}
                        type="number"
                        className="border p-1 w-full"
                        onChange={(e) =>
                          handleFieldChange(e.target.value, "fontSize")
                        }
                      />
                    </Form.Item>
                  </label>
                ) : null}

                {selectedField?.props?.text ? (
                  <label className="block mb-2">
                    Text:
                    <Form.Item name={"text"}>
                      <Input
                        value={selectedField.props.text}
                        type="text"
                        className="border p-1 w-full"
                        onChange={(e) =>
                          handleFieldChange(e.target.value, "text")
                        }
                      />
                    </Form.Item>
                  </label>
                ) : null}

                {selectedField?.props?.color ? (
                  <label className="block mb-2">
                    Color:
                    <Form.Item
                      name={"color"}
                      initialValue={"black"}
                      getValueFromEvent={(color) => {
                        return "#" + color.toHex();
                      }}
                    >
                      <ColorPicker defaultFormat="hex" size="large" showText />
                    </Form.Item>
                  </label>
                ) : null}

                {selectedField?.props?.minimum === 0 ? (
                  <label className="block mb-2">
                    Minimum Value:
                    <Form.Item name={"minimum"}>
                      <InputNumber
                        value={selectedField.props.minimum}
                        type="number"
                        className="border p-1 w-full"
                        onChange={(e) =>
                          handleFieldChange(e.target.value, "Minimum")
                        }
                      />
                    </Form.Item>
                  </label>
                ) : null}

                {selectedField?.props?.maximum ? (
                  <label className="block mb-2">
                    Maximum Value:
                    <Form.Item name={"maximum"}>
                      <InputNumber
                        value={selectedField.props.maximum}
                        type="number"
                        className="border p-1 w-full"
                        onChange={(e) =>
                          handleFieldChange(e.target.value, "Maximum")
                        }
                      />
                    </Form.Item>
                  </label>
                ) : null}

                {selectedField?.props?.stepvalue ? (
                  <label className="block mb-2">
                    Step Value:
                    <Form.Item name={"stepvalue"}>
                      <InputNumber
                        value={selectedField.props.stepvalue}
                        type="number"
                        className="border p-1 w-full"
                        onChange={(e) =>
                          handleFieldChange(e.target.value, "stepValue")
                        }
                      />
                    </Form.Item>
                  </label>
                ) : null}

                {selectedField?.props?.PercentageState != null || undefined ? (
                  <label className="block mb-2">
                    <Space className="justify-between w-full py-3">
                      <p>Percentage</p>
                      <Switch
                        value={togglePercentageState}
                        onChange={(e) => {
                          setTogglePercentageState(e);
                        }}
                      />
                    </Space>
                  </label>
                ) : null}

                {selectedField?.props?.ShowIoTConfig && (
                  <Space className="justify-between w-full py-3">
                    <p>Has IOT Configuration</p>
                    <Switch
                      value={toggleIOTConfig}
                      onChange={onIOTConfigChange}
                    />
                  </Space>
                )}

                {toggleIOTConfig && (
                  <Space className="justify-between w-full py-3">
                    <p>Custom Configuration</p>
                    <Switch
                      value={CustomCodeBlock}
                      onChange={(e) => {
                        setCustomCodeBlock(e);
                        if (e) {
                          setPinDisplayStates([]);
                        } else {
                          setPinDisplayStates(TPinDisplayStates);
                        }
                      }}
                    />
                  </Space>
                )}

                {CustomCodeBlock && (
                  <Button
                    className="mr-4"
                    htmlType="submit"
                    size="medium"
                    type="primary"
                    onClick={() => {
                      setCustomCodeBlockOpen(true);
                    }}
                  >
                    View / Edit
                  </Button>
                )}
              </div>
              <Space
                style={{
                  display: toggleIOTConfig ? "block" : "none",
                }}
                className="w-[48%]  bg-gray-100 px-4 py-4 rounded-[14px]"
              >
                {ModuleDataLoading ? (
                  <div>
                    <Skeleton.Input
                      style={{ marginTop: "1rem", width: "280px" }}
                      active
                      size="large"
                      block={true}
                    />
                    <Skeleton.Image
                      style={{ marginTop: "1rem", width: "280px" }}
                      active
                      size="large"
                      block={true}
                    />
                    <Skeleton.Image
                      style={{ marginTop: "1rem", width: "280px" }}
                      active
                      size="large"
                      block={true}
                    />
                    <Skeleton.Input
                      style={{
                        marginTop: "1rem",
                        width: "280px",
                        height: "300px",
                      }}
                      active
                      size="large"
                      block={true}
                    />
                  </div>
                ) : (
                  <div>
                    <Form.Item label="Module">
                      <Select
                        value={selectedModule}
                        showSearch
                        optionFilterProp="children"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={modules}
                        placeholder="Select Module"
                        onChange={onChange}
                      />
                    </Form.Item>

                    <Divider orientation="center" plain>
                      Pin Diagram
                    </Divider>
                    <Image
                      className="rounded-[12px]"
                      src={
                        selectedModule?.module?.pin_diagram !== null ||
                        undefined
                          ? `${API_FILE2}${selectedModule?.module?.pin_diagram}`
                          : "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                      }
                    />
                    <Divider orientation="center" plain>
                      Data Sheet
                    </Divider>
                    <div
                      style={{
                        width: "100%",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        window.open(
                          `${API_FILE2}${selectedModule?.module?.data_sheet}`,
                          "_blank"
                        );
                      }}
                    >
                      <img
                        src={appImages.pageWise.appEditor.DataSheet}
                        alt=""
                        width={80}
                      />
                      Click to View Data Sheet
                    </div>
                    <Divider orientation="center" plain>
                      Module Pins
                    </Divider>
                    <Card className="h-[220px] overflow-auto">
                      <Space direction="vertical">
                        {PinDisplayStates.map((item, i) => (
                          <Checkbox
                            key={item.PinNumber}
                            value={item.PinNumber}
                            onChange={(e) => {
                              handlePinSelection(e, TPinDisplayStates);
                            }}
                            checked={item.selectState}
                          >
                            <Space
                              style={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                display: "flex",
                              }}
                            >
                              <div>{`${item.PinNumber} - ${item.PinName}`}</div>{" "}
                              <div>
                                <Tooltip
                                  placement="topRight"
                                  title={
                                    <div>
                                      {`${item.PinAlias} ${
                                        item.PinRemarks !== ""
                                          ? ` - Remarks ${item.PinRemarks}`
                                          : ""
                                      }`}
                                    </div>
                                  }
                                >
                                  <FaInfoCircle />
                                </Tooltip>
                              </div>
                            </Space>
                          </Checkbox>
                        ))}
                      </Space>
                    </Card>
                    {/* <Divider orientation="center" plain>
                Selected Pin
              </Divider> */}
                    {/* <Card
                title="2 (GPIO2)"
                extra={
                  <Button size="medium" type="primary">
                    Generate Topic
                  </Button>
                }
              >
                <Space direction="vertical" className="py-2">
                  <Form.Item label="Sub Topic">
                    <Space>
                      <Input placeholder="Sub Topic" disabled />
                      <Button>
                        <CopyOutlined /> Copy
                      </Button>
                    </Space>
                  </Form.Item>
                  <Form.Item label="Pub Topic">
                    <Space>
                      <Input placeholder="Pub Topic" disabled />
                      <Button>
                        <CopyOutlined /> Copy
                      </Button>
                    </Space>
                  </Form.Item>
                </Space>
                <Space direction="horizontal" className="py-2">
                  <Form.Item label="ON Message">
                    <Input value={"bulbOn"} />
                  </Form.Item>
                  <Form.Item label="OFF Message">
                    <Input value={"bulbOff"} />
                  </Form.Item>
                </Space>
              </Card> */}
                  </div>
                )}
              </Space>
            </div>
          </div>
          {/* </Card> */}
        </Form>
      </>
    );
  };

  const IOTConfigBar = ({}) => {
    return (
      <Card
        className="w-[400px] bg-gray-50 overflow-scroll"
        title="IOT Configuration"
        extra={
          <Button size="medium" type="primary">
            Save
          </Button>
        }
      >
        <Form layout="vertical"></Form>
      </Card>
    );
  };

  return (
    <>
      <div className=" flex overflow-hidden">
        <div className="w-[70px] border bg-white flex flex-col items-center justify-start">
          <div className="flex flex-col items-center text-[12px] gap-2 bg-primary_light py-3 w-full rounded-[6px] text-primary">
            <LuLayoutDashboard size={24} className="" />
            Elements
          </div>
          <div className="flex flex-col items-center text-[12px] gap-2 py-3 w-full rounded-[6px] text-primary_dark">
            <LuLayout size={24} className="" />
            Layouts
          </div>
          <div className="flex flex-col items-center text-[12px] gap-2 py-3 w-full rounded-[6px] text-primary_dark">
            <BiExtension size={24} className="" />
            Extension
          </div>
        </div>
        <div className="flex">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            autoScroll
          >
            <Announcements />
            <Sidebar fieldsRegKey={sidebarFieldsRegenKey} />
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={fields.map((f) => f.id)}
            >
              <Canvas
                fields={fields}
                setSelectedField={setSelectedField}
                selectedField={selectedField}
                setToggleIOTConfig={setToggleIOTConfig}
                setTogglePercentageState={setTogglePercentageState}
                handlePinSelection={handlePinSelection}
                setCustomCodeBlock={setCustomCodeBlock}
                setSelectedModule={setSelectedModule}
                setCustomCode1={setCustomCode1}
                setCustomCode2={setCustomCode2}
                setCustomCode3={setCustomCode3}
                setCustomCode4={setCustomCode4}
                setPinDisplayStates={setPinDisplayStates}
              />
            </SortableContext>
            <DragOverlay dropAnimation={false}>
              {activeSidebarField ? (
                <SidebarField overlay field={activeSidebarField} />
              ) : null}
              {activeField ? <Field overlay field={activeField} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
        {selectedField ? (
          <div className="flex gap-4">
            <CustomisationBar />
            {/* <IOTConfigBar /> */}
          </div>
        ) : null}
      </div>
      <Modal
        title="Comprehensive Code Management"
        open={CustomCodeBlockOpen}
        // onOk={handleOk}
        width={"90%"}
        onCancel={CloseCustomCodeBlockOpen}
        footer={[<Button onClick={CloseCustomCodeBlockOpen}>Close</Button>]}
      >
        <Card key="Headers" style={{ marginBottom: "1rem" }}>
          <Meta
            title="Add Headers"
            description="Include Header Files and Use #define Declarations Here"
          />
          <CustomEditor
            CustomCode={CustomCode1}
            setCustomCode={setCustomCode1}
          />
        </Card>
        <Card key="Global" style={{ marginBottom: "1rem" }}>
          <Meta
            title="Global Variable Declarations"
            description="Add Declarations and Initialize Libraries Globally"
          />
          <CustomEditor
            CustomCode={CustomCode2}
            setCustomCode={setCustomCode2}
          />
        </Card>
        <Card key="Setup" style={{ marginBottom: "1rem" }}>
          <Meta
            title="Configure Your Setup Code"
            description="Define Pin Modes and Begin Initial Configurations"
          />
          <CustomEditor
            CustomCode={CustomCode3}
            setCustomCode={setCustomCode3}
          />
        </Card>
        <Card key="Loop" style={{ marginBottom: "1rem" }}>
          <Meta
            title="Configure Your Loop Code"
            description="Implement Dynamic Calculations and Repeated Tasks"
          />
          <CustomEditor
            CustomCode={CustomCode4}
            setCustomCode={setCustomCode4}
          />
        </Card>
      </Modal>
    </>
  );
};

export default AppBuilder;
