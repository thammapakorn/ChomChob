const db = require("../config/db");
const balancetb = require("../models/balancetb");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');


//usertb
//ดูข้อมูล user
exports.list_user = async (req, res) => {
  try {
    const listed = await db.usertb.findAll();
    console.log(listed);
    res.send(listed);
  } catch (err) {
    //error
    console.log(err);
    res.status(500).send("server error");
  }
};
//usertb
//เพิ่มข้อมูล user
exports.add_user = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const added = await db.usertb.create(data);
    res.status(200).send(added);
  } catch (err) {
    // console.log(err)
    res.status(400).send("Can't insert data");
  }
};
//usertb
//ลบข้อมูล
exports.remove_user = async (req, res) => {
  try {
    const id = req.params.id;
    const added = await db.usertb.destroy({
      where: {
        user_id: id,
      },
    });
    res.status(200).send(added);
  } catch (err) {
    console.log(err);
    res.status(422).send("Invalid data");
  }
};
//usertb
//แก้ไขข้อมูล
exports.update_user = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updated = await db.usertb.update(
      { ...data },
      {
        where: {
          user_id: id,
        },
      }
    );
    res.status(200).send("Edit item Success");
  } catch (err) {
    console.log(err);
    res.status(414).send("Can't update data");
  }
};

//ข้อแรก เพิ่ม ลด เหรียญ ในกระเป๋า increase decrease
exports.update_balance = async (req, res) => {
  try {
    const data = req.body;
    const role = data.role;
    const userid = data.user_id;
    const cryptoid = data.crypto_id;
    let check = await db.balancetb.findOne({
      where: {
        user_id: data.user_id,
        crypto_id: data.crypto_id,
      },
    });
    console.log(check.balance)
    if (role === "admin") {
      let number
      if(data.send === "increase"){
        number = Number(check.balance) + Number(data.balance)
      }else if(data.send === "decrease"){
        number = Number(check.balance) - Number(data.balance)
      }
      const updated = await db.balancetb.update(
        { balance: number },
        {
          where: {
            user_id: userid,
            crypto_id: cryptoid,
          },
        }
      );
      console.log(number)
      res.status(200)
      .send({ data: updated, message: "Update Balance Success" });
    } else {
      res.status(400).send("You're not admin");
    }
  } catch (err) {
    console.log(err);
    res.status(414).send("Can't update data");
  }
};

//ข้อแรก สร้างเหรียญใหม่
exports.increase_balance = async (req, res) => {
  try {
    const data = req.body;
    const role = data.role;

    let check = await db.balancetb.findOne({
      where: {
        user_id: data.user_id,
        crypto_id: data.crypto_id,
      },
    });
    if (role === "admin" && !check) {
      const increase = await db.balancetb.create(data);
      res
        .status(200)
        .send({ data: increase, message: "Increase Balance Success" });
    } else {
      res.status(400).send("You're not admin or User already have this coins");
    }
    console.log(data);
    console.log(check);
    // console.log(crytoid)
  } catch (err) {
    console.log(err);
    res.status(414).send("Can't increase data");
  }
};

//ข้อสอง ดูทั้งหมดว่า มีเหรียญอะไรบ้างรวมของทุกคนเป็นเท่าไหร่
exports.total_balance = async (req, res) => {
  try {
    const data = req.body;
    const role = data.role
    let balance 
    if(role === "admin"){
      balance = await db.sequelize.query(
        `SELECT balancetb.crypto_id, cryptotb.symbol, SUM(balance) AS total_price FROM balancetb
         LEFT JOIN cryptotb ON balancetb.crypto_id = cryptotb.crypto_id
         GROUP BY crypto_id`, {
        type: QueryTypes.SELECT,
      });
    }
    res.status(200).
    send({ data: balance, message: "Total Balance" });
  } catch(err) {
    console.log(err);
    res.status(414).send("Can't total balance data");
  }
};

//ข้อสาม admin เพิ่มเหรียญอื่นๆเข้าไปในกระเป๋า
exports.add_crypto  = async (req, res) => {
  try {
    const data = req.body;
    const role = data.role;

    let check = await db.balancetb.findOne({
      where: {
        user_id: data.user_id,
        crypto_id: data.crypto_id,
      },
    });
    if (role === "admin" && !check) {
      const increase = await db.balancetb.create(data);
      res
        .status(200)
        .send({ data: increase, message: "Increase Balance Success" });
    } else {
      res.status(400).send("You're not admin or User already have this coins");
    }
  } catch (err) {
    console.log(err);
    res.status(414).send("Can't increase data");
  }
};

//ข้อสี่
exports.update_exchange_rate = async (req, res) => {
  try {
    const data = req.body;
    const role = data.role
    const id = req.params.id;
    if (role === "admin"){
      const updated = await db.cryptotb.update(
        { ...data },
        {
          where: {
            crypto_id: id,
          },
        }
      );
      res.status(200).
      send({ data: updated, message: "Update exchange rate success" });
    }
  }catch (err) {
    console.log(err);
    res.status(414).send("Can't update data");
  }
};