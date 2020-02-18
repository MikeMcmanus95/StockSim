const router = require('express').Router();
const { User, Portfolio, PortfolioStock, Stock } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  res.send('Update user by id here');
});

router.delete('/:id', (req, res, next) => {
  res.send('Delete user by id here');
});