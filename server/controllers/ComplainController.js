const ComplaintController = {};
const Complaint = require('./models/Complaint');

ComplaintController.createComplaint = (req, res) => {
    const newComplaint = req.body;

    Complaint.create(newComplaint)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create complaint' });
        });
};

ComplaintController.getAllComplaints = (req, res) => {
    Complaint.findAll()
        .then(complaints => {
            res.json(complaints);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch complaints' });
        });
};

ComplaintController.updateComplaint = (req, res) => {
    const complaintId = req.params.id;
    const updatedComplaint = req.body;

    Complaint.update(updatedComplaint, { where: { id: complaintId } })
        .then(result => {
            if (result[0] === 1) {
                res.json({ message: 'Complaint updated successfully' });
            } else {
                res.status(404).json({ error: 'Complaint not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to update complaint' });
        });
};

ComplaintController.deleteComplaint = (req, res) => {
    const complaintId = req.params.id;

    Complaint.destroy({ where: { id: complaintId } })
        .then(result => {
            if (result === 1) {
                res.json({ message: 'Complaint deleted successfully' });
            } else {
                res.status(404).json({ error: 'Complaint not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete complaint' });
        });
};

module.exports = ComplaintController;
