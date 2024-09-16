import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

// import connection from "./config/connectDB";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;


//config view engine
configViewEngine(app);

//config CORS 
configCors(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookies-parser
app.use(cookieParser());

//init web routes
initWebRoutes(app);
//init api routes
initApiRoutes(app);

app.use((req, res) => {
    return res.send('404 not found')
})
app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})