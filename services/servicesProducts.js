const faker= require('faker');

const getAllProducts = async function(req, res){
try {  const products=[];
  const {size}=req.query;
  const limit=size ||5;
  for (let index=0; index<limit; index++){
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image: faker.image.imageUrl()
    })
  }
  return products;

} catch (error) {
  console.log(error);
}
}
const createNewProduct= async function (req, res){
 try {
   const body= req.body;
   //aquí esto enviando los datos que quiero incluir en el body de la petición
   //iría realmente una llamada a la base de datos para incluir el nuevo dato
   //simulamos que la base de datos nos da el ok
   res.json ({
     ok: true,
     data: body
   })
 } catch (error) {
    console.log(error);

 }
}
const updateProduct = async function (req,res){
 try {
   const {id}= req.params;
   const body= req.body;

   res.json ({
     ok: true,
     message: "PATCH",
     data: body,
     id
   })
 } catch (error) {
  console.log(error);
 }

}

const deleteProduct=async function (req,res){
 try {
   const {id}= req.params;

   res.json ({
     ok: true,
     message: "deleted",
     id
   })
 } catch (error) {
  console.log(error);
 }
}

const getOneProduct=async function(req, res){
 try {
   const {id}=req.params;
   res.json({
     'id': id,
     'name:':'Teclado',
     'price': 2800,
     'category': 'tecnology'
   });
 } catch (error) {
  console.log(error);

 }
}

module.exports={getAllProducts,
                createNewProduct,
                updateProduct,
                deleteProduct,
                getOneProduct}
