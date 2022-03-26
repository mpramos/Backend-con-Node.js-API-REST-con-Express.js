const faker = require('faker');
const boom= require('@hapi/boom');
class ProductService {
  constructor() {
    // array en memoria
    this.products = [];
    //cada que se instancie este servicio va a generar
    // estos valores iniciales
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        // crea un booleano de forma randomica
        isBlock : faker.datatype.boolean(),
      });
    }
  }
  // en data recibimos la informacion que queremos crear
  async create(data) {
    const newProduct = {
      // el id lo generamos nosotros
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    // returna los productos
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this.products)
      },5000);
    })
  }
  async finOne(id) {
    const product = this.products.find((product) => product.id === id);
    // si no encontramos un producto mandamos un error
    if(!product)
      throw boom.notFound('product not found :v')
    // si esta bloquedado el producto no va a permitir retornar ese producto
    if(product.isBlock)
      throw boom.conflict('product is block'); // como el error es de la logica del negocio le vamos a decir q es un conflicto
    return product;
  }
  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {

      throw boom.notFound('product not Found');
    }
    const product=this.products[index];
    this.products[index]={
      ...product,
      ...changes
    };
    return this.products[index];
  }
  async delete(id) {
    // necesito saber en que posicion del array está
    const index = this.products.findIndex((product) => product.id === id);
    // Sin index no encuentra un elemento lo más normal es que nos lance un -1
    if (index === -1) {
      throw new boom.notFound('product not found');
    }
    // para poder elminar esa posicion y el mismo elemetno
    this.products.splice(index,1)
    return {id};
  }
}
module.exports = ProductService;
