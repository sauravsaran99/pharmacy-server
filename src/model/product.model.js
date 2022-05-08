
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    img_src: {type: String, required: true},
    name: {type: String, required: true},
    discounted_price: {type: String, required: false},
    MRP: {type: String, required: false},
    discount: {type: String, required: false},
    dlt: {type: String, required: false},
},
{timestamps: true}
);

const Product = mongoose.model('product', productSchema);

module.exports = Product;



// "img_src": "https://cdn01.pharmeasy.in/dam/products_otc/031531/calcimax-500-health-supplement-tablets-500-mg-of-calcium-box-of-30-2-1643884360.jpg",
//    "name": "Calcimax 500 Health Supplement Tablets (500 Mg Of Calcium) Box Of 30",
//    "discounted_price": "₹304.00",
//    "MRP": "₹380.00",
//    "discount": "20% OFF"