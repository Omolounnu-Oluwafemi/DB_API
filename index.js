import express from "express"
import authRoutes from "./routes/auth.js"
import tableRoutes from "./routes/tables.js"
import cookieParser from "cookie-parser";
import superAdminRoutes from "./routes/superAdmin.js"
//  import bodyParser from "body-parser";
//  import session from "express-session";
// import cors from "cors";


const app = express(); 
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/tables", tableRoutes); 
app.use("/api/superAdmin", superAdminRoutes); 


app.listen(8800, ()=>{
console.log ("connected!")
})