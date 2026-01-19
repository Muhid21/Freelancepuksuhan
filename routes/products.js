var express = require('express');
const productServices =require ("../services/servicesProducts")
const router= express.Router();

router.get('/', async function(req, res){  //llamo a la función
  const products= await productServices.getAllProducts(req,res); //me quedo en espera de la respuesta.
  res.json(products);
});

router.post('/', async function(req, res){
 const createProduct= await productServices.createNewProduct(req,res);
 return createProduct;
})

router.patch('/:id', async function(req, res){
  const updatedProduct= await productServices.updateProduct(req,res);
  res.json(updatedProduct);

})
router.delete('/:id', async function(req, res){
 const deletedProduct=await productServices.deleteProduct(req,res);
 return deletedProduct;
})

router.get('/:id', async function(req, res){
   const getOneProduct= await productServices.getOneProduct(req,res);
   return getOneProduct;
});

module.exports = router;
