const express=require("express");
const router=express.Router();
const authenticateToken=require("../middleware/authMiddleware");
const {getReport}=require("../controllers/reportController");
router.get("/",authenticateToken,getReport);
module.exports=router;