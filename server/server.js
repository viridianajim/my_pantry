const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: 'raspberry',
  database: 'CRUDDataBase'
});
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/api/lookTheItem', (req, res) => {


  const nameP = req.body.nameP;
  const quantityP = req.body.quantityP;
  const barcodeP = req.body.barcodeP
  console.log("barCODEEEEEE", barcodeP);
  console.log("name of the product", nameP);
  console.log("name of the quantity", quantityP);



  const lookTheItem = "SELECT * FROM myproducts WHERE barcode = ?; "
      db.query(lookTheItem, [barcodeP], (err, result) => {


            if (result.length >= 1) {
                const sqlUpdate = "UPDATE myproducts SET quantity = ? WHERE barcode = ?;"
                db.query(sqlUpdate, [quantityP, barcodeP], (err, result) => {
                })}
            else if (result.length === 0) {
                const sqlInsert = "INSERT INTO myproducts (name, quantity, barcode) VALUES (?,?, ?);"
                db.query(sqlInsert, [nameP, quantityP, barcodeP], (err, result) => {
                console.log(result);
                console.log(err);
              })}
    console.log(result.length, "lengthjjjj")
  })
});





app.get('/holav2', (req, res) => {

  const barcodeP = req.query.barcodeP
  const returnResult = ""
  console.log(req.query.barcodeP, "request")
  const lookTheItem = "SELECT quantity, name  FROM myproducts WHERE barcode = ?; "
  db.query(lookTheItem, [barcodeP], (err, result) => {

      console.log(result, "name and quantity")

      if (isEmptyObject(result)) {
        console.log("Item does not exit in the db")
      }
      else {
        var returnResultAll = String(result)
        var returnResultQuantity = String(result[0]['quantity'])
        console.log(returnResultQuantity, "Return ")
        var returnResultName = String(result[0]['name'])
        console.log(returnResultName)
        //res.end(returnResultQuantity, returnResultName)
        res.end(returnResultQuantity)
        //res.end(returnResultName)
      }})
  })


function isEmptyObject(obj) {
  return !obj || Object.keys(obj).length === 0;
}

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
