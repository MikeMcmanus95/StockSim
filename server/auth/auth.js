const router = require('express').Router();
const { User } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.put('/login', async (req, res, next) => {
  try {
    const currentUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (!currentUser) {
      console.log('User not found with email ', req.body.email);
      res.status(401).send('Wrong email/password');
    } else if (!currentUser.correctPassword(req.body.password)) {
      console.log('Incorrect password for user ', req.body.email);
      res.status(401).send('Wrong email/password');
    } else {
      req.login(currentUser, err => {
        if (err) next(err);
        else res.json(currentUser);
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    req.login(newUser, err => {
      if (err) next(err);
      else res.json(newUser);
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('A user with that email already exists');
    } else {
      next(error);
    }
  }
});

router.post('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

router.get('/me', (req, res, next) => {
  res.json(req.user);
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

module.exports = router;
