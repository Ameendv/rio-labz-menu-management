const Menu = require('../models/menu.model');

module.exports = {
    createMenu: async (menu) => {
        try {
            const newMenu = new Menu(menu);
            const response = await newMenu.save();
            return { body: response, message: "Menu created successfully" };
        } catch (error) {
            throw error;
        }
    },
    getMenu: async () => {
        try {
            const response = await Menu.find().populate('category_id');
            return { body: response, message: "Menu fetched successfully" };
        } catch (error) {
            throw error;
        }
    },
    updateMenu: async (menu_id, menu) => {
        try {
            const response = await Menu.findByIdAndUpdate(menu_id, menu, { new: true });
            return { body: response, message: "Menu updated successfully" };
        } catch (error) {
            throw error;
        }
    }
}