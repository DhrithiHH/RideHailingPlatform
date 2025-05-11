const express = require('express');
const router=express.Router();
const {body}=require('express-validator');
const userController = require('../controllers/user.controller')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First Name should have atleast 3 characters'),
    body('password').isLength({min:6}).withMessage('Password should contain atleast 6 Characters')
],
    userController.registerUser
)


module.exports=router;