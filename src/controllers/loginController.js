const path = require('path');
const Login = require(path.resolve(__dirname, '..', 'models', 'loginModel'));

const indexLogin = (req, res) => {
  if (req.session.user) return res.render('user-logged');
  return res.render('login');
};

const login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => {
        res.redirect('/login');
      });
      return;
    }

    req.flash('success', 'Você entrou no sistema!');
    req.session.user = login.user;
    req.session.save(() => {
      res.redirect('/login');
    });
    return;
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const indexSignin = (req, res) => {
  res.render('signin');
};

const register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => {
        res.redirect('/signin');
      });
      return;
    }

    req.flash('success', 'Usuário criado com sucesso!');
    req.session.save(() => {
      res.redirect('/signin');
    });
    return;
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

module.exports = {
  indexLogin,
  login,
  logout,
  indexSignin,
  register
};