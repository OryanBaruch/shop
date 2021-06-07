const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: String,
  },
  { versionKey: false }
);

const Category_Model = model('category', categorySchema);

const initCategories=async ()=>{
  const Laptops=new Category_Model({
    name:'Laptops'
  })

  await Laptops.save()

  const Pcs=new Category_Model({
    name:`Pc's`
  })

  await Pcs.save()

  const Smartphones=new Category_Model({
    name:'Smartphones'
  })

  await Smartphones.save()

  const Headphones=new Category_Model({
    name:'Headphones'
  })

  await Headphones.save()

  const Tellevisions=new Category_Model({
    name:'Tellevisions'
  })

  await Tellevisions.save()

}

module.exports = {Category_Model, initCategories}

