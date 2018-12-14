const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { ensureAuthenticated } = require("../help/auth");
//carregar Help

//carregar o modelo Ideia
require("../models/Ideia");
const Ideia = mongoose.model("ideias");

//tirar o /ideias porque a rota já tá direcionada para cá
//página Ideia index
router.get("/", ensureAuthenticated, (req, res) => {
  Ideia.find({ user: req.user.id })
    .sort({ date: "desc" })
    .then(ideias => {
      res.render("ideias/index", {
        ideias: ideias
      });
    });
});

//adicionar ideias
router.get("/adicionar", ensureAuthenticated, (req, res) => {
  res.render("ideias/adicionar");
});

//editar ideias - vai pelo id
router.get("/editar/:id", ensureAuthenticated, (req, res) => {
  Ideia.findOne({
    _id: req.params.id
  }).then(ideia => {
    if (ideia.user != req.user.id) {
      req.flash(
        "mensagem_erro",
        "Você não está autorizado a executar essa ação"
      );
      res.redirect("/ideias");
    } else {
      res.render("ideias/editar", {
        ideia: ideia
      });
    }
  });
});

//processar formulário
router.post("/", ensureAuthenticated, (req, res) => {
  //no obj. req, acessa o body
  //acessa os valores do formulário de ideias
  let errors = [];

  if (!req.body.title) {
    errors.push({ text: "Adicionar um título, por gentileza." });
  }
  if (!req.body.details) {
    errors.push({ text: "Adicionar os detalhes da sua ideia, por favor." });
  }
  if (errors.length > 0) {
    res.render("/adicionar", {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
      user: req.user.id
    };
    new Ideia(newUser).save().then(ideia => {
      req.flash("mensagem_sucesso", "Ideia adicionada com sucesso!");
      res.redirect("/ideias");
    });
  }
});

//processo de edição de form
//VAI instalar o method override pq o method = post  precisa ser put
//dessa forma não precisa usar AJAX
router.put("/:id", ensureAuthenticated, (req, res) => {
  Ideia.findOne({
    _id: req.params.id
  }).then(ideia => {
    //novos valores
    (ideia.title = req.body.title), (ideia.details = req.body.details);

    ideia.save().then(ideia => {
      req.flash("mensagem_sucesso", "Ideia atualizada com sucesso!");
      res.redirect("/ideias");
    });
  });
});

//deletando ideia
router.delete("/:id", ensureAuthenticated, (req, res) => {
  Ideia.remove({ _id: req.params.id }).then(() => {
    req.flash("mensagem_sucesso", "Ideia deletada com sucesso!");
    res.redirect("/ideias");
  });
});

module.exports = router;
