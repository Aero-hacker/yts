import apiServices from "../../../../services/exportService.jsx";
import {
  readSectionId,
  readSelectedProjectId,
  readStudentId,
  readUserId,
} from "../../../../services/localServices.jsx";
import { apiEndpoints } from "../../../../utils/apiEndPoints.jsx";
import { pngChunkGet } from "../infrastructure/png-chunk.js";
import { getBlockDiagramJson } from "../ui/menu.js";

/**
 * @param {CanvasElement} canvas
 * @param {string} dgrmChunkVal
 * @param {BlobCallback} callBack
 */

export function dgrmPngCreate(canvas, dgrmChunkVal) {
  //TODO: save data to Backend
  async function saveBlockDiagramJson() {
    console.log(dgrmChunkVal);
    let body = {
      Description: `Block Diagram for project ${readSelectedProjectId()}`,
      upload_diagram: JSON.parse(dgrmChunkVal),
      User_Id: readUserId(),
      Project_ID: readSelectedProjectId(),
      stud_id: readStudentId(),
      Sec_ID: readSectionId(),
    };
    const res = await getBlockDiagramJson();
    if (res.data.length !== 0) {
      await apiServices.post(
        `${apiEndpoints.BlockDiagram.UPDATE}${res.data[0].DID}/`,
        body
      );
    } else {
      await apiServices.post(`${apiEndpoints.BlockDiagram.CREATE}`, body);
    }
  }

  saveBlockDiagramJson();
  return;
}

/**
 * @param {Blob} png
 * @returns {Promise<string|null>}
 */
export async function dgrmPngChunkGet(png) {
  const dgrmChunkVal = await pngChunkGet(png, "dgRm");
  return dgrmChunkVal ? new TextDecoder().decode(dgrmChunkVal) : null;
}

/** @typedef { {x:number, y:number} } Point */
/** @typedef { import('../infrastructure/canvas-smbl.js').CanvasElement } CanvasElement */
