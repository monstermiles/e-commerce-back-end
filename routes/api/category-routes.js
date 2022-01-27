const router = require('express').Router();
const { Category, Product } = require('../../models');
const { beforeBulkDestroy } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll(
      {
        include: [Product]
      }
    )
    res.json(categories)
  } catch (err) {
    res.status(500).json(err)
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesID = await Category.findOne(
      {
      where: {
        id: req.params.id
      },
      include: [Product]  
    })
    if (!categoriesID) {
      res.status(404).json('No category with this ID.');
      return;
    }
    res.json(categoriesID);
  }
  catch (err) {
    res.status(500).json(err);
  }
});



router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    if (!category_name) {
      res.status(404).json('Please enter a category name.')
      return;
    }
    res.status(200).json(newCategory)
  } catch (err) {
    res.json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryID = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    if (!categoryID) {
      res.status(404).json('No category with this ID.');
      return;
    }
    res.json(categoryID);
  }
  catch (err) {
    res.json(err)
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try { 
    const categoryID = await Category.destroy({
      where: {
        id: req.params.id
      },
  });
  console.log(categoryID)
    if (!categoryID) {
      res.status(404).json('No category with this ID.')
      return;
    }
    res.json(categoryID)
  }
  catch (err) {
    res.json(err)
  }
});

module.exports = router;
