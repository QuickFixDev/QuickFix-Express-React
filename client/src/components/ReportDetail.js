import React from 'react';
const complain = {
    id: '1',
    user_id_: '1',
    complaint_title: 'Complain title',
    complaint_category: 'Water supplies',
    complaint_description: 'The quick, brown fox jumps over a lazy dog. DJs flock by when MTVax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow..',
    complaint_date: '00/00/0000',
    status: 'open',
}

const ReportDetail = () => {
    return (
        <div className='container mt-3 overflow-auto'>
            <div className="row">
                <div className="col-md-6 text-left">
                    <h1>{complain.complaint_title}</h1>
                    <h5>{complain.complaint_category}</h5>
                    <p> complaint id: {complain.id}</p>
                </div>
                <div className="col-md-6 text-md-end">
                    <p>{complain.complaint_date}</p>
                </div>
            </div>
            <div className="row text-left">
                <div className="col-12 text-left">
                    <p>{complain.complaint_description}</p>
                </div>
            </div>
        </div>
    );
}

export default ReportDetail;