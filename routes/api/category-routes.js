const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
  }).then((category) => res.json(category))
    .catch(err => {
      console.log(err);
      res.status(500).json("Whoops. Something went wrong.");
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  }).then((categoryID) => res.json(categoryID))
    .catch(err => {
      console.log(err);
      res.status(500).json("Whoops. Something went wrong.");
    });
});


router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((createCategory) => res.status(200).json(createCategory))
    // .then((categoryIds) => res.status(200).json(categoryIds))
    .catch((err) => {
      console.log(err);
      res.status(500).json("Whoops. Something went wrong.");
    });
});

router.put('/', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.body.id,
    },
  })
    .then((updateCategory) => res.json(updateCategory))
    .catch((err) => {
      console.log(err);
      res.status(500).json("Whoops. Something went wrong.");
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => res.json("It's gone."))
    .catch((err) => {
      console.log(err);
      res.status(500).json("Whoops. Something went wrong.");
    });

});

module.exports = router;
