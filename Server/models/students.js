const mongoose = require('mongoose');

var Student = mongoose.model('student_list',{
    name: { type: String },
    idno: { type: String },
    contact: { type: Number },
    gender:{
        type: String
    },
    year: {
        type: String
    },
    branch: {
        type: String
    },
    address: {type: String}
});


module.exports = {Student};