const documentRouter = require('express').Router()
const Document = require('../models/document')
const User = require('../models/user')

documentRouter.get('/', async (request, response) => {
  const document = await Document
  .find({}).populate('user', { username: 1, name: 1 })

  response.json(document)
})

const config = require('../utils/config')
const url = config.MONGODB_URI
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

module.exports = (upload) => {
  const connect = mongoose.createConnection(url, 
    { useNewUrlParser: true, useUnifiedTopology: true }
    );
  console.log(`its here`)
  let gfs;
  console.log(`and here`)
  connect.once('open', () => {
      // initialize stream
      grf = Grid(connect.db, mongoose.mongo);
      gfs = new mongoose.mongo.GridFSBucket(connect.db, {
          bucketName: 'uploads'
      });
      console.log(`connected with gfs`)
      console.log('yeh')
    
      console.log(gfs.find().readBufferedDocuments)
  });
  // connect.once('open', () => {
  //   // Init stream
  //   gfs = Grid(connect.db, mongoose.mongo);
  //   gfs.collection('uploads');
  // });

  /*
      POST: Upload a single document/file to Document collection
  */
  documentRouter.route('/')
    .post(upload.single('file'), (req, res, next) => {
      // check for existing documents
      Document.findOne({ filename: req.body.filename})
        .then((document) => {

          if (document) {
            return res.status(200).json({
              success: false,
              message: 'Document already exists',
            });
          }

          let newDocument = new Document({
            caption: req.body.caption,
            filename: req.file.filename,
            fileId: req.file.id,
          });

          newDocument.save()
            .then((document) => {
              res.status(200).json({
                success: true,
                document,
              });
            })
            .catch(err => res.status(501).json(err));
        })
        .catch(err => res.status(502).json(err));
    })
    .get((req, res, next) => {
      Document.find({})
        .then(documents => {
          res.status(200).json({
            success: true,
            documents,
          });
        })
        .catch(err => res.status(503).json(err));
    });

  /*
      GET: Delete an document from the collection
  */
  documentRouter.route('/delete/:id')
  .get((req, res, next) => {
    Document.findOne({ _id: req.params.id })
      .then((document) => {
        if (document) {
          Document.deleteOne({ _id: req.params.id })
            .then(() => {
              return res.status(200).json({
                success: true,
                message: `File with ID: ${req.params.id} deleted`,
              });
            })
            .catch(err => { return res.status(500).json(err) });
        } else {
          res.status(200).json({
            success: false,
            message: `File with ID: ${req.params.id} not found`,
          });
        }
      })
      .catch(err => res.status(500).json(err));
  });

  /*
      GET: Fetch most recently added record
  */
  documentRouter.route('/recent')
    .get((req, res, next) => {
      Document.findOne({}, {}, { sort: { '_id': -1 } })
        .then((document) => {
          res.status(200).json({
            success: true,
            document,
          });
        })
        .catch(err => res.status(500).json(err));
    });

  /*
      POST: Upload multiple files upto 3
  */
  documentRouter.route('/multiple')
    .post(upload.array('file', 3), (req, res, next) => {
      res.status(200).json({
        success: true,
        message: `${req.files.length} files uploaded successfully`,
      });
    });

  /*
      GET: Fetches all the files in the uploads collection
  */
  documentRouter.route('/files')
    .get(async (req, res, next) => {
      const cursor = await gfs.find()
      cursor.toArray((err, files) => {
        if (err) return res.status(400).json({ err });

        if (!files || files.length === 0) {
          console.log("checking 1")
          return res.status(200).json({
            success: false,
            message: 'No files available'
          });
        }

        files.map(file => {
          if (file.contentType === 'application/pdf' || file.contentType === 'application/doc' || file.contentType === 'application/docx') {
            file.isDocument = true;
          } else {
            file.isDocument = false;
          }
        });

        res.status(200).json({
          success: true,
          files,
        });
      });
    });

  /*
      GET: Fetches a particular file by filename
  */
  documentRouter.route('/file/:filename')
    .get(async (req, res, next) => {
      gfs.find({ filename: req.params.filename }).toArray((err, files) => {
        if (!files[0] || files.length === 0) {
          return res.status(200).json({
            success: false,
            message: 'No files available',
          });
        }

        res.status(200).json({
            success: true,
            file: files[0],
        });
      });
    });

  /* 
      GET: Fetches a particular document and render on browser
  */
  documentRouter.route('/document/:filename')
    .get(async (req, res, next) => {
      console.log(req.params.filename)
        await gfs.find({ filename: req.params.filename }).toArray((err, files) => {
          if (!files[0] || files.length === 0) {
            return res.status(200).json({
              success: false,
              message: 'No files available',
            });
          }

          if (files[0].contentType === 'application/pdf' || files[0].contentType === 'application/doc' || files[0].contentType === 'application/docx') {
              // render document to browser
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
          } else {
            res.status(404).json({
              err: 'Not an document',
            });
          }
        });
    });

  /*
      DELETE: Delete a particular file by an ID
  */
  documentRouter.route('/file/del/:id')
    .post((req, res, next) => {
      console.log(req.params.id);
      gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
        if (err) {
          return res.status(404).json({ err: err });
        }

        res.status(200).json({
          success: true,
          message: `File with ID ${req.params.id} is deleted`,
        });
      });
    });

  return documentRouter;
};