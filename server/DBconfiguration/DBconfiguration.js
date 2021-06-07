const mongoose=require('mongoose')
const PROJECT ="shop"

const connect_mongodb=async ()=>{
    try {
        
        await mongoose.connect(`mongodb://localhost/${PROJECT}`,{
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
         useCreateIndex: true,
     });
     console.log(`Connected to mongo. Project: ${PROJECT}`)
    } catch (error) {
        console.log('Couldn`t connect to MongoDB', error)
    }
}

module.exports=connect_mongodb