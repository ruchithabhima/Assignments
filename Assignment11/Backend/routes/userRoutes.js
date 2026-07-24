const express=require("express");
const router=express.Router();
const {getUsers,signup,login,getProfile}=require("../controllers/userControllers");
const authenticateToken=require("../middleware/authMiddleware");
router.get("/users",getUsers);
router.post("/signup",signup);
router.post("/login",login);
router.get("/profile",authenticateToken,getProfile);
module.exports=router;