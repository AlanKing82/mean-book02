/*The express.js file is where we conigure our Express application. This
is where we add everything related to the Express coniguration.*/

var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session');

module.exports = function(){
    var app = express();
    
    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }else if (process.env.NODE_ENV === 'production'){
        app.use(compress());
    }
    
    app.use(bodyParser.urlencoded({
        extended: true    
    }));
    
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    /*The session middleware adds a session object to all request objects in your application.*/
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    
    /*place below the call for the routing file*/
    app.use(express.static('./public'));
    
    return app;

};