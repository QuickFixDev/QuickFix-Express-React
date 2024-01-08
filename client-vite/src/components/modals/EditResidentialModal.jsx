import { Button, Modal, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { useUsers } from "../../hooks/useUsers";
import ServerUrl from "../../constants/ServerUrl";

const EditResidentialModal = ({ showModal, handleCancel, residential }) => {
  const { users } = useUsers();

  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState(true);

  const confirm = () => {
    setOpen(false);
    message.success('Residential was updated.');
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
    residentialId: '',
    residentialName: '',
    country: '',
    state: '',
    city: '',
  });

  useEffect(() => {
    setFormData({
      residentialId: residential.residential_id,
      residentialName: residential.residential_name,
      country: residential.country,
      state: residential.state,
      city: residential.city,
    });
  }, [residential]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    fetch(`${ServerUrl}/admin/residentials/edit/${residential.residential_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Residential created:', data);
        // Optionally handle success and update UI accordingly
      })
      .catch((error) => console.error('Error creating residential:', error));
  };

  return (
    <Modal centered title="Create New Residential" open={showModal} onCancel={handleCancel} footer={''}>

      <div className="my-4">
        <FloatingLabel controlId="residential_name" label="Residential Name">
          <Form.Control className="my-2" name='residentialName' type="text" onChange={handleChange} value={formData.residentialName} />
        </FloatingLabel>

        <FloatingLabel controlId="country" label="Country">
          <Form.Control className="my-2" name='country' type="text" onChange={handleChange} value={formData.country} />
        </FloatingLabel>

        <FloatingLabel controlId="state" label="State">
          <Form.Control className="my-2" name='state' type="text" onChange={handleChange} value={formData.state} />
        </FloatingLabel>

        <FloatingLabel controlId="city" label="City">
          <Form.Control className="my-2" name='city' type="text" onChange={handleChange} value={formData.city} />
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

export default EditResidentialModal;
