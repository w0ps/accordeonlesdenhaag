
/**
 * Module dependencies.
 */

var express = require('express'),
    routes =  require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    sendMail = new (require('./mailgunner.js').Mailgun)({
      "domain": "w0ps.mailgun.org",
      "key": "key-092ucndkyk7bg45f-o5h17nkbxuhozl9",
      "defaultAddress": "boszdekler@gmail.com"
    }).sendMail
;
var app = express(),
    formTokens = {};

var oneYear = 31557600000,
    clientCacheLimit = 0, //oneYear,
    domainStraighter = function(){
      return function(req, res){
        console.log(req.querystring); 
        if(req.host == 'accordeonlesdenhaag.nl') res.redirect('http://www.accordeonlesdenhaag.nl' + req.path );
        else req.next();
      };
    };

app.configure(function(){
  app.set('port', 8052);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(path.join(__dirname, 'public'), { maxAge: clientCacheLimit } ));
  app.use(require('less-middleware')( { src: __dirname + '/public' } ));
  app.use(express.errorHandler());
  
  app.use(express.favicon(__dirname + ' /static/images/favicon.ico '));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  
  app.use(express.cookieParser('sweet sensemilla'));
  app.use(express.session());
  
  app.use(domainStraighter());
  
  app.use(app.router);
  //app.use(function(){ console.log(arguments); });
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function() {});

app.locals.generateToken = function(formName) {
  var str = Math.random();
  formTokens[str] = new Date;
  return str;
};

app.get('/', routes.nl.index);
app.get('/nl/', routes.nl.index);
app.get('/en/', routes.en.index);

for(var i in routes.nl){
  app.get('/nl/' + i, routes.nl[i]);
}
for(var i in routes.en){
  app.get('/en/' + i, routes.en[i]);
}

app.post('/contactform', function(req, res){
  console.log(req.body);
  res.redirect('/');
  if(formTokens[req.body.token]){
    
    var lang = req.body.lang;
    delete req.body.lang;
    delete formTokens[req.body.token];
    delete req.body.token;
    
    //send copy to submitter    
    sendMail({
      from: req.body.email,
      subject: lang == 'nl' ?
        'Een accordeonles reactie van ' + req.body.name + '.' :
        'An accordion lesson response from ' + req.body.name + '.',
      text: lang == 'nl' ?
        'Naam: ' + req.body.name + ', tel: ' + req.body.tel + ', opmerking: ' + req.body.remark :
        'Name: ' + req.body.name + ', tel: ' + req.body.tel + ', remark: ' + req.body.remark
    }, console.log);
    
    //send copy to receiver    
    sendMail({
      to: req.body.email,
      subject: lang == 'nl' ?
        'Your accordion lessons application' :
        'Uw accordeonles aanvraag',
      text: lang == 'nl' ?
        'Beste ' + req.body.name + ', bedankt voor uw aanmelding. De gegevens die u ingevuld heeft: telefoonnr: ' + req.body.tel + ', uw opmerking: ' + req.body.remark + '. Ik neem zo snel mogelijk contact met u op, mocht u nog vragen hebben dan kunt u antwoorden op deze mail of mij telefonisch bereiken op 06-15465232. Met vriendelijke groet, Bosz de Kler' :
        'Dear ' + req.body.name + ", thanks for your application, this is the information you've filled in: telephone number: " + req.body.tel + ', your remark: ' + req.body.remark + '. I will contact you as soon as possible, if you have any further questions you can reply to this email or call me at 06-15465232. Regards, Bosz de Kler'
    }, console.log);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
