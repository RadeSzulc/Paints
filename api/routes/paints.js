const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Paint = require("../models/paint");
const paint = require("../models/paint");

// Create   POST /paint Adding new paint 
router.post("/", (req, res, next) => {
    console.log(req.file);
    const paint = new Paint({
        _id: new mongoose.Types.ObjectId(),
        color: req.body.color,
        producer: req.body.producer,
        type: req.body.type,
        capacity: req.body.capacity,
        density: req.body.density,
    })
    paint.save()
    .then(result => {
        res.status(201).json({
            message: "Adding new paint ",
            info: result
        })
    })
    .catch(err => res.status(500).json({Error: err}))
})

// Read     GET  /paint List of all paints 
router.get("/", (req, res, next) => {
    paint.find()
    .then(result => {
        res.status(200).json({
            message: "List of all paints ",
            info: result
        })
    })
    .catch(err => res.status(500).json({Error: err}))
})

// Read     GET  /paints/100 Details of the paint No. 100 
router.get("/:paintId", (req, res, next) => {
    const id = req.params.paintId
    paint.findById(id)
    .then(result => {
        res.status(200).json({
            message: "Details of the paint No. " + id,
            info: result
        })
    })
    .catch(err => res.status(500).json({Error: err}))
})

// Update   PUT  /paints/100 paint updating
router.put("/:paintId", (req, res, next) => {
    const id = req.params.paintId
    paint.findByIdAndUpdate(id,{
        color:req.body.color,
        producer: req.body.producer,
        type: req.body.type,
        capacity: req.body.capacity,
        density: req.body.density
    })
    .then(result => {
    res.status(200).json({message: "Paint of id:" + id + " updated"})
})
})

// Delete   DELETE /paints/100 paint removal by number 100 
router.delete("/:paintId", (req, res, next) => {
    const id = req.params.paintId
    paint.findByIdAndDelete(id)
    .then(result =>{
    res.status(200).json({message: "Paint of id: " + id + " deleted"})
    })
})

module.exports = router;