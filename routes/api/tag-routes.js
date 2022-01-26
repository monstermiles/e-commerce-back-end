const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll()
    res.json(tags)
  }
  catch (err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagID = await Tag.findByPk(req.params.id)
    if (!tagID) {
      res.status(404).json('No tag with this ID')
    }
    res.json(tagID)
  } catch (err) {
    res.json(err)
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body
      // tag_name: req.params.tag_name,
    )
    console.log(req.params.tag_name)
    if (!newTag) {
      res.status(404).json('Please enter a tag name.')
    }
    res.json(newTag)
  }
  catch (err) {
    res.json(err)
  }
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagID = await Tag.update({
      tag_name: req.params.tag_name
    },
    {
      where: {
        id: req.params.id
      } 
    });
    if (!tagID) {
      res.status(404).json('No tag with this ID')
    }
    res.json(tagID)
  }
  catch (err) {
    res.json(err)
  }
});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagID = await Tag.destroy({
      where: {
        id : req.params.id
      }
    });
    if (!tagID) {
      res.status(404).json('No tag with this ID.')
    }
    res.json(tagID)
  }
  catch (err) {
    res.json(err)
  }
});

module.exports = router;
