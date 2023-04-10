const port = 9001;

const employees = {};
const sessions = [];

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

// express configuration
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect('mongodb://localhost:27017/store', {
    "useNewUrlParser": true,
    "socketTimeoutMS": 0,
    "keepAlive": true,
    "useUnifiedTopology": true
});

const bookSchema = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
    "title": {
        type: String,
        required: true
    },
    "isbn": {
        type: String,
        required: true
    },
    "cover": {
        type: String,
        required: false
    },
    "year": {
        type: Number,
        default: 2016,
        min: 1920
    },
    "pages": {
        type: Number,
        default: 100,
        min: 1
    },
    "price": {
        type: Number,
        required: true,
        min: 0
    },
    "author": {
        type: String,
        required: true
    },
    "publisher": {
        type: String,
        required: true
    }
});

const Book = mongoose.model('books', bookSchema);

app.get('/books', function (req, res) {
    Book.find({}, function (err, result) {
        res.set('Content-Type', 'application/json');
        res.status(200).send(result);
    });
});

app.get('/books/:isbn', function (req, res) {
    Book.findOne({"isbn": req.params.isbn}, function (err, result) {
        res.set('Content-Type', 'application/json');
        res.status(200).send(result);
    });
});

app.get('/publishers', function (req, res) {
    Book.distinct({"publisher": 1}, function (err, result) {
        res.set('Content-Type', 'application/json');
        res.status(200).send(result);
    });
});

// POST /books
app.post('/books', function (req, res) {
    let book = req.body;
    book._id = mongoose.Types.ObjectId();
    let employee = new Book(book);
    employee.save(function (err, book) {
        res.set('Content-Type', 'application/json');
        if (!err)
            res.status(200).send(JSON.stringify(book));
        else
            res.status(403).send(JSON.stringify({status: err}));
    });
});

// PUT /books
app.put('/books', function (req, res) {
    let book = req.body;
    let updatedFields = {};
    let updateAllowableFields = ["price", "year", 'pages', "title", "cover"];
    for (let i in updateAllowableFields) {
        let field = updateAllowableFields[i];
        if (book.hasOwnProperty(field)) updatedFields[field] = book[field];
    }
    Book.findOneAndUpdate(
        {"isbn": book.isbn},
        {$set: updatedFields},
        {upsert: false},
        function (err) {
            res.set('Content-Type', 'application/json');
            if (!err)
                res.status(200).send(JSON.stringify(book));
            else
                res.status(403).send(JSON.stringify({status: err}));
        });
});

// DELETE /books/1
app.delete('/books/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    Book.findOneAndRemove({"isbn": isbn},
        function (err, book) {
            if (!err)
                res.status(200).send(book);
            else
                res.status(403).send(JSON.stringify({status: err}));
        }
    );
});


app.post('/purchases', function (req, res) {
    let purchase = req.body;
    sessions.forEach(socket => {
        socket.emit('bam', purchase);
    });
    res.status(200).send({status: "Ok"});
});

// socket.io configuration
const server = app.listen(port);
const socket_io = require('socket.io');

const io = socket_io(server, {
    "cors": {
        "origin": "*",
        "methods": ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`Connection is open for socket ${socket.id}`);
    sessions.push(socket);
    socket.on('disconnect', () => {
        console.log(`Connection is closed for socket ${socket.id}`);
        const index = sessions.indexOf(socket);
        if (index > -1) sessions.splice(index, 1);
    });
});

console.log(`Server is running at port ${port}...`);