import { useEffect, useRef } from "react";
import { moveEvtMobileFix } from "./src/infrastructure/move-evt-mobile-fix.js";
import { CanvasSmbl } from "./src/infrastructure/canvas-smbl.js";
import { moveScaleApplay } from "./src/infrastructure/move-scale-applay.js";
import { evtRouteApplay } from "./src/infrastructure/evt-route-applay.js";
import {
  copyPastApplay,
  groupSelectApplay,
} from "./src/diagram/group-select-applay.js";
import { shapeTypeMap } from "./src/shapes/shape-type-map.js";
import "../BlockDiagram/src/ui/menu.js";
import "../BlockDiagram/src/ui/shape-menu.js";

const DiagramComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas[CanvasSmbl] = {
      data: {
        position: { x: 0, y: 0 },
        scale: 1,
        cell: 24,
      },
      shapeMap: shapeTypeMap(canvas),
    };

    moveEvtMobileFix(canvas.ownerSVGElement);
    evtRouteApplay(canvas.ownerSVGElement);
    copyPastApplay(canvas);
    groupSelectApplay(canvas);
    moveScaleApplay(canvas);
    /** @type { import('./ui/menu').Menu } */ (
      document.getElementById("menu")
    ).init(canvas);
    /** @type { import('./ui/shape-menu').ShapeMenu } */ (
      document.getElementById("menu-shape")
    ).init(canvas);
  }, []);

  return (
    <div>
      <ap-menu id="menu"></ap-menu>

      <ap-menu-shape id="menu-shape"></ap-menu-shape>
      <div
        id="tip"
        style={{
          position: "fixed",
          left: "50%",
          top: "30%",
          transform: "translate(-50%, -30%)",
          minWidth: "290px",
        }}
      ></div>

      <svg
        id="diagram"
        tabIndex="0"
        style={{
          touchAction: "none",
          backgroundColor: "#fff",
          display: "block",
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          pointerEvents: "none",
        }}
      >
        <g ref={canvasRef} id="canvas"></g>
      </svg>
    </div>
  );
};

export default DiagramComponent;
