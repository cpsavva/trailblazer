/*Dependencies*/
const bodyParser = require('body-parser');
const override = require('method-override');
const exhandle = require('express-handlebars');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const passport = require("passport");
const cookieParser = require("cookie-parser");
var session = require('express-session');
var errorhandler = require('errorhandler');
var passportConfig = require('./config/passport');
var routes = require('./routes');

/*model sync */
const models = require('./models');
models.sequelize.sync();

/*use of /public content */
app.use(express.static(__dirname + '/public'));

/*Parse application/x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({extended: true}));

/*use of override */
app.use(override('_method'));

/*use of handlebars*/
app.engine('handlebars', exhandle({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(cookieParser())
app.set('trust proxy', 1) // trust first proxy

//need sessions to persist state of user
app.use(session({
  secret: '3or8h1o2h1o28u12o38j12',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);



if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}

/*require routes*/
require('./routes/park-routes.js')(app);
require('./routes/index.js')(app);


/*require inital nps database*/
var nps = require('./database/nps.js');

app.get('/', function(request,response){
	response.render('index')
})
/*starting express server*/
app.listen(port, function(){
	console.log("I am working")
	// nps.NPSaxios();
});