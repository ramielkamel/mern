import express from "express";
import dotenv from "dotenv"
import connectDatabase from "./config/mongoDb.js";
import importData from './DataImport.js';
import productRoute from "./Routes/ProductRoutes.js";
import userRouter from './Routes/UserRoutes.js';
import { errorHandler, notFound } from "./Middleware/Errors.js";
import orderRouter from './Routes/OrderRoutes.js'


dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

//API
app.use("/api/import", importData);
app.use("/api/products", productRoute);

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use(notFound);
app.use(errorHandler);




app.get("/",(req,res)=>{
    res.send("API is running... ");
});

const PORT = process.env.PORT || 1000 ;

app.listen(PORT,console.log(`server running in port ${PORT}`));