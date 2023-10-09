import React from "react";
import user from '../../contexts/UserContext'
import AccessDenied from '../common/AccessDenied';

const SignUp = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    const data = {
        user_id: 1,
        complaint_date: formattedDate
    }

    console.log("user_id", data.user_id);
    console.log("complaint_date", data.complaint_date);

    if (user.role === "resident" || user.role === "dev") {
        return (
            <div>
                <form>
                    <input type="number" name="user_id" value={data.user_id} readOnly />
                    <input type="text" name="complaint_title" />
                    <input type="text" name="complaint_description" />
                    {/* Add date here */}
                    <input type="text" name="submitted_at" value={data.complaint_date} readOnly />
                    <select name="status">
                        <option value="Open">Open</option>
                    </select>
                    <select name="category_id">
                        <option value="1">1</option>
                    </select>
                </form>
            </div>
        );
    }
    return (
        <AccessDenied />
    );
}

export default SignUp;