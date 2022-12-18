const jwt=require("jsonwebtoken");

const auth=async (req,res)=>
{
    let token;
    if(req.cookies.token || (req.headers.authorization && req.headers.authoriztion.startsWith("Bearer")))
    {
        token=req.cookies.token || req.headers.authorization.split(" ")[1];
    }

    if(!token)
        res.status(401).send("No access to this Route");

        try {
            const decodedtoken=await jwt.verify(token,"shhhhh");
            req.id=decodedtoken.id;
            req.email=decodedtoken.email;
            req.name=decodedtoken.name;
            next();
        } catch (error) {
            res.status(401).send("No access to this Route");
        }
}

module.exports=auth;