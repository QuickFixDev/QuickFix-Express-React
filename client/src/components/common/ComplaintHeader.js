import React from 'react'

const ComplaintHeader = () => {
    return (
        <>
            <div className="container my-3 text-center">
                <h1>
                    Your complains
                </h1>
            </div>

            <div className="container mt-5 text-center pt-3 pb-5">
                <div className="row">
                    <div className="col-4">
                        <span className='fw-bold'>Complain subject</span>
                    </div>
                    <div className="col-4">
                        <span className='fw-bold'>Complain description</span>
                    </div>
                    <div className="col-4">
                        <span className='fw-bold'>Status</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ComplaintHeader;