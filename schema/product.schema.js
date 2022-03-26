const Joi= require('joi');
//FORMATO DE LOS CAMPOS
// tipo de campo
//validacion del tipo uuid
const id = Joi.string().uuid();
const name =Joi.string().min(3).max(15);
const price =Joi.number().integer().min(10);
const image=Joi.string().uri();
//creamis un squema para la cracion
//Ese esquema reuiniria todos los campos que queremos
const createProductSchema = Joi.object({
  name : name.required(),// para la creacion el nombre es requerido
  price: price.required(),
  image: image.required()

})
const updateProductSchema = Joi.object({
  name : name,// para la creacion el nombre es requerido
  price: price,
  image:image

})
// si tiene el id el formato correcto le decimos que pase y pueda hacerle consultas a la base de datos
const getProductSchema = Joi.object({
  id : id.required()

})
module.exports ={createProductSchema,updateProductSchema,getProductSchema}
