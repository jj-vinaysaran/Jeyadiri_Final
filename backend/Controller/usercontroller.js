const UserModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    console.log(phoneNumber, password);

    const user = await UserModel.findOne({ where: { phonenumber: phoneNumber } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password from the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (user.password===password) {
      res.status(200).json({ message: "Login successful",userId: user.id,name:user.fullName,phoneNumber:user.phonenumber });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(`Error fetching user: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.register = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await UserModel.create(userData);
    res.status(201).json({ message: "User created successfully", userId: newUser.id ,name:newUser.fullName});
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.alluser = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
