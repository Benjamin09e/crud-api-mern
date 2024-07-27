// const express = require('express')
import express from "express";
import dotenv from "dotenv"
import connectToDB from "./database/db.js";
import { Todo } from "./models/todo.model.js";

dotenv.config()


const app = express()
const port = process.env.port || 5001


// middleware
app.use(express.json());

connectToDB()


// app.get("/", (req, res) => {
//     res.send({
//         success:true,
//         message:"Server is active"
//     })
// })

// api
app.get("/todo", async (req, res) => {
    try {
        const resultat = await Todo.find()
        res.send({
            success: true,
            message: "Todo lists received successsfully",
            data : resultat
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Failed to received todo lists",
            data : resultat
        })
    }
})

app.get("/:todoId", async (req, res) => {
    const todoId = req.params.todoId
    try {
        const resultat = await Todo.findById(todoId)
        res.send({
            success: true,
            message: "Todo lists received successsfully",
            data : resultat
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Failed to received todo lists",
            data : resultat
        })
    }
})

app.post("/create-todo", async (req, res) =>{
    const todoDetails = req.body

    try {
        const resultat = await Todo.create(todoDetails)
        res.send({
            success: true,
            message: "Todo is created successsfully",
            data : resultat
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Failed to created todo",
            data : resultat
        })
    }
})

app.patch("/:todoId", async (req, res) =>{
    const todoId = req.params.todoId
    const updatedTodo = req.body
    try {
        const resultat = await Todo.findByIdAndUpdate(todoId, updatedTodo,{
            new: true,
        })
        res.send({
            success: true,
            message: "Todo is update successsfully",
            data : resultat
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Failed to update todo",
            data : resultat
        })
    }
})

app.delete("/delete/:todoId", async (req, res) =>{
    try {
        await Todo.findByIdAndDelete(req.params.todoId)
        res.send({
            success: true,
            message: "Todo is deleted successsfully",
            data : null
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Failed to deleted todo",
            data : null
        })
    }
})




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
