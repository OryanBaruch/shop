const { Schema, model } = require("mongoose");
const { Category_Model } = require("./category.model");

const productSchema = new Schema(
  {
    name: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    price: Number,
    photo_url: String,
  },
  { versionKey: false }
);

const Product_Model = model("product", productSchema);



const initProducts=async()=>{
  
  const findLaptops= await Category_Model.findOne({name:'Laptops'})
  const findSmartphones=await Category_Model.findOne({name:`Smartphones`})
  const findHeadphones=await Category_Model.findOne({name:`Headphones`})
  const findTv=await Category_Model.findOne({name:`Tellevisions`})
  const findPc=await Category_Model.findOne({name:`Pc's`})

  const MackbookPro=new Product_Model({
    name:'Mackbook Pro',
    category:findLaptops._id,
    price:9000,
    photo_url:'https://cdn.shopify.com/s/files/1/2067/1581/products/Black-Stone-MacBook-Pro-2019-Top-02_optimized_-_Copy_2_dafa3b6e-5c2c-402c-9bd3-4dbc0a7099a4_2000x.jpg?v=1578263215'
  })

  await MackbookPro.save()

  const MackbookProWhite=new Product_Model({
    name:'Mackbook Pro White',
    category:findLaptops._id,
    price:11000,
    photo_url:'https://www.mac-skins.at/wp-content/uploads/2016/09/1.jpg'
  })

  await MackbookProWhite.save()

  const MackbookAir=new Product_Model({
    name:'Mackbook Air',
    category:findLaptops._id,
    price:8000,
    photo_url:'https://www.payngo.co.il/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/g/r/gray1.jpg'
  })

  await MackbookAir.save()

  const Gamers=new Product_Model({
    name:'Gamers PC',
    category:findPc._id,
    price:8000,
    photo_url:'https://img1.gratispng.com/20180619/gjy/kisspng-megaport-pc-gamer-amd-fx-6100-gaming-computer-desk-spec-5b28e48c63b416.3401801315294066044084.jpg'
  })

  await Gamers.save()

  const asus=new Product_Model({
    name:'Asus PC',
    category:findPc._id,
    price:9200,
    photo_url:'https://i.pinimg.com/originals/b0/f5/8b/b0f58b7b2e389596fe2bb4658067122b.png'
  })

  await asus.save()

  const Iphone=new Product_Model({
    name:'Iphone 12 pro max',
    category:findSmartphones._id,
    price:1500,
    photo_url:'https://shop.ee.co.uk/content/dam/everything-everywhere/images/SHOP/affiliates/apple/iPhone_12_Pro_Max_PacificBlue_800x800.png'
  })

  await Iphone.save()

  const Galaxy=new Product_Model({
    name:'Galaxy',
    category:findSmartphones._id,
    price:1300,
    photo_url:'https://cellcomshop.cellcom.co.il/pub/media/catalog/product/cache/b8e43b67ccbb6ff8f872deb3a434a8cc/_/4/_4_9.png'
  })
  await Galaxy.save()

  const Note=new Product_Model({
    name:'Note 20 Ultra',
    category:findSmartphones._id,
    price:1500,
    photo_url:'https://www.ivory.co.il/files/catalog/org/1607326007g07NA.jpg'
  })

  await Note.save()

  const Airpods=new Product_Model({
    name:'Airpods Pro',
    category:findHeadphones._id,
    price:500,
    photo_url:'https://dlb99j1rm9bvr.cloudfront.net/airpods-pro/parts/angle-1/model/size-1000/bg.png'
  })

  await Airpods.save()

  const Jabra=new Product_Model({
    name:'Jabra Elite 85 Active',
    category:findHeadphones._id,
    price:400,
    photo_url:'https://www.ivory.co.il/files/catalog/org/1593516202i02Ie.jpg'
  })

  await Jabra.save()

  const Boss=new Product_Model({
    name:'Boss',
    category:findHeadphones._id,
    price:750,
    photo_url:'https://www.ivory.co.il/files/catalog/org/1603271634u34Ih.jpg'
  })

  await Boss.save()
  //

  const Samsung=new Product_Model({
    name:'Samsung',
    category:findTv._id,
    price:1750,
    photo_url:'https://images.samsung.com/is/image/samsung/ca-qled-q800t-qn75q800tafxzc-frontblack-219459316?$720_576_PNG$'
  })

  await Samsung.save()

  const Lg=new Product_Model({
    name:'Lg',
    category:findTv._id,
    price:2750,
    photo_url:'https://cdn-files.kimovil.com/default/0004/38/thumb_337319_default_big.png'
  })

  await Lg.save()

  const Toshiba=new Product_Model({
    name:'Toshiba',
    category:findTv._id,
    price:2250,
    photo_url:'https://assets.products-live.ao.com/Images/0cd45718-aab6-439f-8967-28440a73128b/1280x1280/24WD3A63DB_toshiba_ledtv__01.png'
  })

  await Toshiba.save()
//

}

module.exports = {Product_Model, initProducts};
