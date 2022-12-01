import express from "express";
import User from './Models/UserModel.js';
import users from './data/user.js';
import Product from './Models/ProductModel.js';
import products from "./data/Products.js";
import asyncHandler from "express-async-handler"


const importData = express.Router();

importData.post("/user", asyncHandler(async (req,res)=>{

    await User.deleteMany({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
}));
importData.post("/products", asyncHandler(async (req,res)=>{

    await Product.deleteMany({});
    const importProducts = await Product.insertMany(products);
    res.send({ importProducts });
}));

export default importData;
