import { Button, Drawer } from "antd";
import InventoryTable from "./components/table";
import { useEffect, useState } from "react";
import apiServices from "../../services/exportService";
import { apiEndpoints } from "../../utils/apiEndPoints";
import {
  readSelectedProjectId,
  readStudentId,
  readUserId,
} from "../../services/localServices";

const InventoryPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = () => {
    apiServices
      .get(`${apiEndpoints.CodePush.GetJSON}${readSelectedProjectId()}`)
      .then((res) => {
        // let list = convertToTableData(res.data);
        // console.log(convertToTableData(res.data));
        console.log(res.data);
        let TempData = [];
        res.data.map((data) => {
          TempData.push({
            key: data.name,
            Name: data.name,
            Equipment: data.equipment_id,
            BinFileState: data.embedded_generated_code_state,
            Data: data,
          });
        });
        setItems(TempData);
      });
  };

  return (
    <>
      <div>
        <div className="items-center pb-5 flex flex-1 flex-row justify-between">
          <p className="text-[20px] font-medium">Code Push</p>
        </div>
        <InventoryTable data={items} fetchList={fetchList} />
      </div>
    </>
  );
};

export default InventoryPage;
