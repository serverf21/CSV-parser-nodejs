var mongoose = require('mongoose');
var schema = mongoose.Schema;

var productSchema = new schema({
    name: { type: String, Required: 'Product name cannot be left blank.' },
    price: { type: String, Required: 'Product price cannot be left blank.' },
    category: { type: String, Required: 'Product category cannot be left blank' },
    description: { type: String },
    manufacturer: { type: String }
});

module.exports = mongoose.model('Products', productSchema);