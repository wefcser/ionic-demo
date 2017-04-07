/**
 * Created by wangyifei on 2017/4/5.
 */

var express = require('express');
var router = express.Router();
var Task = require('../models/task');
router.post("/save", function(req, res, next){
    var task = req.body;
    // Client already check task not null
    // if(task.title.trim().length != 0)
        Task.create(task, function (err, task) {
            if (err) {
                return res.status(400).send("err in post /task/save");
            } else {
                return res.status(200).json(task);
            }
        });

});
router.post("/update", function(req, res, next){
    var task = req.body;
    // Client already check task not null
    // if(task.title.trim().length != 0)
        Task.update({"title":task.title},{$set:{"check":task.check}},{"upsert":false,"multi":false}, function (err, task) {
            if (err) {
                return res.status(400).send("err in post /task/update");
            } else {
                return res.status(200).json(task);
            }
        });

});

router.get("/", function(req, res, next){
    Task.find({}, function(err, tasks){
        if(err){
            return res.status(400).send("err in get /task");
        }else{
            console.log(tasks);
            return res.status(200).json(tasks);
        }
    })
});


module.exports = router;