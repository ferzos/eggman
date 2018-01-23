const mongoose = require('mongoose');    
const dotenv = require('dotenv').config();

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds111608.mlab.com:11608/notebook-search`;
mongoose.Promise = global.Promise;
mongoose.connect(uri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

  // Create song schema
  const notebookSchema = mongoose.Schema({
    name: String,
    details: {
      details: String,
      processor: String,
      ram: String,
      storage: String
    },
    brand: String,
    price: String
  });

  // Store song documents in a collection called "songs"
  const Notebook = mongoose.model('notebook', notebookSchema);

  Notebook.find().exec(function (err, docs){
    console.log(docs);
  })

  /*
   * Then we need to give Boyz II Men credit for their contribution
   * to the hit "One Sweet Day".
   */
  // Song.update({ song: 'One Sweet Day'}, { $set: { artist: 'Mariah Carey ft. Boyz II Men'} }, 
  //   function (err, numberAffected, raw) {

  //     if (err) return handleError(err);

  //     /*
  //      * Finally we run a query which returns all the hits that spend 10 or
  //      * more weeks at number 1.
  //      */
  //     Song.find({ weeksAtOne: { $gte: 10} }).sort({ decade: 1}).exec(function (err, docs){

  //       if(err) throw err;

  //       docs.forEach(function (doc) {
  //         console.log(
  //           'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] + 
  //           ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
  //         );
  //       });

  //       // Since this is an example, we'll clean up after ourselves.
  //       mongoose.connection.db.collection('songs').drop(function (err) {
  //         if(err) throw err;

  //         // Only close the connection when your app is terminating
  //         mongoose.connection.db.close(function (err) {
  //           if(err) throw err;
  //         });
  //       });
  //     });
  //   }
  // )
});