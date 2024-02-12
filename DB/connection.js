const mongoose = require('mongoose')
const connectionString = process.env.connectionString
mongoose.connect(connectionString).then(
    ()=>{
    console.log("mongoDb Atlas Connected with PF Server");
}
).catch((err)=>{
        console.log("MongoDb Connection Failed !!!",err);
    }
)
