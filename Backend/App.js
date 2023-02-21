//requirements
const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
//requirements

//Init
mongoose.set('strictQuery', false);
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(cookieParser())
//Init

//Routes
app.use("/masters", require("./Routes/MasterRoutes"))
app.use("/responsables", require("./Routes/ResponsableRoutes"))
app.use("/livres", require("./Routes/LivreRoutes"))
app.use("/categories", require("./Routes/CategorieRoutes"))
//Routes


//-----------------------------------------------------------------------------------
const connection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI).then(result => {console.log("Connected to database.")})
        app.listen(2233, ()=>{console.log("Server is running.")})
    }catch(error){
        console.log("Server can't run. " + error)
    }
}

//------------------------------------RUN---------------------------------------------
connection()

