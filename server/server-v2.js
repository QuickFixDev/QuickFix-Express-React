const express = require('express');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const pool = require('./dbConnection');
const cors = require('cors');

const app = express();

const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("hello world");
});

app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
