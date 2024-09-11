// These will be available from the sidebar
import { IoTextSharp } from "react-icons/io5";
import { LuTextCursorInput } from "react-icons/lu";
import { RxButton } from "react-icons/rx";
import { RxSwitch } from "react-icons/rx";
import { TbSpace } from "react-icons/tb";
import { RxSlider } from "react-icons/rx";
import { MdTextFields } from "react-icons/md";
import { LuGauge } from "react-icons/lu";

export const fields = [
  {
    type: "input",
    title: "Text Input",
    icon: <LuTextCursorInput />,
    props: {
      text: "Input",
      color: "black",
      fontSize: 16,
      ShowIoTConfig: false,
    },
  },
  {
    type: "label",
    title: "Text",
    icon: <IoTextSharp />,
    props: {
      text: "Label",
      color: "black",
      fontSize: 16,
      ShowIoTConfig: false,
    },
  },
  {
    type: "button",
    title: "Button",
    icon: <RxButton />,
    props: {
      backgroundColor: "blue",
      text: "Button",
      color: "white",
      fontSize: 16,
      ShowIoTConfig: false,
    },
  },
  {
    type: "space",
    title: "Spacer",
    icon: <TbSpace />,
    props: {
      height: "10px",
      ShowIoTConfig: false,
    },
  },
  {
    type: "switch",
    title: "Switch",
    icon: <RxSwitch />,
    props: {
      text: "Switch",
      color: "white",
      fontSize: 20,
      ShowIoTConfig: true,
    },
  },
  {
    type: "slider",
    title: "Slider",
    icon: <RxSlider />,
    props: {
      text: "Slider",
      minimum: 0,
      maximum: 100,
      stepvalue: 1,
      ShowIoTConfig: true,
    },
  },
  {
    type: "value",
    title: "Value",
    icon: <MdTextFields />,
    props: {
      text: "Value",
      color: "black",
      fontSize: 16,
      ShowIoTConfig: true,
    },
  },
  {
    type: "gauge",
    title: "Circle Gauge",
    icon: <LuGauge />,
    props: {
      text: "Label",
      minimum: 0,
      maximum: 100,
      PercentageState: true,
      ShowIoTConfig: true,
    },
  },
];

// These define how we render the field
// export const renderers = {
//   input: () => <input type="text" placeholder="This is a text input" />,
//   textarea: () => <textarea rows="5" />,
//   select: () => (
//     <select>
//       <option value="1">1</option>
//       <option value="2">2</option>
//       <option value="3">3</option>
//     </select>
//   ),
//   text: () => (
//     <p>
//       Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//       Lorem Ipsum has been the industry's standard dummy text ever since the
//       1500s, when an unknown printer took a galley of type and scrambled it to
//       make a type specimen book. It has survived not only five centuries, but
//       also the leap into electronic typesetting, remaining essentially
//       unchanged. It was popularised in the 1960s with the release of Letraset
//       sheets containing Lorem Ipsum passages, and more recently with desktop
//       publishing software like Aldus PageMaker including versions of Lorem
//       Ipsum.
//     </p>
//   ),
//   button: () => <button>Button</button>,
// };
