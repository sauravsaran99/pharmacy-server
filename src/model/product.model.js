
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    img_src: {type: String, required: true},
    name: {type: String, required: true},
    discounted_price: {type: String, required: false},
    MRP: {type: String, required: false},
    discount: {type: String, required: false},
    dlt: {type: String, required: false},
    category: {type: String, required: true},

},
{timestamps: true}
);

const Product = mongoose.model('product', productSchema);

module.exports = Product;
