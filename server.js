const app = require('./app');
const { PORT } = require('./config');
//start server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
