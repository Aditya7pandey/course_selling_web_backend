const express = require('express');
const router = express.Router();
const userMiddleware = require('../middlewares/user.middleware')
const adminMiddleware = require('../middlewares/admin.middleware');
const purchaseController = require('../controllers/purchase.controller')

router.post('/create/:courseId',userMiddleware,purchaseController.create)

router.get('/user/all-purchase',userMiddleware,purchaseController.userAllPurchases);

router.get('/admin/all-purchase',adminMiddleware,purchaseController.adminAllPurchases);

router.get('/:courseId',adminMiddleware,purchaseController.particularCoursePurchase);

module.exports = router;