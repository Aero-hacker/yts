import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

// import { renderers } from "./fields";
import FieldItem from "./variousFields";

// function getRenderer(type) {
//   if (type === "spacer") {
//     return () => {
//       return <div className="spacer">spacer</div>;
//     };
//   }

//   return renderers[type] || (() => <div>No renderer found for {type}</div>);
// }

export function Field(props) {
  const { field, overlay, onClick, ...rest } = props;
  const { type } = field;

  // const Component = getRenderer(type);

  let className = "canvas-field";
  if (overlay) {
    className += " overlay";
  }

  // let fieldComponent;
  // switch (type) {
  //   case "input":
  //     fieldComponent = (
  //       <input
  //         type="text"
  //         placeholder="Enter text"
  //         className="w-full"
  //         value={field.text}
  //         onChange={(e) => {}} // Use onTextChange
  //       />
  //     );
  //     break;
  //   case "label":
  //     fieldComponent = <p>{field.text ? field.text : "Hello World"}</p>;
  //     break;
  //   case "button":
  //     fieldComponent = (
  //       <div className="bg-red-200 text-back px-4 pr-3">
  //         {field.text ? field.text : "Button"}
  //       </div>
  //     );
  //     break;
  //   default:
  //     fieldComponent = null;
  // }

  return (
    <div className={className}>
      {/* <Component {...rest} /> */}
      {FieldItem({ type, field })}
      {/* <p>Label</p> */}
    </div>
  );
}

function SortableField(props) {
  const {
    id,
    index,
    field,
    selectedField,
    setSelectedField,
    setToggleIOTConfig,
    setTogglePercentageState,
    handlePinSelection,
    setCustomCodeBlock,
    setCustomCode1,
    setCustomCode2,
    setCustomCode3,
    setCustomCode4,
    setSelectedModule,
    setPinDisplayStates,
  } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        index,
        id,
        field,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      onClick={() => {
        if (selectedField !== field) {
          setSelectedModule("");
          setPinDisplayStates([]);
          setSelectedField(field);
          let TempData;
          console.log("CClicked", field);
          TempData = field?.props?.IOTConfig ? true : false;
          setToggleIOTConfig(TempData);

          TempData = field?.props?.CustomConfig ? true : false;
          setCustomCodeBlock(TempData);

          if (field?.props?.CustomConfig) {
            setCustomCode1(field?.props?.CustomConfig?.CustomCode?.CustomCode1);
            setCustomCode2(field?.props?.CustomConfig?.CustomCode?.CustomCode2);
            setCustomCode3(field?.props?.CustomConfig?.CustomCode?.CustomCode3);
            setCustomCode4(field?.props?.CustomConfig?.CustomCode?.CustomCode4);
          } else {
            setCustomCode1("");
            setCustomCode2("");
            setCustomCode3("");
            setCustomCode4("");
          }

          TempData =
            field?.props?.PercentageState != null
              ? field?.props?.PercentageState
              : true;
          setTogglePercentageState(TempData);
          // TempData = {
          //   target: {
          //     value: field?.props?.IOTConfig?.selectedPins?.pinNumber,
          //     checked:
          //       field?.props?.IOTConfig?.selectedPins?.pinData?.selectState,
          //   },
          // };
          // handlePinSelection(TempData);
        }
      }}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Field field={field} />
      {/* <FormField
        index={index}
        field={field}
        // moveField={moveField}
        id={field.id}
        onTextChange={() => {}}
      /> */}
    </div>
  );
}

export default function Canvas(props) {
  const {
    fields,
    setSelectedField,
    selectedField,
    setToggleIOTConfig,
    setTogglePercentageState,
    handlePinSelection,
    setCustomCodeBlock,
    setSelectedModule,
    setCustomCode1,
    setCustomCode2,
    setCustomCode3,
    setCustomCode4,
    setPinDisplayStates,
  } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useDroppable({
      id: "canvas_droppable",
      data: {
        parent: null,
        isContainer: true,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="canvas"
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="canvas-fields">
        {fields?.map((f, i) => (
          <SortableField
            key={f.id}
            id={f.id}
            field={f}
            index={i}
            selectedField={selectedField}
            setSelectedField={setSelectedField}
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
        ))}
      </div>
    </div>
  );
}
