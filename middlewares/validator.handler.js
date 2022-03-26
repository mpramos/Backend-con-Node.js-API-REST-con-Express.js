const boom=require('@hapi/boom')
function validatorHandler(schema, property) {
  // creacion del middleware de forma dinamica
  return (req, res, next) => {
    // la informacion está en una propiedad dinamica
    const data=req[property];
    //validamos el esquema mandando el data osea la informacion
    const {error}=schema.validate(data,{abortEarly:false});
// si no cumple con la validacion
    if(error){
      //deberia mandar un error tipo boom esto lo mando a los middlewares que manejan los errores
    next(boom.badRequest(error));
    }
    // permitira usar el servicio y crear como tal en meoria o en la base de datos
    next();
  };
}
module.exports = validatorHandler;
