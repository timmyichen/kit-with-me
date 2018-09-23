const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const config = require('./config');

const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/users');
const pageRoutes = require('./routers/pages');
const friendRoutes = require('./routers/friends');

const nextjs = require('./lib/next');
const { mongoose } = require('./lib/db');

const app = express();

nextjs.start();

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

app.use(nextjs.router);
app.use(authRoutes);
app.use(userRoutes);
app.use(pageRoutes);
app.use(friendRoutes);

app.listen(config.PORT, () => {
  console.log(`server started on port ${config.PORT}`);
});
