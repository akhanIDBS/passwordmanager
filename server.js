
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');

// connect to local mongoDB 
mongoose.connect(`mongodb+srv://aadil-khan:KofYYCsvsfbsZkG2@cluster0.kxn4p.mongodb.net/PasswordManagerDB?retryWrites=true&w=majority`);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connection Successful!");
});

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  methods: "GET, PUT" // For legacy browser support
}

const userRouter = require('./api/Users')

var app = express();
app.use(express.json());
app.use(cors(corsOptions))
var port = 5000;

// Test Request Call
app.get('/', (req, res) => {
  res.json({
    status: "SUCCESS"
  })
})

app.use('/user', userRouter);

app.listen(port, () => {
    console.log("Listening on port " + port);
})