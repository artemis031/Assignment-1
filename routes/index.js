var express = require('express');
var session = require('express-session');
var router = express.Router();
// var router = express();



router.use(session({secret: 'ssshhhhh'}));
var sess;


/* GET home page. */
router.get('/', function(req, res, next) {

	sess = req.session;
  
  	if(sess.body){
  		res.redirect('/users');
  	}
  	else{
  		res.render('index', { title: 'Express' });		
  	}
  
});




//	Proceed to login page
router.use('/login', function(req,res,next){
	sess = req.session;
	if(sess.body){
		res.redirect('/users');
	}
	// if(req.body.uname === "jeff" && req.body.psw === "padthebest"){
	// 	res.redirect('/users');
	// }
	else{
		if(req.body.uname === "jeff" && req.body.psw === "padthebest"){
			sess.body = req.body;
			res.redirect('/users');
		}
		else{
			res.redirect('/');
			// console.log("Invalid credentials.");		//render error page
		}
	}
});


router.use('/users', function(req,res,next){

	sess = req.session;

	if(sess.body){
		res.send(req.body);			//requests the files from the index.pug. Not working y
	}

	else{
		res.redirect('/');
	}



});


// router.post('/users', function(req, res, next) { 
// 	res.send(req.body); 
// });

router.get('*', function(req, res, next) { 
	sess = req.session;
	if(sess.body){
		res.redirect('/users');
	}
	else{
		res.redirect('/'); 
	}
});

module.exports = router;
