const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

// for any /users/:id routes, this piece of middleware
// will be executed, and put the user on `req.requestedUser`
router.param('id', async (req, res, next, id) => {
  const user = await User.findByPk(id);
  if (!user) {
    const err = new Error('User not found!');
    err.status(404);
    return next(err);
  }
  req.requestedUser = user;
  next();
  return null;
});

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
    const user = await req.requestedUser.reload();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await req.requestedUser;
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

const adminsOnly = (req, res, next) => {
  if (!req.user.isAdmin) {
    const err = new Error('Not allowed!');
    err.status = 401;
    return next(err);
  }
  next();
};

router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    await req.requestedUser.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
