const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds111608.mlab.com:11608/notebook-search`;
mongoose.Promise = global.Promise;
mongoose.connect(uri);

const NotebookSchema = new Schema({
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

//Export model
module.exports = mongoose.model('Notebook', NotebookSchema, 'notebook');