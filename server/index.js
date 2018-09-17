const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const config = require('./config');
const authRoutes = require('./routers/auth');
const pageRoutes = require('./routers/pages');
const { mongoose } = require('./lib/db');

const app = express();

app.use(express.static('public'));

app.use(morgan(':method :url :status - :response-time ms'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  session({
    secret: 'fgsfdhgsirhgskfdhgs',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

const passport = require('./middleware/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);

app.use(pageRoutes);

app.listen(config.PORT, () => {
  console.log(`server started on port ${config.PORT}`);
});