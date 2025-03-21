const User = require('../models/user.model');
const bcrypt = require('bcrypt');
module.exports = {
    getProfile: async (id) => {
        const profile = await User.findById(id);
        return { body: profile, message: "Profile fetched successfully" };
    },
    getUserProfiles: async () => {
        const profiles = await User.find();
        return { body: profiles, message: "Profiles fetched successfully" };
    },
    updateProfile: async (id, data) => {


        if (data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
        }
        console.log(data)

        if (data.role) {
            delete data.role;//user cannot change their role
        }
        console.log(data)

        const profile = await User.findByIdAndUpdate(id, data);
        return { body: profile, message: "Profile updated successfully" };
    }
}