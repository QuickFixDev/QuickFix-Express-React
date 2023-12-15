import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const IconInfo = ({ message }) => {

    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip();
    }, []);

    return (
        <button className="btn btn-white p-0" data-toggle="tooltip" data-placement="right" title={message}>
            <FontAwesomeIcon icon={faInfoCircle} className="text-primary"></FontAwesomeIcon>
        </button>
    );
}

export default IconInfo