const express=require("express");
const router=express.Router();
const authenticateToken=require("../middleware/authMiddleware");
const {getUserProfile,updateUserProfile}=require("../controllers/profileController")
router.get("/",authenticateToken,getUserProfile)
router.patch("/",authenticateToken,updateUserProfile)
module.exports=router;