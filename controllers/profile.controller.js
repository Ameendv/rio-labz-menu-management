const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getUserProfiles } = require('../services/profile.service');
const authUser = require('../middlewares/authUser');
const authorize = require('../middlewares/authorize');

//user can edit their profile
router.get('/:user_id', authUser, async(req, res, next) => {
    try {
        const response = await getProfile(req.params.user_id);
        res.status(200).json({ success: true, body: response.body, message: "Menu fetched successfully" });
    } catch (error) {
        next(error)
    }
}
);

//only admin can view all users profile
router.get('/', authUser, authorize('user-profile', 'view'), async(req, res, next) => {
    try {
        const response = await getUserProfiles(req.params.user_id);
        res.status(200).json({ success: true, body: response.body, message: "Menu fetched successfully" });
    } catch (error) {
        next(error)
    }
}
);

//user can update their profile
router.put('/:user_id', authUser, async(req, res, next) => {
    try {
        const response = await updateProfile(req.params.user_id, req.body);
        res.status(200).json({ success: true, body: response.body, message: response.message });
    } catch (error) {
        next(error)
    }
}
);

module.exports = router;