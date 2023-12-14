import AccessDenied from "./AccessDenied";
import { useAuth } from "../../contexts/AuthContext";

const NotificationComponent = ({ img_src, title, description }) => {
    return (
        <div className="row bg-white rounded-3 px-3 my-2">
            <div className="col-auto d-flex flex-column justify-content-center align-items-center">
                <img src={img_src} alt="notification_img  " width={'50px'} />
            </div>
            <div className="col d-flex flex-column py-2">
                <p className="fw-bold">{title}</p>
                <p>{description}</p>
            </div>
        </div>
    )
}

const NotificationPanel = () => {
    const { authUser, isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return (
            <div className="px-2">
                <div className="text-center py-4">
                    <h2 className="fw-bold">
                        Notifications
                    </h2>
                </div>
                <div className="container-fluid col-xl-6 col-lg-8 col-md-10 col-12 bg-light px-4 py-2 rounded-3">
                    <NotificationComponent  img_src={"https://via.placeholder.com/50x50/333"} title={"some title"} description={"some desc"}/>
                </div>
            </div>
        );
    } else {
        return (
            <AccessDenied />
        );
    }
}

export default NotificationPanel;