const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;



//notess
//  object. assign is uesd to merge two object into one

// console.log(req.body); // whatever the content is sent from the postman as a body
//   /:x?    x and id both are varible to store parameter but x is optional means if it is not define in url no error

// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

// upar har operation ke liye route likha pd rha tha so for a particular route and uspe konsa operation krna
//hai usko ek line me v likh skte h as below shown for a particular route if get(fn-name) if post v usi pe
//lagana h to .post(fn-name)
