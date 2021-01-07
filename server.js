require('dotenv').config();
 const api = require('./routes/api');


const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//app.use(helmet());

//web3.eth.defaultAccount = web3.eth.accounts[0];

//console.log(healthCare.checkProfile(0xa113b22d40dc1d5d086003c27a556e597f614e8b));
//console.log(web3.eth.accounts);

app.use(morgan('combined'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// require('./routes/auth-routes')(app, metaAuth);
require('./routes/api')(app);

app.listen(9090, '0.0.0.0',() => console.log("server up and listening at 9090"));

module.exports = app;
