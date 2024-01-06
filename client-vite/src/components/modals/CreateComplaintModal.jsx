import { Button, Modal } from "antd"
import { useComplaintsHistory } from "../../hooks/useComplaintsHistory"
import { Steps } from 'antd';
import { useComplaintStatuses } from "../../hooks/useComplaintStatuses";
import { Form, FloatingLabel } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

const CreateComplaintModal = ({ showModal, handleCancel }) => {
    const { authUser } = useAuth()

    const handleSubmit = () => {
        //post
    }


    // id, user_id, category_id, title, description, submitted_date

    return (
        <>
            <Modal centered title="Create a new report" open={showModal} onCancel={handleCancel} footer={[<Button onClick={handleSubmit} key="submit">Submit</Button>]}>
                <div className="mt-4">
                    <pre>
                        {JSON.stringify(authUser, null, 2)}
                    </pre>

                    <FloatingLabel controlId="first_name" label="Title">
                        <Form.Control className="my-2" name='title' type="text" />
                    </FloatingLabel>

                    <FloatingLabel controlId="first_name" label="Description">
                        <Form.Control className="my-2" name='title' as="textarea" />
                    </FloatingLabel>

                    <FloatingLabel controlId="first_name" label="Title">
                        <Form.Control className="my-2" name="title" as="select">
                            <option value="">Select</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                        </Form.Control>
                    </FloatingLabel>

                </div>
            </Modal>
        </>
    )
}

export default CreateComplaintModal