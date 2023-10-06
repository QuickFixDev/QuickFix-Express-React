import React from 'react'

const ComplainHeader = () => {
    return (
        <>
            <div className='container my-3 text-center'>
                <h1>
                    Your complains
                </h1>
            </div>

            <div className="container mt-5 text-center p-3">
                <div className="row">
                    <div className="col">
                        <span className='fw-bold'>Complain subject</span>
                    </div>
                    <div className="col" style={{ maxWidth: "34%" }}>
                        <span className='fw-bold'>Complain description</span>
                    </div>
                    <div className="col" style={{ maxWidth: "33%" }}>
                        <span className='fw-bold'>Status</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ComplainHeader;