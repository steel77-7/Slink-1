require('dotenv').config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


const authenticateToken = (req,res,next)=>{
    //console.log('authenticatioon initiated')
    const  authHeader = req.header('authorization');
    //console.log('this is the authheader',authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    //console.log(token)
    if(!token) res.send({validation :false})
    if(token == null) return res.status(401);
    jwt.verify(token,JWT_SECRET,(error,user)=>{
        if(error) return res.status(403);
        //console.log('user.user',user.user);
        req.user=user.user;
        next();
    })

}

module.exports = authenticateToken;



