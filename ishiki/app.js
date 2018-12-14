const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");

const app = express();

//carregando rotas
const ideias = require("./routes/ideias");
const usuarios = require("./routes/usuarios");

//config do passport
require("./config/passport")(passport);
const db = require("./config/database");

//mapear promise global pra se livrar dos warnings
mongoose.Promise = global.Promise;
//conectar ao mongoose
mongoose
  .connect(
    db.mongoURI,
    //por enquanto está no banco local
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

//handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//definirá como default o layout main
app.set("view engine", "handlebars");

// body parser middleware
//acessar o que foi enviado no form de ideia
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//métdo override middleware
app.use(methodOverride("_method"));

//express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//middleware do passport
app.use(passport.initialize());
app.use(passport.session());

//o flash que trouxe lá de cima
app.use(flash());

//variáveis globais
app.use(function(req, res, next) {
  res.locals.mensagem_sucesso = req.flash("mensagem_sucesso");
  res.locals.mensagem_erro = req.flash("mensagem_erro");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//iNDEX route
//rota tem que ter req res
app.get("/", (req, res) => {
  const title = "Boom, wow!";
  res.render("index", {
    title: title
  });
});
//variável será chamada em index

//rota Sobre
app.get("/sobre", (req, res) => {
  const titulo = "Sobre";
  res.render("sobre", {
    titulo: titulo
  });
});

//utilizando a rota do arquivo ideias e usuarios
app.use("/ideias", ideias);
app.use("/usuarios", usuarios);

// const port = 5000;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server  ${port}`);
});
