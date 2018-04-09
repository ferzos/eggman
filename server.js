const express     = require('express');        // call express
const app         = express();                 // define our app using express
const bodyParser  = require('body-parser');
const dotenv      = require('dotenv').config();
const mongoose    = require('mongoose'); 
const Notebook    = require('./Notebook.js');   

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const router = express.Router();

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds111608.mlab.com:11608/notebook-search`;
mongoose.Promise = global.Promise;
mongoose.connect(uri);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  
  router.get('/ping', function(req,res) {
    res.json('pong');
  });

  router.get('/notebooks', function(req, res) {
    let query = new Object();
    
    if (req.query.processor) {
      query["details.processor"] = req.query.processor;
    }

    if (req.query.ram) {
      query["details.ram"] = req.query.ram;
    }

    if (req.query.storage) {
      query["details.storage"] = req.query.storage;
    }

    if (req.query.vga) {
      query["details.vga"] = req.query.vga;
    }

    if (req.query.ssd) {
      query["details.ssd"] = true;
    }

    if (req.query.brand) {
      query["brand"] = req.query.brand;
    }

    if (req.query.maxPrice) {
      query["price"] = {$lte: parseInt(req.query.maxPrice)}
    }

    Notebook.find(query, function(err, docs){
      res.json(docs);
    });
  });

  router.get('/brand', function(req, res) {
    Notebook.find().distinct('brand', function(error, brands) {
      res.json(brands);
    });
  });

})

app.use('/api', router);
app.listen(port, () => {});

console.log(`Eggman serve on port ${port}`);