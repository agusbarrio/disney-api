'use strict';
const app = require('./app');
const { PORT } = require('./config');
const { initDb, initDbModels } = require('./models');

async function run() {
  await initDb();
  await initDbModels();

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

run();
