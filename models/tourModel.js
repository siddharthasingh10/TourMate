const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have duration"]
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have group size"]
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have difficulty"],
      enum: ['easy', 'medium', 'hard']
    },
    ratingsAverage: {
      type: Number,
      default: 3.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have some price'],
      default: 5000
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price; // price discount should be less than the actual price
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
    summary: {
      type: String,
      trim: true, // used to remove all the spaces before and after any string eg "    sidd   "
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Creating virtual property
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
  // duration is part of db and durationWeeks is not but we added as virtual prop
});

// Mongoose middleware
// 1) Document middleware, it runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// 2) Query middleware
tourSchema.pre(/^find/, function (next) { // this will run for all queries starting with find
  this.find({ secretTour: { $ne: true } }); // will exclude secret tours from results
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // console.log(docs)
  next();
});

// 3) Aggregation middleware
tourSchema.pre('aggregate', function (next) {
  // remove secret tours from results
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
