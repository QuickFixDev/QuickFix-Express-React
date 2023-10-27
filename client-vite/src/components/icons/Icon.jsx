/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faWhatsapp, faFacebook, faGoogle, faDiscord } from '@fortawesome/free-brands-svg-icons';

const Icon = ({ name }) => {
    switch (name) {
        case 'linkedin':
            return <FontAwesomeIcon icon={faLinkedin} />;
        case 'whatsapp':
            return <FontAwesomeIcon icon={faWhatsapp} />;
        case 'facebook':
            return <FontAwesomeIcon icon={faFacebook} />;
        case 'gmail':
            return <FontAwesomeIcon icon={faGoogle} />;
        case 'discord':
            return <FontAwesomeIcon icon={faDiscord} />;
        default:
            return null;
    }
};

export default Icon;
