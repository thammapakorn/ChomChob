const express = require("express");
const app = express();

const {
  list_user,
  add_user,
  remove_user,
  update_user,
  update_balance,
  increase_balance,
  total_balance,
  add_crypto,
  update_exchange_rate
} = require("../controllers/admin.js");

//http://localhost:8000/api/list
//admin crud usertb
app.get("/listuser", list_user);
app.post("/adduser", add_user);
app.delete("/removeuser/:id", remove_user);
app.put("/updateuser/:id", update_user);


//admin
app.post("/update_balance/", update_balance);
app.post("/increase_balance/", increase_balance)
app.post("/total_balance/", total_balance);
app.post("/add_crypto/", add_crypto)
app.put("/update_exchange_rate/:id",update_exchange_rate)




module.exports = app;
