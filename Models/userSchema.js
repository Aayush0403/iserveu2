const mongoose=require('mongoose')

const userschema=new mongoose.Schema({

email:{
    type:String
},

dob:{
    type:String,
    required:[true,'dob is required']
},

mobile:{
    type:Number,
    required:[true,'mobile is required']
},

firstname:{
    type:String,
    required:[true,'firstname is required']
},

middlename:{
    type:String
},

lastname:{
    type:String,
    required:[true,'lastname is required']
},

aadhar:{
    type:Number,
    required:[true,'aadhar is required']
},

password:{
    type:String,
    required:[true,'password is required']
},

confirm_password:{
    type:String,
    required:[true,'password is required']
},

address:{
    type:String,
    required:[true,'address is required']
},

state:{
    type:String,
    required:[true,'state is required']
},

city:{
    type:String,
    required:[true,'city is required']
},

pincode:{
    type:Number,
    required:[true,'pincode is required']
}

})

const userModel = mongoose.model("onboard_user_details", userschema);

module.exports = userModel;