import {db} from "../db.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";


export const signup = (req, res)=>{

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);


    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.phone,
        hash,
        req.body.token  
     ];

        const p= "UPDATE users SET `firstname` = ?, `lastname` = ?, `email` = ?, `phone` = ?, `password` = ? WHERE accesstoken = ?" 

      db.query(p, values , (err, data)=> {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created")
        });
      
 };



export const login = (req, res)=>{

    //CHECK USER

    const q = "SELECT * FROM users WHERE email = ?"

    db.query(q, [req.body.email], (err, data)=> {
        if(err) return res.json(err)
        if(data.length === 0) 
        return res.status(404).json("User not found!");

            //Check password
    const isPasswordCorrect =
        req.body.password
        
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");
      
const token = jwt.sign({id:data[0].id}, "jwtkey");
const {password, accesstoken, ...other}= data[0]

res.cookie("access_token", token, {
httpOnly:true,
})
.status(200)
.json(other);
    });
};

export const logout = (req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  };