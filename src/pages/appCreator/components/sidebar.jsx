import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { fields } from "./fields";
import { Tooltip } from "antd";

export function SidebarField(props) {
  const { field, overlay } = props;
  const { title, icon } = field;

  let className = "sidebar-field";
  if (overlay) {
    className += " overlay";
  }

  return (
    <div className={className}>
      <div className="flex flex-row items-center gap-3 text-[20px]">
        {icon ? icon : null} <div className="text-[16px]">{title}</div>
      </div>
      <Tooltip title={title}>
        <InfoCircleOutlined className="text-gray-500" />
      </Tooltip>
    </div>
  );
}

function DraggableSidebarField(props) {
  const { field, ...rest } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="sidebar-field"
      {...listeners}
      {...attributes}
    >
      <SidebarField field={field} {...rest} />
    </div>
  );
}

export default function Sidebar(props) {
  const { fieldsRegKey } = props;

  return (
    <div key={fieldsRegKey} className="sidebar">
      {fields.map((f) => (
        <DraggableSidebarField key={f.type} field={f} />
      ))}
    </div>
  );
}
