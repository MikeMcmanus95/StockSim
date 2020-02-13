const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const PORT = process.env.PORT || 8080;

module.exports = app;

// Use our postgres database to store the user session
const { db, User } = require('./db/models/');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'insecure secret',
      store: dbStore,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', require('./auth/auth'));

  app.use(express.static(path.join(__dirname, '../public')));

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  app.use('*', (req, res, next) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
  );

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = async () => {
  app.listen(PORT, () =>
    console.log(`Server is now running at http://localhost:${PORT}`)
  );
};

const syncDb = () => db.sync();

async function bootApp() {
  await dbStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}

bootApp();
