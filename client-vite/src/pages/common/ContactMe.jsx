const ContactMe = () => {
    return (
        <div className='container d-flex flex-column justify-content-center my-5 w-50 h-75 shadow-md'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="text-center">
                        <h2>Contact me</h2>
                        <p>Feel free to contact me by the following methods</p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <a href="https://api.whatsapp.com/send?phone=4491882083" className="btn btn-success mx-2">
                            <i className="fab fa-whatsapp"></i> WhatsApp
                        </a>
                        <a href="mailto:quickfix.dev1@gmail.com" className="btn btn-danger mx-2">
                            <i className="far fa-envelope"></i> Gmail
                        </a>
                        <a href="https://www.linkedin.com/in/juanxc7" className="btn btn-primary mx-2">
                            <i className="fab fa-linkedin"></i> LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactMe;
