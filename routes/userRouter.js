const express=require('express');
const userController=require('./../controllers/userController');
// all the methods are the part of tourcontrolller object so use dot notation

const authController=require('./../controllers/authController')

// create  routers for user and tours
const router=express.Router();


  router
     .route('/')
     .get(userController.getAllUsers)
     .post(userController.createUser);

  router
     .route('/:id')
     .get(userController.getUser)
     .patch(userController.updateUser)
    .delete(userController.deleteUser)


     module.exports=router;