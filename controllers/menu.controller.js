const express = require('express');
const { createMenu, getMenu, updateMenu } = require('../services/menu.service');
const authUser = require('../middlewares/authUser');
const authorize = require('../middlewares/authorize');
const router = express.Router();

//only admin can add/edit menu
router.post('/', authUser, authorize('menu', 'edit'), async (req, res, next) => {
    try {
        const { category_id, food_name, price, description } = req.body
        const response = await createMenu({ category_id, food_name, price, description });
        res.status(200).json({ success: true, body: response.body, message: response.message });
    } catch (error) {
        next(error)
    }
}
);

router.get('/', authUser, async (req, res, next) => {
    try {
        const response = await getMenu();
        res.status(200).json({ success: true, body:response.body, message: "Menu fetched successfully" });
    } catch (error) {
        next(error)
    }
}
);

//only admin can update menu
router.put('/:menu_id', authUser, authorize('menu', 'edit'), async (req, res, next) => {
    try {

        const response = await updateMenu(req.params.menu_id, req.body);
        res.status(200).json({ success: true, body: response.body, message: response.message });
    } catch (error) {
        next(error)
    }
})

module.exports = router;