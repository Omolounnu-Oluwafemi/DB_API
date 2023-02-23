import {db} from "../db.js"
import jwt from "jsonwebtoken"


export const createToken = (req, res)=>{
    //CHECKING EXISTING USER    
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], (err, data)=>{
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("Email already exists in Database!");

         // Create the token 
    const token = ("GIB" + Math.random().toString(36).slice(2));
        const p = "INSERT INTO users(firstname, lastname, email, phone, token) VALUES (?)";
        const values = [
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            req.body.phone,
            token
        ];

        db.query(p, [values], (err,data)=>{
            if (err) return res.status(500).json(err);
            return res.status(200).json("Token has been created")
        });
    });
   
}


export const createAdmin = (req, res)=>{
    //CHECKING EXISTING USER    
    const q = "SELECT * FROM adminusers WHERE email = ?";
    db.query(q, [req.body.email], (err, data)=>{
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("Email already exists in Database!");
        const p = "INSERT INTO adminusers (firstname, lastname, email, phone) VALUES (?)";

        const values = [
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            req.body.phone,
        ];

        db.query(p, [values], (err,data)=>{
            if (err) return res.status(500).json(err);
            return res.status(200).json("Admin user has been created")
        });
    });
   
}



export const adminlogin = (req, res) => {
 //CHECK USER
 const q = "SELECT * FROM adminusers WHERE email = ? AND phone = ?"
    db.query(q, [req.body.email, req.body.phone], (err, data)=> {
        if(err) return res.json(err)
        if(data.length === 0) 
        return res.status(404).json("User not found!");
        const isPhoneCorrect =
        req.body.phone;
    if (!isPhoneCorrect) 
        return res.status(400).json("Wrong Email or Password!");

const token = jwt.sign({id:data[0].id}, "jwtkey");
res.cookie("access_token", token, {
    httpOnly:true
}).status(200).json(data[0])   
    });
    
};

export const adminlogout = (req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  };

  export const superadminlogin = (req, res) => {
    //CHECK USER
    const q = "SELECT * FROM superadmin WHERE email = ? AND password = ?"
       db.query(q, [req.body.email, req.body.password], (err, data)=> {
           if(err) return res.json(err)
           if(data.length === 0) 
           return res.status(404).json("User not found!");
           const isPasswordCorrect =
           req.body.password;
       if (!isPasswordCorrect) 
           return res.status(400).json("Wrong Email or Password!");
   
   const token = jwt.sign({id:data[0].id}, "jwtkey");
   res.cookie("access_token", token, {
       httpOnly:true
   }).status(200).json(data[0])   
       });
       
   };

   export const superadminlogout = (req, res) => {
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  };