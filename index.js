const express=require('express')
const dotenv=require('dotenv')
const connectDB=require('./Config/db')
require('colors')

dotenv.config()
const app=express()

connectDB()
app.use(express.json())

app.use('/api/v1/user',require('./Routes/userRoutes'))


const port= process.env.PORT || 6000


app.listen(port,()=>{
    console.log(`server startred at ${port}`.bgCyan)
})
