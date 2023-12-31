require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => { console.log('Database conected...') })
  .catch((error) => { console.log(error) })

db.sync()
  .then(() => { console.log('Database synchronized...') })
  .catch((error) => { console.log(error) })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
