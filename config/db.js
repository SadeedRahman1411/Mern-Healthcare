const mongoose =require('mongoose')
const colors = require('colors')

const connectDB = async() =>{
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen,colors.white)

  }catch (error){
    console.log(`Mongodb Server Issue ${error}`.gWhite)
  }
  };

module.exports = connectDB;