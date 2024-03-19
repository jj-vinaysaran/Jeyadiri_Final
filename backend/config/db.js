const Sequelize = require("sequelize");


const sequelize = new Sequelize(
  "brd5rohp616w73oh8mb3",
  "uy9zv2alcimdtouo",
  "zCGGge3XtE3heDr9Srr0"
  ,
  {
  host: "brd5rohp616w73oh8mb3-mysql.services.clever-cloud.com",
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