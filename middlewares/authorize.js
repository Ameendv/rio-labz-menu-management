const { ObjectId } = require('bson');
const Permission = require('../models/permissions.model');
const Rolepermission = require('../models/role_permission.model');
const User = require('../models/user.model');
const CustomError = require('../utils/customError');

const authorize = (permission_name, access_type) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);




            if (!user) {
                throw new CustomError('User not found', 404);
            }

            const roleId = user.role;

            // Check access for the feature
            const permission = await Permission.findOne({ name: permission_name });
            if (!permission) {
                throw new CustomError('Feature not found', 404);
            }

            const permission_id = permission._id;

            const access = await Rolepermission.findOne({

                role: roleId,
                permission: permission_id,

            });

            if (!access || !access.view || (access_type === 'edit' && !access.edit)) {
                throw new CustomError('Unauthorized to access this feature', 403);
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = authorize;
