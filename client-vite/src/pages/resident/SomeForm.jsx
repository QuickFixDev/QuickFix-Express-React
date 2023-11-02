import { useAuth0 } from '@auth0/auth0-react';
import AccessDenied from '../common/AccessDenied';
import ServerUrl from '../../constants/ServerUrl';

const ComplainForm = () => {
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return (
            <AccessDenied />
        )
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        fetch(`${ServerUrl}/complain-form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dataToSend })
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Form submitted successfully');
                } else {
                    console.error('Form submission failed');
                }
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
            });
    }

    return (
        < form onSubmit={handleSubmit} action="" method="POST" >
            <input hidden type="number" name="complaint_id" />
            <input hidden type="number" name="user_id" value={1} />
            <input hidden type="text" name="status" value={"Open"} />
            <input hidden type="text" name="category_id" value={1} />
            <input hidden type="email" name="email" placeholder="email" value={user.email} />
            <input hidden type="text" name="complaint_date" placeholder="complaint_date" />

            <input type="text" name="complaint_title" placeholder="complaint_title" />
            <input type="text" name="complaint_description" placeholder="complaint_description" />

            <button type='submit'>Submit</button>
        </form >
    );
}

export default ComplainForm;



