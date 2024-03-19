// app.js
const express = require("express");
const app = express();
const cors = require('cors');
const sequelize = require("./config/db.js");
const bcrypt=require("bcrypt");
const { Sequelize } = require("sequelize");
const EventTables=require("./Model/EventsModel.js")
app.use(cors());
app.use(express.json());
app.use("/user", require("./Routes/user"));
app.use("/events", require("./Routes/event"));
app.use("/contact", require("./Routes/ContactRoute"));
app.use("/attendance", require("./Routes/AttendanceRoute"));
app.use("/admin", require("./Routes/AdminRoutes"));

app.get("/createtable/:eventname", async (req, res) => {
  const { eventname } = req.params;
  const tableQuery = `
    CREATE TABLE IF NOT EXISTS ${eventname}Attendance (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullName VARCHAR(255) DEFAULT NULL,
      icNumber VARCHAR(255) DEFAULT NULL,
      dateOfBirth VARCHAR(255) DEFAULT NULL,
      schoolName VARCHAR(255) DEFAULT NULL,
      date VARCHAR(255) DEFAULT NULL,
      Class VARCHAR(255) DEFAULT NULL,
      Race VARCHAR(255) DEFAULT NULL,
      Fathername VARCHAR(255) DEFAULT NULL,
      fatherage VARCHAR(255) DEFAULT NULL,
      fatheroccupation VARCHAR(255) DEFAULT NULL,
      fatherstatus VARCHAR(255) DEFAULT NULL,
      mothername VARCHAR(255) DEFAULT NULL,
      motherage VARCHAR(255) DEFAULT NULL,
      motheroccupation VARCHAR(255) DEFAULT NULL,
      motherstatus VARCHAR(255) DEFAULT NULL,
      homeaddress VARCHAR(255) DEFAULT NULL,
      state VARCHAR(255) DEFAULT NULL,
      district VARCHAR(255) DEFAULT NULL,
      phonenumber VARCHAR(255) DEFAULT NULL,
      phonenumberfather VARCHAR(255) DEFAULT NULL,
      phonenumbermother VARCHAR(255) DEFAULT NULL,
      picture VARCHAR(255) DEFAULT NULL,
      whoami VARCHAR(255) DEFAULT NULL,
      selectedSchoolState VARCHAR(255) DEFAULT NULL,
      selectedSchoolDistrict VARCHAR(255) DEFAULT NULL,
      password VARCHAR(255) DEFAULT NULL  ,
      ParentOrVisitor varchar(255) DEFAULT NULL,
      Occupation varchar(255) DEFAULT NULL,
      Email varchar(255) DEFAULT NULL
      );
      `;
      
      try {
        await sequelize.query(tableQuery);
        res.status(200).json({ message: `Table ${eventname}Attendance created successfully` });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    

    app.post("/post/:register", async (req, res) => {
      try {
        const { register } = req.params;
        const {
          fullName,
          icNumber,
          dateOfBirth,
          schoolName,
          date,
          Class,
          Race,
          Fathername,
          fatherage,
          fatheroccupation,
          fatherstatus,
          mothername,
          motherage,
          motheroccupation,
          motherstatus,
          homeaddress,
          state,
          district,
          phonenumber,
          phonenumberfather,
          phonenumbermother,
          picture,
          whoami,
          selectedSchoolState,
          selectedSchoolDistrict,
          password,
          Occupation,
          ParentOrVisitor,
          Email
        } = req.body;
    
        // Check if the user is already registered
        const existingUserQuery = `
          SELECT * FROM ${register}Attendance
          WHERE icNumber = :icNumber OR phonenumber = :phonenumber OR Email = :Email;
        `;
    
        const existingUser = await sequelize.query(existingUserQuery, {
          replacements: { icNumber, phonenumber, Email },
          type: Sequelize.QueryTypes.SELECT
        });
    
        if (existingUser.length > 0) {
          // User already exists, return error message
          return res.status(400).json({ error: "User already registered" });
        }
    
        // User is not registered, proceed with registration
        const tableQuery = `
          CREATE TABLE IF NOT EXISTS ${register}Attendance (
            id INT AUTO_INCREMENT PRIMARY KEY,
            fullName VARCHAR(255) DEFAULT NULL,
            icNumber VARCHAR(255) DEFAULT NULL,
            dateOfBirth VARCHAR(255) DEFAULT NULL,
            schoolName VARCHAR(255) DEFAULT NULL,
            date VARCHAR(255) DEFAULT NULL,
            Class VARCHAR(255) DEFAULT NULL,
            Race VARCHAR(255) DEFAULT NULL,
            Fathername VARCHAR(255) DEFAULT NULL,
            fatherage VARCHAR(255) DEFAULT NULL,
            fatheroccupation VARCHAR(255) DEFAULT NULL,
            fatherstatus VARCHAR(255) DEFAULT NULL,
            mothername VARCHAR(255) DEFAULT NULL,
            motherage VARCHAR(255) DEFAULT NULL,
            motheroccupation VARCHAR(255) DEFAULT NULL,
            motherstatus VARCHAR(255) DEFAULT NULL,
            homeaddress VARCHAR(255) DEFAULT NULL,
            state VARCHAR(255) DEFAULT NULL,
            district VARCHAR(255) DEFAULT NULL,
            phonenumber VARCHAR(255) DEFAULT NULL,
            phonenumberfather VARCHAR(255) DEFAULT NULL,
            phonenumbermother VARCHAR(255) DEFAULT NULL,
            picture VARCHAR(255) DEFAULT NULL,
            whoami VARCHAR(255) DEFAULT NULL,
            selectedSchoolState VARCHAR(255) DEFAULT NULL,
            selectedSchoolDistrict VARCHAR(255) DEFAULT NULL,
            password VARCHAR(255) DEFAULT NULL,
            ParentOrVisitor varchar(255) DEFAULT NULL,
            Occupation varchar(255) DEFAULT NULL,
            Email varchar(255) DEFAULT NULL
          );
        `;
    
        await sequelize.query(tableQuery);
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Insert data into the table
        const insertQuery = `
          INSERT INTO ${register}Attendance (
            fullName, icNumber, dateOfBirth, schoolName, date, Class, Race, Fathername, fatherage,
            fatheroccupation, fatherstatus, mothername, motherage, motheroccupation, motherstatus,
            homeaddress, state, district, phonenumber, phonenumberfather, phonenumbermother, picture,
            whoami, selectedSchoolState, selectedSchoolDistrict, password, Occupation, ParentOrVisitor,
            Email
          )
          VALUES (
            :fullName, :icNumber, :dateOfBirth, :schoolName, :date, :Class, :Race, :Fathername, :fatherage,
            :fatheroccupation, :fatherstatus, :mothername, :motherage, :motheroccupation, :motherstatus,
            :homeaddress, :state, :district, :phonenumber, :phonenumberfather, :phonenumbermother, :picture,
            :whoami, :selectedSchoolState, :selectedSchoolDistrict, :hashedPassword, :Occupation, :ParentOrVisitor,
            :Email
          );
        `;
    
        await sequelize.query(insertQuery, {
          replacements: {
            fullName,
            icNumber,
            dateOfBirth,
            schoolName,
            date,
            Class,
            Race,
            Fathername,
            fatherage,
            fatheroccupation,
            fatherstatus,
            mothername,
            motherage,
            motheroccupation,
            motherstatus,
            homeaddress,
            state,
            district,
            phonenumber,
            phonenumberfather,
            phonenumbermother,
            picture,
            whoami,
            selectedSchoolState,
            selectedSchoolDistrict,
            hashedPassword,
            Occupation,
            ParentOrVisitor,
            Email
          }
        });
    
        res.status(201).json({ message: "Data inserted successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    
// const bcrypt = require('bcrypt');

app.post("/auth/login", async (req, res) => {
  const { tablename, phonenumber, password } = req.body;
  console.log(tablename,password,phonenumber);
  try {
    // Check if the required fields are present
    if (!tablename || !phonenumber || !password) {
      return res.status(400).json({ error: "Please provide all required fields." });
    }

    // Create a SQL query string
    const query = `SELECT * FROM ${tablename} WHERE phonenumber = ?`;

    // Assuming you have a database connection object named 'sequelize'
    const [user] = await sequelize.query(query, {
      replacements: [phonenumber],
      type: Sequelize.QueryTypes.SELECT
    });

    // Check if the user with the provided phone number exists
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Extract the hashed password from the user object
    const hashedPassword = user.password;

    // Compare the hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // If everything is correct, return the user as a response
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);

    // Handle specific error types if needed
    // if (error instanceof Sequelize.DatabaseError) {
    //   return res.status(500).json({ error: "Database error occurred." });
    // }

    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/alltablename", async (req, res) => {
  try {
    const query = `SELECT eventName FROM EventTables`;
    
    const result = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    
    const eventNames = result.map(item => {
      
      let charsplit=item.eventName.split(" ");
      let ans="";
      for(let i=0;i<charsplit.length;i++)
      {
        ans+=charsplit[i];
      }
      let finalans=`${ans}`
      return finalans;
    
    });

    res.status(200).json(eventNames);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/candistributeOn/:eventid", async (req, res) => {
  const {eventid}=req.params;
  try {
    await EventTables.update({ candistribute: 'ON' }, { where: {eventid:eventid} });
    res.status(200).json({ message: 'candistribute set to ON' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/candistributeOff/:eventid", async (req, res) => {
  const {eventid}=req.params;

  try {
    await EventTables.update({ candistribute: 'OFF' }, { where: {eventid:eventid} });
    res.status(200).json({ message: 'candistribute set to OFF' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get("/candistribute/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await EventTables.findOne({
      where: { eventId: id },
      attributes: ['candistribute'],
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const candistributeValue = event.candistribute;
    console.log(candistributeValue);
    res.status(200).json({ candistributeValue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post("/findeventid", async (req, res) => {
  const { choosentablename } = req.body;
  try {
    const query = `SELECT eventId, eventName FROM EventTables`;
    const result = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT,
    });
    let id=-1;
    for (let i = 0; i < result.length; i++) {
      console.log(result[i].eventName);
      let array=result[i].eventName.split(" ");
      let str="";
      for(let j=0;j<array.length;j++)
      {
        str+=array[j];
      }
      if(choosentablename===str)
      {
        id=result[i].eventId;
      }
    }

    console.log(result);
    res.json({"id":id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/attendance/:tablename", async (req, res) => {
  const { tablename } = req.params;
  try {
    const query0 = `
      SELECT * FROM ${tablename}Attendance where whoami='others';
    `; 
    const query1 = `
      SELECT * FROM ${tablename}Attendance where whoami='student';
    `; 
    const query2 = `
      SELECT * FROM ${tablename}Attendance where whoami='teacher';
    `; 

    const result0 = await sequelize.query(query0, {
      type: Sequelize.QueryTypes.SELECT,
    });
    const result1 = await sequelize.query(query1, {
      type: Sequelize.QueryTypes.SELECT,
    });
    const result2 = await sequelize.query(query2, {
      type: Sequelize.QueryTypes.SELECT,
    });
      res.json({"others":result0,"students":result1,"teachers":result2});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/auth/forgotPassword", async (req, res) => {
  try {
    const { phoneNumber, email, registeredEvent, newPassword } = req.body;

    // Ensure both phone number and email are provided
    if (!phoneNumber || !email) {
      return res.status(400).json({ error: "Please provide both phone number and email." });
    }

    // Construct the query to fetch the user based on both phone number and email
    const query = `
      SELECT * FROM ${registeredEvent}Attendance WHERE phonenumber='${phoneNumber}' AND email='${email}'
    `;

    // Execute the query
    const [user] = await sequelize.query(query, {
      type: Sequelize.QueryTypes.SELECT
    });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update the user's password with the new one
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateQuery = `UPDATE ${registeredEvent}Attendance SET password=:hashedPassword WHERE id=:userId`;

    await sequelize.query(updateQuery, {
      replacements: {
        hashedPassword,
        userId: user.id
      }
    });

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// module.exports = sequelize;
