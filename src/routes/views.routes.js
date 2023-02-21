import { Router } from "express";
import ProductManager from "../managers/ProductManager.js"
import __dirname from '../utils.js';

const products = new ProductManager('./src/productos.json')
const router = Router();

router.get('/', (req, res) => {
    const list = products.getProducts()
    res.render('home', {products: list})
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts', {})
})

export default router;