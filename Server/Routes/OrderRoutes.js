
import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from './../Models/OrderModel.js';
import protect from './../Middleware/AuthMiddleware.js';

const orderRouter = express.Router();

orderRouter.post(
    "/",
    protect,
    asyncHandler(async (req, res) => {
        const { 
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error("No order items");
            return
        } else {
            const order = new Order({
                orderItems,
                shippingAddress,
                user: req.user._id,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            })

            const createOrder= await order.save()
            res.status(201).json(createOrder)
        }
    })
)

//get Order
orderRouter.get(
    "/:id",
    protect,
    asyncHandler(async (req, res) => {
       const order = await Order.findById(req.params.id).populate(
        "user",
        "name email",
       )

        if (order) {
            res.json(order);
        }else{

            res.status(404)
            throw new Error ("Order Not Found")
        }
    })
)


export default orderRouter;