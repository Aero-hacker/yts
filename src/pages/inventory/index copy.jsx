import { Button, Drawer } from "antd";
import InventoryTable from "./components/table";
import { useEffect, useState } from "react";
import InventoryAddItemForm from "./components/form";
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
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = () => {
    const body = {
      project_id: readSelectedProjectId(),
      user_id: readUserId(),
      student_id: readStudentId(),
    };
    apiServices
      .post(apiEndpoints.inventory.readinventoryHardware, body)
      .then((res) => {
        let list = convertToTableData(res.data);
        console.log(convertToTableData(res.data));

        setItems(list);
      });
  };

  const convertToTableData = (itemsList) => {
    return itemsList.map((item, i) => ({
      key: i,
      hardware_name: item.hardware_info.hardware_name,
      model_name: item.hardware_info.model_name,
      type: item.hardware_info.hardwaretype,
      number_of_pins: item.hardware_info.number_of_pins,
      quantity: item.quantity,
      hardware_reference_id: item.hardware_reference_id,
      hardware_id: item.hardware_info.hardware_id,
    }));
  };
  return (
    <>
      <div>
        <div className="items-center pb-5 flex flex-1 flex-row justify-between">
          <p className="text-[20px] font-medium">Inventory</p>
          <Button
            onClick={() => setOpenModal(true)}
            type="primary"
            size="large"
          >
            Add New Item
          </Button>
        </div>
        <InventoryTable data={items} />
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={true}
          open={openModal}
          onClose={() => setOpenModal(false)}
        >
          <InventoryAddItemForm
            setOpenModal={setOpenModal}
            refresh={fetchInventoryItems}
          />
        </Drawer>
      </div>
    </>
  );
};

export default InventoryPage;
