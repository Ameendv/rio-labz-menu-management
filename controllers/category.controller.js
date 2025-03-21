const express = require('express')
const router = express.Router()
const { createCategory } = require('../services/category.service');
const authUser = require('../middlewares/authUser');
const authorize = require('../middlewares/authorize');

router.post('/', authUser, authorize('category', 'edit'), async (req, res, next) => {
    try {
        const { category, parent_category_id, } = req.body
        const response = await createCategory({ category, parent_category_id });
        res.status(200).json({ success: true, body: response.body, message: response.message });
    } catch (error) {
        next(error)
    }
}
);


module.exports = router;