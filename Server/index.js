const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors')
var app = express();

app.use(cors());
app.use(bodyParser.json());

const studentsController = require('./controllers/studentsControllers.js');
app.use('/',studentsController);

const CONNECTION_URL = "mongodb+srv://miniproject:miniproject@tourist.wbss9.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL,{useUnifiedTopology: true},{useNewUrlParser: true},{useFindAndModify:true})
        .then(() => {
            app.listen(PORT,()=>{
                console.log(`Connected to Database,Server running on Port ${PORT}`);
            })
        })
        .catch((error) => {
            console.log(error + "Database connection failed!");
        })
