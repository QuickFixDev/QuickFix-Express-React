// ModalComponent.js
import { Modal } from 'antd';

const ModalComponent = ({ visible, onClose, complaint }) => {
  return (
    <Modal
      title={`Complaint Details - ID: ${complaint.complaint_id}`}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div>
        <p><strong>Title:</strong> {complaint.complaint_title}</p>
        <p><strong>Description:</strong> {complaint.complaint_description}</p>
        <p><strong>Status:</strong> {complaint.complaint_status}</p>
      </div>
    </Modal>
  );
};

export default ModalComponent;
