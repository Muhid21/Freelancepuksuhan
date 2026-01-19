

const getAllUsers =async function(req,res){
  try {
    const {limit, offset}=req.query;
  if (limit && offset){
    res.json({
      limit,
      offset
    })
  }else {
    res.send('No hay parámetros');
  }
  } catch (error) {
     console.log(error);
  }

}
module.exports={getAllUsers}
