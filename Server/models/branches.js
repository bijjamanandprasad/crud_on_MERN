const mongoose = require('mongoose');

var Branch = mongoose.model('branch_list',{
    branch: {
        type: String
    }
});


module.exports = {Branch};