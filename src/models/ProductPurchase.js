const mongoose = require('mongoose');

const productPurchaseSchema = new mongoose.Schema({
    quantity: Number,
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    purchase:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase'
    }
});

module.exports = mongoose.model('ProductPurchase', productPurchaseSchema);