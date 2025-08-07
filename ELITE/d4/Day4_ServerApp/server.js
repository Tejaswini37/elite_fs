// const express=require('express')
// const app=express();
// const port=3000;
// app.use(express.json());
// let orders=[];
// let firstid=1;
// app.post("/orders")
const express = require("express");

const app = express();
const port = 3000;

// Use built-in middleware to parse JSON
app.use(express.json());

let orders = [];
let currentId = 1;

app.post("/orders", (req, res) => {
    const { customerName, totalPrice } = req.body;

    if (!customerName || typeof customerName !== "string" || customerName.trim() === "") {
        return res.status(400).send({ error: "Customer name is required and must be a non-empty string." });
    }
    if (!totalPrice || typeof totalPrice !== "number" || totalPrice <= 0) {
        return res.status(400).send({ error: "Total price must be a positive number." });
    }

    const newOrder = { id: currentId++, customerName, totalPrice };
    orders.push(newOrder);
    res.status(201).send(newOrder);
});

app.get("/orders", (req, res) => res.status(200).send(orders));

app.get("/orders/:id", (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send({ error: "Order not found" });
    res.status(200).send(order);
});

app.put("/orders/:id", (req, res) => {
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex === -1) return res.status(404).send({ error: "Order not found" });

    const { customerName, totalPrice } = req.body;
    if (customerName && (typeof customerName !== "string" || customerName.trim() === "")) {
        return res.status(400).send({ error: "Customer name must be a non-empty string." });
    }
    if (totalPrice && (typeof totalPrice !== "number" || totalPrice <= 0)) {
        return res.status(400).send({ error: "Total price must be a positive number." });
    }

    if (customerName) orders[orderIndex].customerName = customerName;
    if (totalPrice) orders[orderIndex].totalPrice = totalPrice;

    res.status(200).send(orders[orderIndex]);
});

app.delete("/orders/:id", (req, res) => {
    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex === -1) return res.status(404).send({ error: "Order not found" });

    orders.splice(orderIndex, 1);
    res.status(200).send({ message: "Order deleted successfully" });
});

app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
