const express=require('express')
const crypto=require('crypto')
const moment=require('moment')

// function used for password hashing
const hashPassword=(password)=> {
    const sha256 = crypto.createHash('sha256');
    sha256.update(password, 'utf-8');
    return sha256.digest('hex');
}


//function used to compare password with confirmed password
const comparePasswords=(originalPassword, confirmPassword)=> {
    const hashedOriginalPassword = hashPassword(originalPassword);
    const hashedConfirmPassword = hashPassword(confirmPassword);
    return hashedOriginalPassword === hashedConfirmPassword;
}


//function used for validation of age
const validation=(dob)=>{

    const birthDate = moment(dob, 'DD/MM/YYYY', true);

    if (!birthDate.isValid()) {
        return false;
    } 

    const currentDate = moment();
    const age = currentDate.diff(birthDate, 'years');
    
    if (age >= 18) {
        return true;}
    else {
        return false;}
           
}


module.exports={hashPassword ,comparePasswords,validation}