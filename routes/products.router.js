const express = require('express');
const router = express.Router();
const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schema/product.schema');
const services = new ProductService();

router.get('/', async (req, res) => {
  const products = await services.find();
  res.json(products);
});
router.get('/filter', (req, res) => {
  res.send('hola soy filter :D');
});
router.get(
  '/:id',// es un ida entonces para el middleware ponemos un getProductSchema
  validatorHandler(getProductSchema,'params'), // hacemos una validacion de datos antes y quremos que la informacion venga de paramas
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await services.finOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/',
validatorHandler(createProductSchema,'body'),
async (req, res) => {
  const body = req.body;
  const newProduct = await services.create(body);
  res.status(201).json(newProduct);
});
router.patch('/:id',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await services.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id',
validatorHandler(getProductSchema,'params'),
async (req, res) => {
  const { id } = req.params;
  // const body= req.body;
  const rta = await services.delete(id);
  res.json(rta);
});

module.exports = router;
