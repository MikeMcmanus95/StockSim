const app = require('./server/server');
const db = require('./server/db/db');
const PORT = 8000;

const init = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () =>
    console.log(`Server is now running at http://localhost:${PORT}`)
  );
};

init();
