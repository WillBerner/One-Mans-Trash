const { Category } = require("../models");

const getCategories = async () => {
    const categoryData = await Category.findAll({
    });
    const allCategories = categoryData.map((category) =>
      category.get({ plain: true })
    );
    return allCategories;
  };