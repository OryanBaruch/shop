const router = require("express").Router();
const shoppingCart_Model = require("../Models/shoppingCart.model");
const shoppingCartProduct = require("../Models/shoppingCartProduct.model");
const user__auth = require("../AuthJWT/JwtAuth");


router.post("/make-cart",user__auth, async (req, res) => {
  try {
    const { userID } = req.body;
    const cart = await shoppingCart_Model.find({ userID }).populate({
      path: "product",
    });
    if (cart.length) {
      let cart_Of_Exist_User=await  shoppingCart_Model.findOneAndUpdate({userID}, {$set:{active:true}})
      return res.json(cart_Of_Exist_User)
    }
      const new_cart = new shoppingCart_Model({
        userID,
        active:true
      });
      await new_cart.save();
      res.json(new_cart);
  } catch (error) {
    console.log({ error });
  }
});

router.get("/byUser", user__auth, async (req, res) => {
  let sum = 0;
  try {
    const userID = req.user._id;
    const cart = await shoppingCart_Model.findOne(userID);
    const cartProducts = await shoppingCartProduct.find().populate({
      path:"product",
    });

    for (let i = 0; i < cartProducts.length; i++) {
        sum += cartProducts[i].product.price * cartProducts[i].amount;
    }

    const cart_detials = { cart, cartProducts, sum };
    res.status(200).json({ cart_detials });
  } catch (error) {
    console.log({ error });
  }
});


router.post("/add", user__auth, async (req, res) => {
  try {
    const { product, cartID, amount } = req.body;
    let sum = 0;

    const ifExist = await shoppingCartProduct.findOne({ product, cartID });
    if (ifExist) {
      await shoppingCartProduct.updateOne(
        { product, cartID },
        { amount: Number(ifExist.amount) + Number(amount) }
      );
      const all_products_in_cart = await shoppingCartProduct
        .find({ cartID })
        .populate({
          path: "product",
        });

      for (let i = 0; i < all_products_in_cart.length; i++) {
        sum +=
          all_products_in_cart[i].product.price *
          all_products_in_cart[i].amount;
      }
      return res.json({ all_products_in_cart, sum });
    }

    const added_product = new shoppingCartProduct({
      product,
      cartID,
      amount,
    });
    await added_product.save();
    const all_products_in_cart = await shoppingCartProduct
      .find({ cartID })
      .populate({
        path: "product",
      });

    for (let i = 0; i < all_products_in_cart.length; i++) {
      sum +=
        all_products_in_cart[i].product.price * all_products_in_cart[i].amount;
    }
    return res.json({ all_products_in_cart, sum });
  } catch (error) {
    console.log(error);
  }
});


router.delete("/remove/:product",user__auth, async (req, res) => {
  try {
    const {product} = req.params;
     await shoppingCartProduct.deleteOne({
      product,
    });
    const cart = await shoppingCart_Model.findOne();

    let sum = 0;
    const cartProducts = await shoppingCartProduct.find().populate({
      path: "product",
    });

    for (let i = 0; i < cartProducts.length; i++) {
      sum += cartProducts[i].product.price * cartProducts[i].amount;
    }

    const remain_of_cart = {cart, cartProducts, sum };

    res.json(remain_of_cart);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/remove-all/:cartID", user__auth, async (req, res) => {
  try {
    const { cartID } = req.params;
    let cleared_cart = await shoppingCartProduct.deleteMany({ cartID: cartID });
    res.json(cleared_cart);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
