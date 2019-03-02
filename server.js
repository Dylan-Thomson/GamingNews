require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(flash());

// Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUnitialized: true,
    resave: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
  }),
);
app.set('view engine', 'handlebars');

app.listen(PORT, () => {
  console.log(
    '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
    PORT,
    PORT,
  );
});