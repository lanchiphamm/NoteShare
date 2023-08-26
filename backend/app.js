const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const createError = require('http-errors');
// const loginRouter = require('./controllers/users')

// Mongo DB Setup
mongoose.set('strictQuery', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())

// GridFS Storage Test START
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream');
const crypto = require('crypto')
const documentRouter = require('./controllers/documents')
const path = require('path');

const storage = new GridFsStorage({
  url: config.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        console.log(filename)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage })

app.set('view engine', 'jade');
app.use(express.static('build'))
app.use(express.json())
app.use('/documents', documentRouter(upload))
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// app.use('/api/login', loginRouter)
// GridFS Storage Test END
module.exports = app