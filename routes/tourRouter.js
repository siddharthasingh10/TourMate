const express=require('express');
const fs = require('fs');
const tourController=require('./../controllers/tourController')





  const router=express.Router();
//aliasing means some meaningful url inputs handling
router.route('/top-5-cheap').get(tourController.aliasTopTours,tourController.getAllTours);

//aggregation pipeline 
router.route('/tour-stats').get(tourController.getTourStats);
 router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);


router
   .route('/')                                  //only slash means /api/v1/tours becasuse tourRouter is only define for/api/v1/tour
   .get(tourController.getAllTours)                            // so only aage ka url parameter ke liye define krna hai sb 
   .post(tourController.createTour);
 
router
  .route('/:id')
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)
  .get(tourController.getTour);

  
  module.exports=router;