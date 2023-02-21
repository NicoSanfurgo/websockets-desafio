import express from "express";
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.routes.js';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import ProductManager from "./managers/ProductManager.js";

const app = express();
const httpServer = app.listen(8080, () => console.log('Server up in port 8080'))

const io = new Server(httpServer)


// handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'hbs')
app.set('views', `${__dirname}/views`)
app.use(express.static(`${__dirname}/public`))

// Routes
app.use('/', viewsRouter)

const products = new ProductManager(`${__dirname}/productos.json`)

// Sockets
io.on('connection', (socket) => {
    console.log('se conecto un cliente');

    io.sockets.emit('products', products.getProducts())

    socket.on('new_prod', (data) => {
        products.addProduct(data)
        
        io.sockets.emit('products', products.getProducts())
    })

    socket.on('delete_prod', (data) => {
        products.deleteProduct(data.pid)

        io.sockets.emit('products', products.getProducts())
    })
})