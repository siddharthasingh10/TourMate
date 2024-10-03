//_____________________________-CREATE A CLASS (START) ________________________________

class APIfeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    //_______________________________________FILTER_____________________________________________________
    filter() {
      // filtering
      const queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryObj[el]);
  
      // advanced filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    //_________________________________SORTING_____________________________________
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' '); // url can have ?sort=price,id means if tie in price then sort by id
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
  
    //_____________________________FIELDLIMITING_____________________________
    limitFields() {
      // FIELD LIMITING  kon kon se data chahiye show ke time
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields); // including only the property mentioned in url
      } else {
        this.query = this.query.select('-__v'); // excluding __v property
      }
      return this;
    }
  
    //______________________________________PAGINATION___________________________________________
    pagination() {
      // pagination
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this; // we are returning cause we have applied other methods also so return this to make sure that method are applied to data return by others method
    }
  }
  //_____________________________-END OF CLASS_______________________________________________
  
  module.exports = APIfeatures;
  