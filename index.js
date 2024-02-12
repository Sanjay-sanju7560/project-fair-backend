// Loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/routes')
require('./DB/connection')


const pfServer = express()
pfServer.use(cors())

pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))


const PORT = 3000
pfServer.listen(PORT,()=>{
    console.log(`Project Fair server started at port :${PORT}`);
})
pfServer.get('/',(req,res)=>{
    res.status(200).send("<h1 style=color:red; >Project Fair sever started !! Waiting for client request.. </h1>")
} )