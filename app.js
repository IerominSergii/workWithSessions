const path = require('path');
const cookieSession = require('cookie-session');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

app.set('trust proxy', 1); // trust first proxy

app.use(cookieSession({
  name: 'sessionEEE',
  keys: ['username!!!!', 'Serg'],

  // Cookie Options

  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', (request, response, next) => {
  console.log(request.sessionCookies);
  next();
});

app.get('/', (request, response, next) => {
  response.render('home', {
    name: 'John',
  });
});

// app.post('/', )

app.listen(port, (error) => {
  if (error) {
    return console.log('Something bad happened', error);
    throw error;
  }

  console.log(`Server is listening on port ${port}`);
});
