const express = require('express')
const router = express()
const Joi = require('joi');
const validateRequest = require('../middlewares/validateRequest');
const authUser = require('../middlewares/authUser');


const { register, login, allocateRole } = require('../services/user.service');
const authorize = require('../middlewares/authorize');


router.post('/register', userRegisterSchema, async (req, res, next) => {
    try {
        const {  password, email } = req.body
        const response = await register({ password, email });
        res.status(200).json({ success: true, body: response.body, message: response.message });
    } catch (error) { 
        next(error)
    }
});

router.post('/login', userLoginSchema, async (req, res, next) => {
    try {
        const { password, email } = req.body
        const response = await login({  password, email });
        res.status(200).json({ success: true, body: response.body, message: response.message });
    } catch (error) {
        next(error)
    }
});

//only admin can allocate role to a user
router.put('/allocate-role', authUser, authorize('role-allocate', 'edit'), async (req, res, next) => {
    try {
        const { role_id, user_id } = req.body
        const response = await allocateRole({ role_id, user_id });
        res.status(200).json({ success: true, body: response.body, message: response.message });
    } catch (error) {
        next(error)
    }
});



function userLoginSchema(req, res, next) {
    const schema = Joi.object({
        
        email: Joi.string().email().required(),
        password: Joi.string().trim().min(1).required(),
        
    })
    validateRequest(req, next, schema);
}


  function userRegisterSchema(req, res, next) {
    const schema = Joi.object({
        
        email: Joi.string().email().required(),
        password: Joi.string().trim().min(1).required(),
        
    })
    validateRequest(req, next, schema);
}



  


module.exports = router