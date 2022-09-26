const { json } = require('body-parser');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Student } = require('../models/students');
var { Branch } = require('../models/branches');

router.post('/branch',(req,res)=>{
    var std = new Branch({
        branch: req.body.branch || '',
    });
    std.save((err,doc)=>{
    if(!err){res.send(doc);}
    else{console.log("Error while inserting the branch :" + JSON.stringify(err,undefined,2));}

    });
});
router.get('/branchList',(req,res)=>{
    Branch.find((err,docs)=>{
        if(!err){res.send(docs);}
        else{console.log("Error while retriving branch list" + JSON.stringify(err,undefined,2));}
    });
});

router.get('/',(req,res)=>{
    Student.find((err,docs)=>{
        if(!err){res.send(docs);}
        else{console.log("Error while retriving Student Details" + JSON.stringify(err,undefined,2));}
    });
});

router.get('/search',async (req,res)=>{
    const {query} = req.query;
    const data = await Student.find({
        "$or":[{"name":{$regex:new RegExp(query, "i")}},{"idno":{$regex:new RegExp(query, "i")}}]
    });
    res.send(data)
});

router.get('/branch',async (req,res)=>{
    const {query} = req.query;
    const data = await Student.find({
        "$or":[{"branch":{$regex:query,$options:'i'}}]
    });
    res.send(data)
});

router.post('/student',(req,res)=>{
    var std = new Student({
        name: req.body.name || '',
        idno: req.body.idno || '',
        contact: req.body.contact || '',
        gender: req.body.gender || '',
        year: req.body.year || '',
        branch: req.body.branch || '',
        address: req.body.address || '',
    });
    std.save((err,doc)=>{
    if(!err){res.send(doc);}
    else{console.log("Error while inserting the student :" + JSON.stringify(err,undefined,2));}

    });
});

router.get('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Invalid object id : ${req.params.id}`);
    Student.findById(req.params.id, (err,doc) => {
        if(!err){ res.send(doc) }
        else{ console.log(`Error in Retreving Student` + JSON.stringify(err,undefined,2));}
    });
});

router.put('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    var std = {
        name: req.body.name || '',
        idno: req.body.idno || '',
        contact: req.body.contact || '',
        gender: req.body.gender || '',
        year: req.body.year || '',
        branch: req.body.branch || '',
        address: req.body.address || '',
    }
    
    Student.findByIdAndUpdate(req.params.id, {$set: std}, {new: true}, (err, doc) => {
        if(!err){ res.send(doc); }
        else{
            console.log(`Error in updating the student `+JSON.stringify(err,undefined,2));
        }
    });
});

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }
    
    Student.findByIdAndDelete(req.params.id,(err, doc) => {
        if(!err){
            res.send(doc);
        }
        else{
            console.log(`Error in Student Delete :` + JSON.stringify(err,undefined,2));
        }
    });
});


module.exports = router;