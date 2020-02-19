const router = require('express').Router();
const { User } = require('../db/models');
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

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    user.cashBal -= Math.floor(req.body.cashBal);
    await user.save();

    res.json(user);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(403).send('Purchase denied. Not enough cash.');
    } else {
      next(error);
    }
  }
});

router.delete('/:id', (req, res, next) => {
  res.send('Delete user by id here');
});
