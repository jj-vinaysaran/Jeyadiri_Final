const express=require("express");
const router=express.Router();
const { login,register,alluser } = require("../Controller/usercontroller");

router.post("/login",login);
router.post("/register",register);
router.get("/alluser",alluser);

module.exports = router;