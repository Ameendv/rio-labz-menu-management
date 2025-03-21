const Category = require('../models/category.model');

module.exports = {
    createCategory: async (category) => {
        try {
            const newCategory = new Category(category);
            const response = await newCategory.save();
            return { body: response, message: "Category created successfully" };
        } catch (error) {
            throw error;
        }
    }
}