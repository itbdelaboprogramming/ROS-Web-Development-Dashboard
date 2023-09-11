const {MongoClient} = require('mongodb')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const fs = require('fs')
const Mapp = require('../models/mapimg')
// const Grid = require('gridfs-stream');


const app = express()

// const db = 'mongodb+srv://haritsfai713:711320@cluster0.s4b2n.mongodb.net/?retryWrites=true&w=majority'
const dbe = 'mongodb+srv://haritsfai713:711320@cluster0.s4b2n.mongodb.net/mydb?retryWrites=true&w=majority'
const conn = mongoose.createConnection(dbe);
// const client = new MongoClient(db)

// let gfs;

// mongoose.connect(db,err => {
//   if(err){
//     console.log('Error!'+err)
//   }
//   else{
//     console.log('Connected to mongodb')
//   }
// })

// client.connect();
// console.log('Connected to mongodb');
// const collection = client.collection('mycollection');
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  router.get('/:filename', (req, res) => {
    gfs.files.findOne({ name: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }

      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
  });
});


router.get('/',(req,res)=>{
  res.send('From Map route')
})

router.get('/:id',(req,res) => {
  const id = req.params.id;
  console.log(id)

    // Query the MongoDB to get the image file
    Mapp.find({ name: id }, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving image');
      } else {
        const image = result.pgm;
        console.log(image)

        const buffer = Buffer.from(image.data.buffer);
        res.set('Content-Type', 'image/jpeg');
        res.send(buffer);

        // Read the image file from the disk
        // fs.readFile(image.path, (err, data) => {
        //   if (err) {
        //     console.log(err);
        //     res.status(500).send('Error retrieving image');
        //   } else {
        //     // Set the response headers to indicate that the response is an image
        //     res.setHeader('Content-Type', image.mimetype);
        //     res.setHeader('Content-Length', image.size);

        //     // Send the image file as a response
        //     res.send(data);
        //   }
        // });
      }
    });


})

module.exports=router
