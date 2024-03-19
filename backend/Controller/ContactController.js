const db = require("../app");

exports.createContact=(req, res) => {
    const contactData = req.body;
    const query = "INSERT INTO contactNumbers SET ?";
    
    db.query(query, contactData, (err, result) => {
      if (err) {
        console.error(`Error creating contact number: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "Contact number created successfully", contactId: result.insertId });
      }
    });
  }

  exports.allcontact=(req, res) => {
    const query = "SELECT * FROM contactNumbers";
    
    db.query(query, (err, result) => {
      if (err) {
        console.error(`Error fetching contact numbers: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(result);
      }
    });
  };

  exports.updatecontact=(req, res) => {
    const contactId = req.params.contactId;
    const updatedData = req.body;
    const query = "UPDATE contactNumbers SET ? WHERE contactId = ?";
    
    db.query(query, [updatedData, contactId], (err, result) => {
      if (err) {
        console.error(`Error updating contact number: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "Contact number updated successfully" });
      }
    });
  };

  exports.deleteContact=(req, res) => {
    const contactId = req.params.contactId;
    const query = "DELETE FROM contactNumbers WHERE contactId = ?";
    
    db.query(query, contactId, (err, result) => {
      if (err) {
        console.error(`Error deleting contact number: ${err}`);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ message: "Contact number deleted successfully" });
      }
    });
  };