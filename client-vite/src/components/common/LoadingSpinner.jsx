const LoadingSpinner = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="spinner-border text-secondary" role="status"></div>
        </div>
    );
}

export default LoadingSpinner;