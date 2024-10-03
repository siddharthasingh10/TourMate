const mongoose=require('mongoose')
const dotenv=require('dotenv')
const fs=require('fs')
dotenv.config({path:'./config.env'});
const Tour=require('./../../models/tourModel')

const DB=process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex: true,
  useFindAndModify:false
}).then(()=>{

  console.log('db connection succesfull');
})
// reading the file 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
// importing data into db
const importData= async ()=>{
  try{
     await Tour.create(tours); // create is used to store data or docs in database and save it is shorthand for it 
     console.log('data loaded')
    } catch(err){
      console.log('error ')
    }
    process.exit();
}
// delete all data from collection 

const deleteData= async ()=>{
  try{

await Tour.deleteMany(); // mongoose query to delete all data MOdel.deleteMany()
console.log('data delted ')
}
catch(err){
  console.log('error')
}
process.exit();
}
if(process.argv[2]==='--import'){
  importData();
}
else if(process.argv[2]==='--delete'){
  deleteData();
}
console.log(process.argv);
//notes
//look we want to control the insertion and deltetion with terminal thats why we use process.argv
// when we run node ./dev-data/data/import-data.json then got an array of two data and when we add --import after node and that adress we got three things in the array thats how take advantage of that by writing is proces.argv[2]=='--import to import wala fn chala dena 
// so node ./dev-data/data/import-data.json --import will lead to upload data
// so node ./dev-data/data/import-data.json --delete will lead to delete  data
//