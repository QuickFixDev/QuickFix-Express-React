import { NavLink } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="list container-fluid h-100  p-md-5 p-3">
            <div className="row d-flex flex-row g-3">
                <div className="col-12">
                    <div className="container text-center rounded-4 p-3">
                        <div className="street my-5">
                            <h1> Hey! welcome to QuickFix </h1>
                        </div>
                    </div>
                </div>
                <NavLink className="col-md-6 col-12 hover-navlink">
                    <div className="container bg-light text-center rounded-4 p-5">
                        <div className="my-3">
                            <h3>New around here?</h3>
                        </div>
                        <div className="my-3">
                            <p>Sign up for free!</p>
                        </div>
                    </div>
                </NavLink>
                <NavLink className="col-md-6 col-12 hover-navlink">
                    <div className="container bg-light text-center rounded-4 p-5">
                        <div className="my-3">
                            <h3>Do you have an account?</h3>
                        </div>
                        <div className="my-3">
                            <p>Sign into your account</p>
                        </div>
                    </div>
                </NavLink>
            </div>

        </div>
    );
}

export default HomePage;