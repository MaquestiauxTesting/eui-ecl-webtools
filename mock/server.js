const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('mock/db/db.json');
const db = low(adapter);
const cors = require('cors');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://127.0.0.1:8080', // adapt to your need
    credentials: true,
}));

require('./app/routes')(app, db);

app.listen(port, () => {
    console.log('We are live on ' + port);
});
