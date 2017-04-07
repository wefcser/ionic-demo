/**
 * Created by wangyifei on 2017/4/5.
 */
var mongoose = require('mongoose');
var TaskSchema = new mongoose.Schema({
    title: String,
    check: Boolean,
    create_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Task", TaskSchema);