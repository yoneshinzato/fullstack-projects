const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();

//carregar Usuário modelo
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");

//Rota de login de usuário
router.get("/login", (req, res) => {
  res.render("usuarios/login");
});

//Rota de registro de usuário
router.get("/registrar", (req, res) => {
  res.render("usuarios/registrar");
});

//form do login post
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/ideias",
    failureRedirect: "/usuarios/login",
    failureFlash: true
    //next: do quickpassport
    //local - passport
    //failure Flash messages true
  })(req, res, next);
});

//Registrar formulario post
router.post("/registrar", (req, res) => {
  let errors = [];
  if (req.body.password != req.body.password2) {
    errors.push({ text: "As senhas não coincidem" });
  }

  if (req.body.password.length < 6) {
    errors.push({ text: "As senhas devem ter pelo menos 6 caracteres" });
  }
  //o formulário não irá "limpar", caso não esteja preenchido corretamente, ñ renderizará de novo
  if (errors.length > 0) {
    res.render("usuarios/registrar", {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    Usuario.findOne({ email: req.body.email }).then(usuario => {
      if (usuario) {
        //se tiver um usuário com o email acima
        req.flash("mensagem_erro", "Este e-mail já está registrado");
        res.redirect("/usuarios/registrar");
      } else {
        const novoUsuario = new Usuario({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        //encripta o password (hash)
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(novoUsuario.password, salt, (err, hash) => {
            if (err) throw err;
            novoUsuario.password = hash;
            novoUsuario
              .save()
              .then(usuario => {
                req.flash(
                  "mensagem_sucesso",
                  "Regitro feito com sucesso! Agora você pode fazer login."
                );
                res.redirect("/usuarios/login");
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
});

//deslogar usuário
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("mensagem_sucesso", "Você está deslogado");
  res.redirect("/usuarios/login");
});

module.exports = router;
