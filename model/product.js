var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/prodb');
var productSchema =new mongoose.Schema({
    name:String,
    price:Number,
    qty:Number,
});
var productCollection = mongoose.model('products',productSchema);

module.exports.product = productCollection;
module.exports.db = mongoose;