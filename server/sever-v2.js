const express = require('express');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const categoryRoutes = require('./routes/CategoryRoutes');
const userRoutes = require('./routes/UserRoutes');
const complaintRoutes = require('./routes/ComplaintRoutes');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send("hello world");
});

app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);
app.use('/complaints', complaintRoutes);

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});