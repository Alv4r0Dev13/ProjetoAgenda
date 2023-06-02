require('dotenv').config();
const path = require('path');

// EXPRESS
const express = require('express');
const app = express();
const routes = require(path.resolve(__dirname, 'src', 'routes'));
const port = 3000;

// DATABASE
const mongoose = require('mongoose');
const dbConn = 'Database connected';
async function connect() {
  await mongoose.connect(process.env.CONNECTION_STRING, { writeConcern: { wtimeout: 30000 } })
    .then(() => {
      console.log(dbConn);
      app.emit(dbConn);
    }).catch(err => console.log(err));
} connect();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(helmet());

const sessionOptions = session({
  secret: 'dandiralidandandandam pararara dandiralidandandandam pararara',
  store: new MongoStore({ mongoUrl: process.env.CONNECTION_STRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(flash());

// SECURITY
const helmet = require('helmet');
const csurf = require('csurf');
const { checkCsrfError, csrfMiddleware } =
  require(path.resolve(__dirname, 'src', 'middlewares', 'csrfMiddlewares'));
app.use(csurf());
app.use(checkCsrfError);
app.use(csrfMiddleware);

// SERVER
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(routes);

app.on(dbConn, () => app.listen(port, () =>
  console.log(`Server listening on port ${port}\nAccess http://localhost:${port}`)
));