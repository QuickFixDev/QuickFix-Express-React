import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from 'react-router-dom';
import LoginButton from "../../components/common/LoginButton";
import { getCategories } from "../../contexts/CategoryContext";
import { getRoles } from "../../contexts/RoleContext";
import { useEffect, useState } from "react";

const ContextTest = () => {
    const { authUser, isLoggedIn } = useAuth();
    const { categories } = getCategories();
    const { roles } = getRoles();

    console.log('role log from home: ', roles)

    return (
        <>
            <p> User is {isLoggedIn ? ('loggedIn') : ('loggedOut')} </p>
            <p> First name: {isLoggedIn ? (authUser.FirstName) : (null)} </p>
            <p> Last name: {isLoggedIn ? (authUser.LastName) : (null)} </p>
            <p> Role: {isLoggedIn ? (authUser.Role) : (null)} </p>
            <p> User id: {isLoggedIn ? (authUser.Id) : (null)} </p>
            <p>categories:</p>

            {categories && categories.length > 0 ?
                (<select>
                    {categories.map((category, index) => (
                        <option key={index} value={category.category_id}>
                            {category.category_id} {category.category_name}
                        </option>
                    ))}
                </select>)
                :
                ('No categories available')
            }

            {roles && roles.length > 0 ?
                (<select name="" id="">
                    {roles.map((role, index) => (
                        <option key={index} value={role.role_id}>
                            {role.role_name}
                        </option>
                    ))}
                </select>)
                :
                ('No roles available')
            }

        </>
    );
}

export default ContextTest;