const router = require("express").Router();
const user__auth = require("../AuthJWT/JwtAuth");
const admin__auth = require("../AuthJWT/AdminJwtAuth");
const {Product_Model} = require("../Models/product.model");
const shoppingCart = require("../Models/shoppingCart.model");

router.get("/", async (req, res) => {
  try {
    const fetchProducts = await Product_Model.find().populate({
      path: "category",
    });
    res.status(200).json({ fetchProducts, numberOfProducts: fetchProducts.length });
  } catch (error) {
    console.log({ error });
  }
});

router.get("/category/:id", user__auth, async (req, res) => {
  try {
    const { id } = req.params;
    const fetch_all_products_by_category = await Product_Model.find({
      category: id,
    }).populate({
      path: "category",
    });
    res.status(200).send({ fetch_all_products_by_category });
  } catch (error) {
    console.log({ error });
  }
});

router.get("/shopping-cart/:_id", user__auth, async (req, res) => {
  try {
    const { _id } = req.params;
    const fetchShoppingCart = await shoppingCart
      .find({
        _id: _id,
      })
      .populate({
        path: "product",
      });
    res.status(200).send(fetchShoppingCart);
  } catch (error) {
    console.log(error);
  }
});


router.put("/edit/:_id", admin__auth, async (req, res) => {
  try {
    const {_id}=req.params
    const {name, category, price, photo_url } = req.body;
   await Product_Model.findOneAndUpdate(
     {_id},
      { name, category, price, photo_url }
    ).populate({
      path:'category'
    })
    const fetchAllProdcuts= await Product_Model.find().populate({
      path: "category",
    });
    res.json( fetchAllProdcuts );
  } catch (error) {
    console.log({ error });
  }
});

router.post('/new-product', admin__auth, async (req, res)=>{
try {
  const { name, category, price, photo_url } = req.body;
  if ( !name || !category || !price || !photo_url) return res.status(500).json({
    err:true, msg:'Must fill all fields.'
  })
  const newProduct=await Product_Model.create({
     name, category, price, photo_url
  })
  res.json({newProduct})
} catch (error) {
  console.log({ error });
}
})


module.exports = router;
