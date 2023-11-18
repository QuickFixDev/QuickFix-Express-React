import { useEffect, useState } from "react";
import ServerUrl from "../../constants/ServerUrl";
import { getRoles } from "../../contexts/RoleContext";

const ComplaintFilter = () => {
    const { roles } = getRoles();
    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        console.log(search);
    }, [search]);

    return (
        <>
        
            <input
                type="text"
                placeholder="search here"
                onChange={handleSearch}
            />

            <table>
                <tbody>

                    {roles
                        .filter((item) => {
                            return search.toLowerCase() === ''
                                ? item
                                : item.role_name.toLowerCase().includes(search)
                        })
                        .map((item) => (
                            <tr key={item.role_id}>
                                <td>{item.role_id}</td>
                                <td>{item.role_name}</td>
                            </tr>
                        ))}

                </tbody>
            </table>

        </>
    );
}

export default ComplaintFilter;