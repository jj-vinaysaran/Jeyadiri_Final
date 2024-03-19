const express = require('express');
const { createContact, allcontact, updatecontact, deleteContact } = require('../Controller/ContactController');
const Router=express.Router();

Router.post("/CreateContact",createContact);
Router.get("/allcontact",allcontact);
Router.put("/contactNumbers/:contactId",updatecontact);
Router.delete("/contactNumbers/:contactId",deleteContact);


module.exports=Router;