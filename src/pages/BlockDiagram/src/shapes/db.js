import {
  ceil,
  child,
  positionSet,
  svgTxtFarthestPoint,
} from "../infrastructure/util.js";
import { shapeCreate } from "./shape-evt-proc.js";

/**
 * @param {CanvasElement} canvas
 * @param {DatabaseData} databaseData
 */
export function database(canvas, databaseData) {
  const templ = `
		<ellipse data-key="top" cx="0" cy="0" rx="48" ry="24" fill="#ff6600" stroke="#fff" stroke-width="1" />
		<rect data-key="middle" x="-48" y="0" width="96" height="72" fill="#ff6600" stroke="#fff" stroke-width="1" />
		<ellipse data-key="bottom" cx="0" cy="72" rx="48" ry="24" fill="#ff6600" stroke="#fff" stroke-width="1" />
		<text data-key="text" x="0" y="36" text-anchor="middle" style="pointer-events: none;" fill="#fff">&nbsp;</text>`;

  const shape = shapeCreate(
    canvas,
    databaseData,
    templ,
    {
      right: { dir: "right", position: { x: 48, y: 36 } },
      left: { dir: "left", position: { x: -48, y: 36 } },
      bottom: { dir: "bottom", position: { x: 0, y: 72 } },
      top: { dir: "top", position: { x: 0, y: -24 } },
    },
    // onTextChange
    (txtEl) => {
      const newHeight = textElHeight(txtEl, 72, 24);
      if (newHeight !== databaseData.h) {
        databaseData.h = newHeight;
        resize();
      }
    }
  );

  function resize() {
    shape.cons.right.position.x = 48;
    shape.cons.left.position.x = -48;
    shape.cons.bottom.position.y = databaseData.h;
    shape.cons.top.position.y = -24;

    for (const connectorKey in shape.cons) {
      positionSet(
        child(shape.el, connectorKey),
        shape.cons[connectorKey].position
      );
    }

    child(shape.el, "middle").setAttribute("height", databaseData.h);
    child(shape.el, "bottom").setAttribute("cy", databaseData.h);

    shape.draw();
  }

  if (!!databaseData.h && databaseData.h !== 72) {
    resize();
  } else {
    shape.draw();
  }

  return shape.el;
}

/** @param {SVGTextElement} textEl */
function textElHeight(textEl, minH, step) {
  const farthestPoint = svgTxtFarthestPoint(textEl);
  return ceil(minH, step, farthestPoint.y * 2);
}

/** @typedef { {x:number, y:number} } Point */
/** @typedef { import('../infrastructure/canvas-smbl.js').CanvasElement } CanvasElement */
/** @typedef { {type:number, position: Point, title?: string, styles?: string[], h?:number} } DatabaseData */
