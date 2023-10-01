const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "123456789";
module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json(
                {
                    msg: "Username aldready exists",
                    status: false
                }
            )
        }
        const mailCheck = await User.findOne({ email });
        if (mailCheck) {
            return res.json(
                {
                    msg: "email aldready exists",
                    status: false
                }
            )
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create(
            {
                username,
                email,
                password: hashPassword
            }
        );
        delete user.password;
        console.log("New User Registerd : " + user.username);
        return res.json({ status: true, user });
    } catch (error) {
        next(error)
    }
    console.log(req.body);
}
module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json(
                {
                    msg: "Incorrect Username or Password",
                    status: false
                }
            )
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json(
                {
                    msg: "Incorrect Username or Password",
                    status: false
                }
            )
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
            expiresIn: "1hr"
        });
        delete user.password;
        console.log("User logged in : " + user.username);
        return res.json({ status: true, token });
    } catch (error) {
        next(error)
    }
    console.log(req.body);
}
module.exports.verifytoken = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token)
    
    if(!token){
       return res.status(404).json({message:"No token found"});
    }
    jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{
        if(err){
            console.log(token);
             res.status(400).json({message:" Token Expired"});
        }
        console.log(user.id);
        req.id = user.id;
        });
      next();
}
module.exports.getUser = async (req, res, next) => {
  const userID = req.id;
  let user;
  try {
     user = await User.findById(userID,"-password");
  } catch (error) {
    return new Error(error); 
  } 
  if(!user){
    return res.status(404).json({message:"User Not Found"});
  }
  return res.status(200).json({user});
} 