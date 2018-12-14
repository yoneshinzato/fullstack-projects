const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//carregar usuário modelo
const Usuario = mongoose.model("usuarios");

//carregar uma função que conterá a estratégia
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //ver se o usuário existe
      Usuario.findOne({
        email: email
      }).then(usuario => {
        if (!usuario) {
          return done(null, false, {
            message: "Usuário não encontrado"
          });
        }
        //null = erro, false = usuario, mensagem: usuario nao encontrado
        //verificar se password dá match
        bcrypt.compare(password, usuario.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, usuario);
          } else {
            return done(null, false, {
              message: "Password incorreto"
            });
          }
        });
      });
    })
  );

  passport.serializeUser(function(usuario, done) {
    done(null, usuario.id);
  });

  passport.deserializeUser(function(id, done) {
    Usuario.findById(id, function(err, usuario) {
      done(err, usuario);
    });
  });
};
