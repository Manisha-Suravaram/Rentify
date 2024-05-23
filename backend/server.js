const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server2 = require('./server2');
const server1 = require('./server1');

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(bodyParser.json());
app.use(cors())
app.use('/', server2);
app.use('/',server1);


app.listen(8000, () => {
    console.log('Server started on port: 8000');
});
