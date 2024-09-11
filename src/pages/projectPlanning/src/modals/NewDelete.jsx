import { Button, Modal } from "antd";

// eslint-disable-next-line react/prop-types
const NDelete = ({ setIsDeleteModalOpen, type, title, onDeleteBtnClick }) => {
  const handleOk = () => {
    console.log("afrearf");
    onDeleteBtnClick();
    setIsDeleteModalOpen(false);
  };
  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <>
      <Modal
        title={`Delete this ${type}`}
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}
            size="middle"
          >
            Cancel
          </Button>,
          <Button
            key="Delete"
            size="middle"
            type="primary"
            danger
            onClick={onDeleteBtnClick}
          >
            Delete
          </Button>,
        ]}
      >
        {type === "task" ? (
          <p>Are you sure you want to delete this task and its subtasks?</p>
        ) : (
          <p>Are you sure you want to delete the <span className="font-semibold">{title}</span> board?</p>
        )}
      </Modal>
    </>
  );
};
export default NDelete;
