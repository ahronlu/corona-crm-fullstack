const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const app = express();
const port = 3001;

// Connect Database
connectDB();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/customer', require('./routes/customer'));

app.listen(port, () => console.log(`App is listening on port ${port}`));
