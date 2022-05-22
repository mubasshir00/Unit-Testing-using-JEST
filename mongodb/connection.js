const mongoose = require('mongoose');
async function connect(){
   try {
 await mongoose.connect(
   "mongodb+srv://mubasshir:mubasshir@cluster0.fctkf.mongodb.net/?retryWrites=true&w=majority",
   {
       useNewUrlParser : true
   }
 );
 console.log('connected');
   }
   catch(err){
       console.error("error connecting to mongodb");
       console.error(err)
   }
}

module.exports = {
    connect
}