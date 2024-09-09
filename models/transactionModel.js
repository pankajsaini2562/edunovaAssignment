import mongoose from 'mongoose'
const transactionSchema =new mongoose.Schema({
bookId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Book'
},
userId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User'
},
issueDate:Date,
returnDate:Date,
rentAmount:Number,
},{timestamps:true},)
export const Transaction= mongoose.model('Transaction',transactionSchema)