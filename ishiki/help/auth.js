module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("mensagem_erro", "Não autorizado");
    res.redirect("usuarios/login");
  }
};
