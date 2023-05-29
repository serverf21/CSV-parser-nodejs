var express = require('express');
var csv = require("csv-parser");
var router = express.Router();
var fs = require('fs');

var mongoose = require('mongoose');

var Product = mongoose.model('Products');

var csvfile = __dirname + "/../public/files/products.csv";
var stream = fs.createReadStream(csvfile);


/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Import CSV using NodeJS' });

}).get('/import', function (req, res, next) {

  var products = []
  var csvStream = csv()
    .on("data", async function (data) {
      // console.log(data);
      var item = await Product.create({
        name: data['Mobile Phone'],
        price: data['Price'],
        category: data['Category'],
        description: data['Description'],
        manufacturer: data['Manufacturer']
      });
      item.save();
      // console.log(item);

    }).on("end", function () {

    });

  stream.pipe(csvStream);
  res.json({ success: "Data imported successfully.", status: 200 });

}).get('/fetchdata', async function (req, res, next) {

  const findProducts = () => {
    return Product.find({}).exec();
  };

  findProducts()
    .then(docs => {
      // console.log(docs);
      res.json({ success: "Updated Successfully", status: 200, data: docs });
    })
    .catch(err => {
      throw err;
    });
});
module.exports = router;