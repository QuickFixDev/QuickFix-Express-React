import { Button, Modal } from "antd"
import { useComplaintsHistory } from "../../hooks/useComplaintsHistory"
import { Steps } from 'antd';
import { useComplaintStatuses } from "../../hooks/useComplaintStatuses";
const { Step } = Steps;

const ComplaintDetailsModal = ({ showModal, handleCancel, complaint }) => {
    const { complaintsHistory, isLoading: complaintsLoading } = useComplaintsHistory({ complaintId: complaint ? complaint.id : null })
    const { complaintStatuses } = useComplaintStatuses()

    const statusIdToNameMap = {};
    complaintStatuses.forEach(status => {
        statusIdToNameMap[status.id] = status.name;
    });

    const steps = complaintsHistory ? complaintsHistory.map(item => ({
        title: statusIdToNameMap[item.status_id],
        description: item.comment,
    })) : []


    return (
        <>
            <Modal centered title="Complaint details" open={showModal} onCancel={handleCancel} footer={[<Button onClick={handleCancel} key="cancel">Ok</Button>]}>

                <Steps
                className="mt-4"
                    progressDot
                    direction="vertical"
                    current={1}
                    items={steps}
                />

            </Modal>
        </>
    )
}

export default ComplaintDetailsModal