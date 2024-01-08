import { Button, Modal, Popconfirm, Switch, message } from "antd"
import { useEffect, useState } from "react";
import { Form, FloatingLabel } from "react-bootstrap";
import { useUsers } from "../../hooks/useUsers";
import { useResidentials } from "../../hooks/useResidentials";
import ServerUrl from "../../constants/ServerUrl";

const EditResidenceModal = ({ showModal, handleCancel, residence }) => {
  const { users } = useUsers();
  const { residentials } = useResidentials();

  const [open, setOpen] = useState(false);
  const [condition, setCondition] = useState(true);

  const confirm = () => {
    setOpen(false);
    message.success('Residence was updated.');
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
    residenceId: '',
  });

  useEffect(() => {
    setFormData({
      residentialId: residence.residential_id,
      zipCode: residence.zip_code,
      streetName: residence.street_name,
      streetNumber: residence.street_number,
      details: residence.details,
      ownerUserId: residence.owner_user_id,
      tenantUserId: residence.tenant_user_id,
      residenceId: residence.residence_id
    });
  }, [residence]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    fetch(`${ServerUrl}/admin/residences/edit/${residence.residence_id}`, {
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
    <Modal centered title={`Edit ${residence.street_name} ${residence.street_number}`} open={showModal} onCancel={handleCancel} footer={''}>

      <div className="my-4">
        <FloatingLabel controlId="residential" label="Select a residential area">
          <Form.Control className="my-2" name='residentialId' type="text" onChange={handleChange} value={formData.residentialId} as="select">
            <option value={residentials.find(residential => residential.residential_id === residence.residential_id)?.residential_id}>
              {
                residentials &&
                residentials.find(residential => residential.residential_id === residence.residential_id)?.residential_name
              }
            </option>

            {residentials.map((residential) => (
              residential.residential_id !== residence.residential_id && (
                <option key={residential.residential_id} value={residential.residential_id}>{residential.residential_name}</option>
              )
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
            <option value={residence.owner_user_id}>
              {
                users &&
                users.find(user => user.user_id === residence.owner_user_id)?.first_name
                + ' ' +
                users.find(user => user.user_id === residence.owner_user_id)?.last_name
              }
            </option>

            {users.map((user) => (
              user.user_id !== residence.owner_user_id &&
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
            {/* <option value="select">{users.find(user => user.user_id === residence.owner_user_id)}</option> */}
            <option value="select">
              {
                users &&
                users.find(user => user.user_id === residence.tenant_user_id)?.first_name
                + ' ' +
                users.find(user => user.user_id === residence.tenant_user_id)?.last_name
              }
            </option>

            {users.map((user) => (
              user.user_id !== residence.tenant_user_id &&
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
          <Button primary>Save changes</Button>
        </Popconfirm>
      </div>


    </Modal>
  );
}

export default EditResidenceModal;