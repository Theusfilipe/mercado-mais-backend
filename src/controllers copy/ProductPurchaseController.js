const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductPurchase = require('../models/ProductPurchase');
const ObjectID = require('mongodb').ObjectID;   

module.exports = {

    async index(req, res){
        const { purchase_id } = req.query;

        const productsPurchases = await ProductPurchase.find({ purchase: purchase_id});

        return res.json(productsPurchases);
    },

    async store (req, res){
        //const { filename } = req.file;
        const { purchase_id } = req.headers;
        const { product_id } = req.headers;
        const { quantity } = req.body;
        //console.log(owner_id);
        const product = await Product.findById(product_id);
        const purchase = await Purchase.findById(purchase_id);
        
        if(!product){
            return res.status(400).json({error: 'Product doesnt exist'});

        }

        if(!purchase){
            return res.status(400).json({error: 'Purchase doesnt exist'});

        }

        const productPurchase = await ProductPurchase.create({
            product:product_id,
            purchase:purchase_id,
            quantity: quantity
            

        });

        //update the total value in purchase

        console.log("Before update:"+ purchase.total);
        purchase.total = purchase.total + (product.price * quantity);
        await purchase.save();
        console.log("After:"+purchase.total);

        return res.json(productPurchase);
    },

    async destroy(req, res){
        const { purchase_id, product_id } = req.headers;
        console.log(purchase_id+" "+ product_id);
        const product = await Product.findById(new ObjectID(product_id));
        
        const purchase = await Purchase.findById(new ObjectID(purchase_id));

        const productPurchase = await ProductPurchase.findOneAndDelete({ purchase: purchase_id, product:product_id});

        

        purchase.total = purchase.total - (product.price * productPurchase.quantity);
        await purchase.save();
        

        

        return res.json(productPurchase);


    },

    async update(req, res){
        const { pp } = req.headers;
        const { quantity } = req.body;

        console.log(quantity+" "+ pp);
        const productPurchaseInstance = await ProductPurchase.findById(pp);

        const product = await Product.findById(productPurchaseInstance.product);

        const oldQuantity = productPurchaseInstance.quantity;
        productPurchaseInstance.quantity = quantity;
        await productPurchaseInstance.save();

        const purchase = await Purchase.findById(productPurchaseInstance.purchase);
        console.log("Before update:" + purchase.total);
        
        
        purchase.total = purchase.total - (product.price * oldQuantity) + (product.price*quantity);
        
        await purchase.save();
        console.log("After:"+purchase.total);
        return res.json(productPurchaseInstance);


    }


    
};