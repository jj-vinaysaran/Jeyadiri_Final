const AdminModel = require("../Model/AdminModel");
const bcrypt = require("bcrypt");

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await AdminModel.findOne({ where: { username } });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Compare the provided password with the hashed password from the database
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (isPasswordMatch) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(`Error fetching admin: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.adminRegister = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin with the same username already exists
    const existingAdmin = await AdminModel.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin with this username already exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin with hashed password
    const newAdmin = await AdminModel.create({ username, password: hashedPassword });
    res.status(201).json({ message: "Admin created successfully", adminId: newAdmin.id });
  } catch (error) {
    console.error(`Error creating admin: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
