const router = require("express").Router();
const user__auth = require("../AuthJWT/JwtAuth");
const Order_Model = require("../Models/order.model");
const shoppingCart_Model = require("../Models/shoppingCart.model");
const shoppingCartProduct = require("../Models/shoppingCartProduct.model");
const fs=require('fs')

router.post("/submitOrder/:shoppingCartID", user__auth, async (req, res) => {
  const {shoppingCartID}=req.params
  try {
    const {
      customer,
      city,
      street,
      date_of_delivery,
      credit_card,
    } = req.body;

    const checkIfExist = await Order_Model.find({
      date_of_delivery: date_of_delivery,
    });
    if (checkIfExist.length >= 3) {
      return res.status(401).json({
        msg: "Date is taken over 3 times,please choose another date.",
      });
    } else {
      await shoppingCart_Model.findOneAndUpdate(
        { _id: shoppingCartID },
        {$set:{ active:false }}
      );
      const last_4_number_of_card=credit_card%10000; 
      const newOrder = new Order_Model({
        customer,
        shoppingCartID,
        city,
        street,
        date_of_delivery,
        credit_card:last_4_number_of_card,
      });

      await newOrder.save();

      createOrderFile(newOrder, shoppingCartID)
      res.status(201).send({ order: newOrder });
    }
  } catch (error) {
    res.status(404).send({ msg: "Couldnt follow the command", error });
  }
});

const createOrderFile = async (newOrder, shoppingCartID) => {
  let totalSum=0
  let cartDetails = await shoppingCartProduct.find({cartID:shoppingCartID}).populate({
    path:'product'
  });
  fs.writeFileSync(
    `${__dirname}/order.text`,
    `
============================================ \n
  ORDER RECEPTION \n
  `
  );
  for (const key in cartDetails) {
    if (cartDetails.hasOwnProperty.call(cartDetails, key)) {
      const product = cartDetails[key];
      let totalSumOfProduct=product.product.price*product.amount
      totalSum+=totalSumOfProduct
      
      fs.appendFileSync(
      `${__dirname}/order.text`,
        `
        ================================================================
        
        name - ${product.product.name} \n
        price - ${product.product.price} \n
        Amount - ${product.amount} \n
        Total Price - ${product.product.price * product.amount} \n
        
        `
        );
      }
    }
    
    fs.appendFileSync(
      `${__dirname}/order.text`,
      `
      ===============================================================
    Delivery City - ${newOrder.city} \n
    Delivery Street - ${newOrder.street} \n
    Delivery Date - ${newOrder.date_of_delivery} \n
    Total sum of Order -${totalSum}
    
    Your reservation has been confirmed,
    Thank you for shopping at E-Shop.
    `
    );
  }

  router.get('/recipt', (req, res)=>{
    res.download(`${__dirname}/order.text`)
  })
    

router.get("/number-of-orders", async (req, res) => {
  try {
    const fetch_all_orders = await Order_Model.find();
    res.json({ fetch_all_orders, numberOfOrders: fetch_all_orders.length });
  } catch (error) {
    console.log({ error });
  }
});


module.exports = router;
