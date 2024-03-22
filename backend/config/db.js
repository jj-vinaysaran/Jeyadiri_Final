const Sequelize = require("sequelize");


const sequelize = new Sequelize(
  "surveyjaya", //database name
  "yadirirepo", //user name
  'tXbGy7mVx$kCs8' // password
  ,
  {
  host: "3.1.224.199", // host
  dialect: 'mysql',
  logging:false
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

  sequelize.sync()
  .then(() => {
    console.log('Tables synced');
  })
  .catch((err) => {
    console.error('Error syncing tables:', err);
  });
module.exports = sequelize;