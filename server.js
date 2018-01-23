const express     = require('express');        // call express
const app         = express();                 // define our app using express
const bodyParser  = require('body-parser');
const dotenv      = require('dotenv').config();
const mongoose    = require('mongoose'); 
const Notebook    = require('./Notebook.js');   

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8000;
const router = express.Router();

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds111608.mlab.com:11608/notebook-search`;
mongoose.Promise = global.Promise;
mongoose.connect(uri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  
  router.get('/notebooks', function(req, res) {
    let query = new Object();
    // let queryProcessor = req.query.processor;
    // let queryRam = req.query.ram;
    // let storage = req.query.storage;
    // let price = req.query.price;

    if (req.query.processor) {
      query["details.processor"] = req.query.processor;
    }

    console.log(query)

    Notebook.find(query, function(err, docs){
      res.json(docs);
    });

  });

})

app.use('/api', router);
app.listen(port);

console.log(`Eggman serve on port ${port}`);