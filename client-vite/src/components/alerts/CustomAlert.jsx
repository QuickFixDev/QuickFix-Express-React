import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


const CustomAlert = ({ title, message, type, hover }) => {

    const styleOptions = {
        success: { border: 'border-success', color: '#DFF9E7', icon: faCheckCircle},
        primary: { border: 'border-primary', color: '#DFF6F9', icon: null},
        warning: { border: 'border-warning', color: '#F9F9DF', icon: faTriangleExclamation},
        error: { border: 'border-danger', color: '#FADEDE', icon: faTriangleExclamation},
    }

    const styles = type ? styleOptions[type] : {};

    return (
        <div className={`rounded-2 border-5 p-4 border-start ${styles.border} ${hover ? 'cursor-pointer' : ''}`} style={{ backgroundColor: styles.color }}>
            <div className="row d-flex flex-row align-items-center">
                <div className="col text-start">
                    <h5 className="fw-bold">{title}</h5>
                    <span>{message}</span>
                </div>
                <div className="col text-end">
                    <FontAwesomeIcon size='2x' icon={styles.icon} />
                </div>
            </div>
        </div>
    );
}

export default CustomAlert;
