const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require("./controllers/TestControllers/SessionController");
const SpotController = require("./controllers/TestControllers/SpotController");
const DashboardController = require("./controllers/DashboardController");
const BookingController = require("./controllers/TestControllers/BookingController");
const ApprovalController = require("./controllers/TestControllers/ApprovalController");
const RejectionController = require("./controllers/TestControllers/RejectionController");

const OwnerController = require("./controllers/OwnerController");
const ClientController = require("./controllers/ClientController");
const ClientAddressController = require("./controllers/ClientAddressController");
const MarketController = require("./controllers/MarketController");
const ProductController = require("./controllers/ProductController");
const ProductPurchaseController = require("./controllers/ProductPurchaseController");
const PurchaseDashboardController = require("./controllers/PurchaseDashboardController");
const CreditCardController = require("./controllers/CreditCardController");

const OwnerSessionController = require("./controllers/SessionControllers/OwnerSessionController");
const OwnerDashboardController = require("./controllers/OwnerDashboardController");

const ClientSessionController = require("./controllers/SessionControllers/ClientSessionController");

const PaymentController = require("./controllers/PaymentController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/dashboard', DashboardController.show);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store );
routes.post('/bookings/:booking_id/rejections', RejectionController.store );

routes.post('/client_add', ClientController.store);
routes.get('/client_show', ClientController.store);

routes.post('/client_add_address', ClientAddressController.store);
routes.delete('/client_delete_address', ClientAddressController.destroy);
routes.get('/client_index_address', ClientAddressController.index);
routes.get('/client_show_address', ClientAddressController.show);


routes.post('/client_session', ClientSessionController.show);

routes.post('/owner_add', OwnerController.store);
routes.get('/owner', OwnerController.show);
routes.get('/owner_index', OwnerController.index);

routes.post('/owner_session', OwnerSessionController.show);
routes.get('/owner_dashboard', OwnerDashboardController.show);
routes.post('/owner_update', OwnerController.update);

routes.post('/market_add', upload.single('thumbnail'), MarketController.store);
routes.get('/markets', MarketController.index);
routes.post('/market_update', MarketController.update);

routes.post('/product_add', upload.single('thumbnail'), ProductController.store);
routes.get('/products', ProductController.index);
routes.post('/product_update',upload.single('thumbnail'), ProductController.update);
routes.get('/product', ProductController.show);

routes.post('/purchase_add', PurchaseDashboardController.store);
routes.get('/purchases', PurchaseDashboardController.index);
routes.get('/purchase', PurchaseDashboardController.show);

routes.post('/product_add_purchase', ProductPurchaseController.store);
routes.get('/product_purchase_index', ProductPurchaseController.index);
routes.post('/product_purchase_update', ProductPurchaseController.update);
routes.delete('/product_purchase_delete', ProductPurchaseController.destroy);

routes.post('/creditcard_add', CreditCardController.store);
routes.get('/creditcard_index', CreditCardController.index);

routes.post('/client_add', ClientController.store);

routes.get('/checkout/:id/:email/:description/:amount', PaymentController.checkout);

module.exports = routes;