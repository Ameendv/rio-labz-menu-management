const User = require('../models/user.model.js')
const Role = require('../models/roles.model.js')
const bcrypt = require('bcrypt')
const CustomError = require('../utils/customError.js')
const jwt = require('jsonwebtoken')
const Permission = require('../models/permissions.model.js')
const RolePermission = require('../models/role_permission.model.js')





const register = async (userData) => {
    console.log(userData)

    const { email, password } = userData;

    const userExists = await User.findOne({ email })
    // console.log(userExists)

    if (userExists) throw new CustomError(`User with email exists`, 400)


    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT))
    const user_role_id = await Role.findOne({ role: 'user' })

    const newUser = await User.create({ email, password: hashPassword, role: user_role_id._id })


    return { body: { email: newUser.email }, message: `Registered successfully` }
}





const login = async (userData) => {
    const { email, password } = userData

    const userExists = await User.findOne({ email })

    if (!userExists) throw new CustomError(`No user found`, 400)

    const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

    if (!isPasswordCorrect) {
        throw new CustomError('Incorrect password', 400);
    }

    const accessToken = jwt.sign(
        { id: userExists.id, /* role: userExists.role */ },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        message: 'Login successful',
        body: {
            id: userExists.id,
            email: userExists.email,
            role: userExists.role_id,
            accessToken,
        },
    };

}

const allocateRole = async (roleData) => {
    const { role_id, user_id } = roleData
    const userExists = await User
        .findById(user_id)

    if (!userExists) throw new CustomError(`User not found`, 404)

    userExists.role = role_id
    await userExists.save()
    return { body: {}, message: 'Allocated successfully' }

}

module.exports = { register, login, allocateRole }