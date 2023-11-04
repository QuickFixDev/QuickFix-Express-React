import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faFacebook, faLinkedin, faWhatsapp, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const whiteIconStyle = {
        color: 'white',
    };

    return (
        <>
            <div className='bg-black py-5'>
                <div className="text-center">
                    <p className='text-white'>&copy; 2023 QuickFix</p>
                </div>
                <div className='container d-flex flex-row w-75 align-items-center justify-content-around'>
                    <FontAwesomeIcon icon={faDiscord} size="2x" style={whiteIconStyle} />
                    <FontAwesomeIcon icon={faFacebook} size="2x" style={whiteIconStyle} />
                    <FontAwesomeIcon icon={faLinkedin} size="2x" style={whiteIconStyle} />
                    <FontAwesomeIcon icon={faWhatsapp} size="2x" style={whiteIconStyle} />
                    <FontAwesomeIcon icon={faGoogle} size="2x" style={whiteIconStyle} />
                </div>
            </div>
        </>
    );
};

export default Footer;
