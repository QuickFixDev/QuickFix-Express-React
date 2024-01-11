import { useLocation } from 'react-router-dom';

const PageNotFound = () => {
    const location = useLocation();

    return (
        <div className="h-90-vh d-flex flex-column justify-content-center align-items-center">
            <div className='text-center'>
                <h1 className="my-0 py-0 display-1 fw-bold">404</h1>
                <h2 className="my-0 py-0 text-muted">page not found</h2>
            </div>
            <div className='text-center mt-4'>
                <p className=''>
                    The requested URL
                    <mark className='p-1 mx-1'>{location.pathname}</mark>
                    was not found on this server.
                </p>
            </div>
        </div>
    )
}

export default PageNotFound;