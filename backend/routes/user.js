const express = require("express");
const app = express();

const {
    add_samecoin_transaction,
    add_diffcoin_transaction
} = require("../controllers/user.js");

//http://localhost:8000/api/list
//admin crud usertb
app.post("/add_samecoin_transaction/", add_samecoin_transaction);
app.post("/add_diffcoin_transaction/", add_diffcoin_transaction);


module.exports = app