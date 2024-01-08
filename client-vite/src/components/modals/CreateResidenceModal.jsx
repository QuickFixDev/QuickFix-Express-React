import { Button, Modal, Popconfirm, Switch, message } from "antd"
import { useEffect, useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { useUsers } from "../../hooks/useUsers";
import { useResidentials } from "../../hooks/useResidentials";
import ServerUrl from "../../constants/ServerUrl";

const CreateResidenceModal = ({ showModal, handleCancel }) => {
    const { users } = useUsers();
    const { residentials } = useResidentials();

    const [open, setOpen] = useState(false);
    const [condition, setCondition] = useState(true);

    const confirm = () => {
        setOpen(false);
        message.success('Residence was created.');
    };

    const handleOpenChange = (newOpen) => {
        if (!newOpen) {
            setOpen(newOpen);
            return;
        }
        // Determining condition before show the popconfirm.
        console.log(condition);
        if (condition) {
            confirm();
        } else {
            setOpen(newOpen);
        }
        handleSubmit()
        handleCancel()
    };

    const [formData, setFormData] = useState({
        residentialId: '',
        zipCode: '',
        streetName: '',
        streetNumber: '',
        details: '',
        ownerUserId: '',
        tenantUserId: '',
    });

    useEffect(() => {
        setFormData({
            residentialId: '',
            zipCode: '',
            streetName: '',
            streetNumber: '',
            details: '',
            ownerUserId: '',
            tenantUserId: '',
        });
    }, [showModal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        fetch(`${ServerUrl}/admin/residences/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Complaint registered:', data);
            })
            .catch((error) => console.error('Error registering user:', error));
    };

    return (
        <Modal centered title="Create New Residence" open={showModal} onCancel={handleCancel} footer={''}>

            <div className="my-4">
                <FloatingLabel controlId="residential" label="Select a residential area">
                    <Form.Control className="my-2" name='residentialId' type="text" onChange={handleChange} value={formData.residentialId} as="select">
                        <option value="">Select a residence</option>
                        {residentials.map((residential) => (
                            <option key={residential.residential_id} value={residential.residential_id}>{residential.residential_name}</option>
                        ))}
                    </Form.Control>
                </FloatingLabel>

                <FloatingLabel controlId="zip_code" label="Zip code">
                    <Form.Control className="my-2" name='zipCode' type="text" onChange={handleChange} value={formData.zipCode} />
                </FloatingLabel>

                <FloatingLabel controlId="street_name" label="Street name">
                    <Form.Control className="my-2" name='streetName' type="text" onChange={handleChange} value={formData.streetName} />
                </FloatingLabel>

                <FloatingLabel controlId="street_number" label="Street number">
                    <Form.Control className="my-2" name='streetNumber' type="text" onChange={handleChange} value={formData.streetNumber} />
                </FloatingLabel>

                <FloatingLabel controlId="details" label="Residence details">
                    <Form.Control className="my-2" name='details' as="textarea" onChange={handleChange} value={formData.details} />
                </FloatingLabel>

                <FloatingLabel controlId="owner_user_id" label="Select an owner">
                    <Form.Control className="my-2" name='ownerUserId' type="text" onChange={handleChange} value={formData.ownerUserId} as="select">
                        <option value="">Select the residence owner</option>
                        {users.map((user) => (
                            user.status_id === 2 &&
                            user.role_name === 'owner' &&
                            (
                                <option key={user.user_id} value={user.user_id}>{user.first_name} {user.last_name}</option>
                            )
                        ))}
                    </Form.Control>
                </FloatingLabel>

                <FloatingLabel controlId="tenant_user_id" label="Select a tenant">
                    <Form.Control className="my-2" name='tenantUserId' type="text" onChange={handleChange} value={formData.tenantUserId} as="select">
                        <option value="">Select the residence tenant</option>
                        {users.map((user) => (
                            user.status_id === 2 &&
                            user.role_name !== 'owner' &&
                            (
                                <option key={user.user_id} value={user.user_id}>{user.first_name} {user.last_name}</option>
                            )
                        ))}
                    </Form.Control>
                </FloatingLabel>
            </div>

            <div>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <Button primary>Create residence</Button>
                </Popconfirm>
            </div>
        </Modal>
    );
}

export default CreateResidenceModal;