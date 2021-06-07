const express=require('express')
const cors=require('cors')
const port=4500
const connect_mongodb=require('./DBconfiguration/DBconfiguration')

const {initProducts}=require('./Models/product.model')
const {initUsers}=require('./Models/user.model')
const {initCategories}=require('./Models/category.model')

connect_mongodb()
const app=express()
app.use(express.json())
app.use(cors())

const initDB= async ()=>{
await initCategories()
await initProducts()
await initUsers()
}

// initDB()

app.use('/products', require('./Routes/products.route'))
app.use('/category', require('./Routes/category.route'))
app.use('/cart', require('./Routes/shoppingCart.route'))
app.use('/users', require('./AuthJWT/login_register'))
app.use('/order', require('./Routes/order.route'))

app.listen(port, ()=>console.log(`Go on ${port}, Enjoy.`))