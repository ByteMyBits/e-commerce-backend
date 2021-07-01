const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product
      }
    ]
  }).then((tag) => res.json(tag))
    .catch((err) => {
      console.log(err);
      res.status(500).json("Whoops. Something went wrong.");
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  }).then((tag) => res.json(tag))
    .catch((err) => {
      console.log(err);
      res.status(500).json("Whoops. Something went wrong.");
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    // .then((categoryIds) => res.status(200).json(categoryIds))
    .catch((err) => {
      console.log(err);
      res.status(500).json("Whoops. Something went wrong.");
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    },
  })
    .then((updateTag) => res.json(updateTag))
    .catch((err) => {
      console.log(err);
      res.status(500).json("Whoops. Something went wrong.");
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
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
