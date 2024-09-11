import apiServices from "../../../../services/exportService.jsx";
import { readSelectedProjectId } from "../../../../services/localServices.jsx";
import { apiEndpoints } from "../../../../utils/apiEndPoints.jsx";
import { dgrmPngCreate } from "../diagram/dgrm-png.js";
import { deserialize, serialize } from "../diagram/dgrm-serialization.js";
import { tipShow, uiDisable } from "./ui.js";

export class Menu extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = `
			<style>
			.menu {
				position: fixed;
				top: 15px;
				left: 15px;
				cursor: pointer;
			}
			#options {
				position: fixed;
				padding: 15px;
				top: 0px;
				left: 0px;
				z-index: 1;
			}
      .ant-btn-primary {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 2px;
  height: 32px;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn-primary:hover,
.ant-btn-primary:focus {
  color: #fff;
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.ant-btn-primary:active {
  color: #fff;
  background-color: #096dd9;
  border-color: #096dd9;
}

.ant-btn-default {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  background-image: none;
  border: 1px solid #d9d9d9;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 2px;
  height: 32px;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
}

.ant-btn-default:hover,
.ant-btn-default:focus {
  color: #40a9ff;
  border-color: #40a9ff;
  background-color: #fff;
}

.ant-btn-default:active {
  color: #096dd9;
  border-color: #096dd9;
  background-color: #fff;
}

			#options div, #options a { 
				color: rgb(13, 110, 253); 
				cursor: pointer; margin: 10px 0;
				display: flex;
				align-items: center;
				line-height: 25px;
				text-decoration: none;
			}
			#options div svg, #options a svg { margin-right: 10px; }
			</style>
		<!--<svg id="menu" class="menu" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgb(52,71,103)"/></svg> -->
			<div id="options" class="shadow" >
			 	<!--<div id="menu2" style="margin: 0 0 15px;"><svg viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" fill="rgb(52,71,103)"/></svg></div>-->
        <button id="save" class="ant-btn-primary">Save</button> 
        <button id="save" class="ant-btn-default" onclick="history.back()">Back</button>
		 	</div>
      `;

    /** @param {string} id, @param {()=>void} handler */
    function click(id, handler) {
      shadow.getElementById(id).onclick = (_) => {
        uiDisable(true);
        handler();
        // toggle();
        uiDisable(false);
      };
    }

    // shadow.getElementById("menu").onclick = toggle;
    // shadow.getElementById("menu2").onclick = toggle;

    click("save", () => {
      const serialized = serialize(this._canvas);
      dgrmPngCreate(this._canvas, JSON.stringify(serialized));
    });

    (() => {
      const canvas = document.querySelector("#canvas");
      loadData(canvas);
    })();
  }

  /** @param {CanvasElement} canvas */
  init(canvas) {
    /** @private */ this._canvas = canvas;
  }
}
customElements.define("ap-menu", Menu);

/** @param {CanvasElement} canvas,  @param {Blob} png  */
async function loadData(canvas) {
  let dgrmChunk = null;
  let res = await getBlockDiagramJson();
  if (res.data.length === 0) return;
  dgrmChunk = res.data[0].upload_diagram;
  if (deserialize(canvas, dgrmChunk)) {
    tipShow(false);
  }
}

async function getBlockDiagramJson() {
  try {
    const response = await apiServices.get(
      `${apiEndpoints.BlockDiagram.GET}${readSelectedProjectId()}/`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
}

/** @typedef { {x:number, y:number} } Point */
/** @typedef { import('../infrastructure/canvas-smbl.js').CanvasElement } CanvasElement */
export { getBlockDiagramJson };
