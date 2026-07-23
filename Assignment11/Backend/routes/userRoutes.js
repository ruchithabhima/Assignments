const express=require("express");
const router=express.Router();
const {getUsers,signup,login}=require("../controllers/userControllers");
router.get("/users",getUsers);
router.post("/signup",signup);
router.post("/login",login);
module.exports=router;