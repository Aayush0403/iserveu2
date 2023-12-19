const express=require('express')
const userModel=require('../Models/userSchema')
const {hashPassword,comparePasswords,validation}=require('../Utils')


//logic for inserting a newuser
const getUserSignup=async(req,res)=>{
    try{
            //checking if user is existing
            const exisitingUser = await userModel.findOne({ mobile: req.body.mobile });
            if (exisitingUser) {
                return res
                .status(400)
                .send({ message: "User Already Exist", success: false })
            }
            //comparing password with confirm password
            req.body.password=hashPassword(req.body.password)
            req.body.confirm_password=hashPassword( req.body.confirm_password)
            if(!comparePasswords(req.body.password,req.body.confirm_password))
            {
                return res
                .status(400)
                .send({ message: "confirm password didnot match", success: false })
            }
            //checking the address length
            if(req.body.address.length>40)
            {
                return res
                .status(400)
                .send({ message: "address length cannot be greater than 40", success: false })
            }
            //validating the age
            if(!validation(req.body.dob))
            {
                return res
                .status(400)
                .send({ message: "cannot proceed becoz age <18 or invalid birthdate", success: false })
            }
            const newUser = new userModel(req.body);
            await newUser.save();
            res.status(200).send({ message: "User Register Sucessfully", success: true })

    }
    catch(err){
            res.send(err)
    }
}




//logic for signing-in for the user
const getUserSignin=async(req,res)=>{
    try{
        //verifying on the basis of mobile.no and password
        req.body.password=hashPassword(req.body.password)
        const LoginUser=await userModel.findOne({mobile:req.body.mobile,password:req.body.password})
        if(!LoginUser){
            return res
            .status(400)
            .send({message:"No such user found(Mobile or password doesnot match)",success:false})
        }
        res.status(200).send({message:"Signin Successfully, user found" ,success:true})

    }
    catch(err){
        res.send(err)
    }
}




//logic for getting all the users
const getAllUsers=async(req,res)=>{
    try{
        const users = await userModel.find({})
        res.status(200).send({
        success: true,
        message: "users data list",
        data: users,
        });

    }
    catch(err){
        res.send(err)
    }
}




//logic for getting a single user based on mobileno.
const getAUser=async(req,res)=>{
    try{
        const user=await userModel.findOne({mobile:req.body.mobile})
        if(!user){
            return res
            .status(400)
            .send({message:"No such mobile no. found",success:false})
        }
        res.status(200).send({data:user,message:"userfound" ,success:true})
    }
    catch(err){
        res.send(err)
    }
}




//logic for deleting a user based on mobileno.
const DeleteUser=async(req,res)=>{
    try{
        const deleteuser=await userModel.findOneAndDelete({mobile:req.body.mobile})
        if(!deleteuser){
            return res
            .status(400)
            .send({message:"No such mobile no. found",success:false})
        }
        const newlist=await userModel.find({})

        res.status(200).send({message:"user deleted successfully",data:newlist ,success:true})
    }
    catch(err){
        res.send(err)
    }
}




//logic for updating a user based on mobileno.
const UpdateUser=async(req,res)=>{
    try{

        const updateuser=await userModel.findOne({mobile:req.body.mobile})
        if(!updateuser){
            return res
            .status(400)
            .send({message:"No such mobile no. found",success:false})
        }
        // checking the address length
        if(req.body.address.length>40){
                return res
                .status(400)
                .send({ message: "address length cannot be greater than 40", success: false })
        }
        //validating the age condition
        if(!validation(req.body.dob))
        {
            return res
            .status(400)
            .send({ message: "cannot proceed becoz age <18 or birthdate is invalid", success: false })
        }
        //comparing the password with confirm password
        req.body.password=hashPassword(req.body.password)
        req.body.confirm_password=hashPassword( req.body.confirm_password)
        if(!comparePasswords(req.body.password,req.body.confirm_password))
        {
            return res
            .status(400)
            .send({ message: "confirm password didnot match", success: false })
        }
            await userModel.findOneAndUpdate({mobile:req.body.mobile},
            {
             firstname:req.body.firstname,
             email:req.body.email,
             lastname:req.body.lastname,
             middlename:req.body.middlename,
             dob:req.body.dob,
             state:req.body.state ,
             city:req.body.city,
             pincode:req.body.pincode,
             address:req.body.address,
             aadhar:req.body.aadhar,
             password:req.body.password,
             confirm_password:req.body.confirm_password
            })
        
        res.status(200).send({message:"user updated successfully",data:updateuser,success:true})
    }
    catch(err){
        res.send(err)
    }
}



module.exports={getUserSignup,getUserSignin,getAUser,getAllUsers,DeleteUser,UpdateUser}