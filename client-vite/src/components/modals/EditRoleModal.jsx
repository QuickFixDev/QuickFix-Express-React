import { Button, Modal, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { useUsers } from "../../hooks/useUsers";
import ServerUrl from "../../constants/ServerUrl";

const EditRoleModal = ({ showModal, handleCancel, role }) => {
    const { users } = useUsers();

    const [open, setOpen] = useState(false);
    const [condition, setCondition] = useState(true);

    const confirm = () => {
        setOpen(false);
        message.success('Role was updated.');
    };

    const handleOpenChange = (newOpen) => {
        if (!newOpen) {
            setOpen(newOpen);
            return;
        }
        // Determining condition before showing the popconfirm.
        console.log(condition);
        if (condition) {
            confirm();
        } else {
            setOpen(newOpen);
        }
        handleSubmit();
        handleCancel();
    };

    const [formData, setFormData] = useState({
        roleId: '',
        roleName: '',
    });

    useEffect(() => {
        setFormData({
            roleId: role.role_id,
            roleName: role.role_name,
        });
    }, [role]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        fetch(`${ServerUrl}/admin/roles/edit/${role.role_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Role updated:', data);
            })
            .catch((error) => console.error('Error updating role:', error));
    };

    return (
        <Modal centered title="Edit Role" open={showModal} onCancel={handleCancel} footer={''}>

            <div className="my-4">
                <FloatingLabel controlId="role_name" label="Role Name">
                    <Form.Control className="my-2" name='roleName' type="text" onChange={handleChange} value={formData.roleName} />
                </FloatingLabel>

            </div>

            <div>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <Button primary>Save changes</Button>
                </Popconfirm>
            </div>

        </Modal>
    );
}

export default EditRoleModal;
