import express from "express";
import asyncHandler from "express-async-handler";

import Product from './../Models/ProductModel.js';




const productRoute =  express.Router();

//get All Products
productRoute.get(
    "/",
    asyncHandler(async (req ,res)=>  {
        console.log ("here");
             const products = await Product.find({});
        res.json(products);
    })
);






// get Single product 
productRoute.get(
    "/:id",
    asyncHandler(async (req ,res)=>  {
        try {
            
       
        const product = await Product.findById(req.params.id);
        console.log(req.params.id);
        if (product) {
            res.json(product);
        }else {
            res.status(404);
            throw new Error("Product does not exist");
            
        }
    } catch (error) {
        console.log(error)
            
    }
        
    })
);

export default productRoute;