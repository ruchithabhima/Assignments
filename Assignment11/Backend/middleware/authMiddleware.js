const jwt=require("jsonwebtoken");
const authenticateToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    console.log(req.headers);
    if(!authHeader){
        return res.status(401).json({message:"Token Missing"});
    }
    const token=authHeader.split(" ")[1];
    console.log("token:",token)
    jwt.verify(token,process.env.jwt_secret_key,(err,decoded)=>{
        if(err){
            return res.status(403).json({message:"Invalid Token"});
        }
        console.log("token verifed");
        console.log(decoded);
        req.user=decoded;
        console.log(req.user.id);
        next();
        }
    )
}
module.exports=authenticateToken;