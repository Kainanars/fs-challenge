const express = require("express");
const router = express.Router();
const productsModel = require("../models/products");
const fs = require("fs");
// const productsModel = require(COMPLETE_O_CAMINHO); TODO

// GET - /products
router.get("/", function (req, res) {
  const productsData = productsModel.getProducts();

  res.render("products", {
    title: "Pagina de produtos",
    productsData: productsData,
  });
});

// POST - /products
function productsList(){
  if (fs.existsSync('productsList.txt')){
    return
  }else{
    return fs.writeFileSync('productsList.txt', '')
  }};


router.post("/", function (req, res) {

    var data = new Date()
    var dia = data.getDate();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    var hour = data.getHours();
    var min = data.getMinutes();
    data = "Data: " + dia + '/' + (mes++) + '/' + ano + " Hora: " + hour + ':' + min;
  
const newProduct = req.body;

  productsModel.insertProduct(newProduct);
  
  fs.appendFileSync('productsList.txt', '\n' + "new log"+ '\n' + 'Produto: ' + newProduct.title + ' ' +  data + ' - ' +  'Operação de Cadastro');
  res.redirect("/products");
});

module.exports = router;
