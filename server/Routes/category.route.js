const router=require('express').Router()
const {Category_Model}=require('../Models/category.model')

router.get('/',async (req, res)=>{
    try {
        const Fetch_All_Categories=await Category_Model.find().populate({
            path:'category'
        })
        res.status(200).json({Fetch_All_Categories})
    } catch (error) {
        console.log(error)
    }
})


router.get('/:id', async (req, res)=>{
    try {
        const {id}=req.params
        const fetchProductsByCategory= await Category_Model.find({_id:id})
        res.status(200).json({fetchProductsByCategory})
    } catch (error) {
        console.log({error})
    }
 })


module.exports=router