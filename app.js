const express = require("express");
const Contenedor = require("./class/contenedor");
const handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views/layouts"));

const productos = new Contenedor(__dirname + "/data/productos.json");
const messages = []

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    partialsDir: __dirname + "/views/partials",
  })
);
app.set("views", "./views");
app.set("views engine", "hbs");

app.get("/", (req, res) => {
  let content = productos.content;
  let boolean = content.length !== 0;
  return res.render("layouts/main.hbs", {
    list: content,
    showList: boolean,
  });
});

app.post("/", (req, res) => {
  productos.save(req.body);
  let content = productos.content;
  let boolean = content.length !== 0;
  return res.render("layouts/main.hbs", { list: content, showList: boolean });
});

httpServer.listen(process.env.PORT || 8080, () => {
  console.log("SERVER ON");
});

/* CHAT */
io.on('connection', socket => {
  console.log(`Se conecto un usuario: ${socket.id}`)
  socket.emit('server:mensajes', messagesArray)

  socket.on('client:message', messageInfo => {
      messagesArray.push(messageInfo)
      
      io.emit('server:mensajes', messagesArray)
    });
  });