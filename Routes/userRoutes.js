const express=require('express')
const router=express.Router()



const {getUserSignup,getUserSignin,getAllUsers,DeleteUser,getAUser,UpdateUser}=require('../Controllers/userCtrl')



router.post('/sign-up',getUserSignup)

router.post('/sign-in',getUserSignin)

router.get('/all-users',getAllUsers)

router.post('/delete-user',DeleteUser)

router.post('/update-user',UpdateUser)

router.post('/getuser',getAUser)



module.exports=router