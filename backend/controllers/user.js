const db = require("../config/db");

//ข้อ 5-6
exports.add_samecoin_transaction = async (req, res) => {
  try {
    const data = req.body;
    const checkTransfer = await db.balancetb.findOne({
      where: {
        //ดูข้อมูลว่าใครส่งมา
        user_id: data.from_user_id,
        crypto_id: data.to_crypto_id,
      },
    });
    let transfer;
    if (checkTransfer.balance >= 0 && checkTransfer.balance >= data.balance) {
      transfer = await db.transactionstb.create(data);
      if (transfer) {
        const checkRecipient = await db.balancetb.findOne({
          where: {
            //ดูข้อมูลว่าใครได้รับ
            user_id: data.to_user_id,
            crypto_id: data.to_crypto_id,
          },
        });
        let fromBalance;
        //เอาที่โอนไปลบกับเงินในกระเป๋า
        fromBalance =
          Number(checkTransfer.balance || 0) - Number(data.balance || 0);
        const give = await db.balancetb.update(
          { balance: fromBalance },
          {
            where: {
              user_id: data.from_user_id,
              crypto_id: data.to_crypto_id,
            },
          }
        );

        let toBalance =
          Number(data.balance || 0) + Number(checkRecipient?.balance || 0);
        if (checkRecipient) {
          const take = await db.balancetb.update(
            { balance: toBalance },
            {
              where: {
                user_id: data.to_user_id,
                crypto_id: data.to_crypto_id,
              },
            }
          );
        } else {
          const create_wallet = await db.balancetb.create({
            user_id: data.to_user_id,
            crypto_id: data.to_crypto_id,
            balance: data.balance,
          });
        }
        console.log("เช็คข้อมูล", data.balance);
      }
    }
    res.status(200)
    .send({ data: transfer, message: "Transfer Balance Success" });
  } catch (err) {
    console.log(err);
    res.status(400).send("Can't Transfer data");
  }
};

exports.add_diffcoin_transaction = async (req, res) => {
  try {
    const data = req.body;
    const checkTransfer = await db.balancetb.findOne({
      where: {
        user_id: data.from_user_id,
        crypto_id: data.to_crypto_id,
      },
    });
    let transfer;
    if (checkTransfer.balance >= 0 && checkTransfer.balance >= data.balance) {
      transfer = await db.transactionstb.create(data);
      if (transfer) {
        const checkRecipient = await db.balancetb.findOne({
          where: {
            user_id: data.to_user_id,
            crypto_id: data.exchange_crypto_id,
          },
        });
        let fromBalance = Number(checkTransfer.balance || 0) - Number(data.balance || 0);
        const give = await db.balancetb.update(
          { balance: fromBalance },
          {
            where: {
              user_id: data.from_user_id,
              crypto_id: data.to_crypto_id,
            },
          }
        );
            // เรทค่าเงินที่ส่งมา
            const send_rate = await db.cryptotb.findOne({
                where:{
                    crypto_id: data.to_crypto_id,
                },
            })
            // เรทค่าเงินที่รับ
            const to_rate = await db.cryptotb.findOne({
                where:{
                    crypto_id: data.exchange_crypto_id,
                },
            })
            // คำนวณ
           let sum = (Number(send_rate.price_usd) * Number(data.balance)) / Number(to_rate.price_usd)
           console.log(sum)

        let toBalance = Number(sum || 0) + Number(checkRecipient?.balance || 0);
        console.log(toBalance)
        if (checkRecipient) {
          const take = await db.balancetb.update(
            { balance: toBalance },
            {
              where: {
                user_id: data.to_user_id,
                crypto_id: data.exchange_crypto_id,
              },
            }
          );
        } else {
          const create_wallet = await db.balancetb.create({
            user_id: data.to_user_id,
            crypto_id: data.exchange_crypto_id,
            balance: toBalance,
          });
        }
      }
      res.status(200)
      .send({ data: transfer, message: "Transfer Balance Success" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Can't Transfer data");
  }
};
