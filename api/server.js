var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var PORT = process.env.PORT || 8080
var app = express();

app.use(express.static(__dirname + './../app/'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.listen(PORT, function() {
	console.log('Server Started on ' + PORT);
	console.log('Press CTRL + C to stop server');
});

app.post('/api/email', function(req,res){
	console.log(req.body);
	var comp_name = req.body.comp_name;
	var cont_name = req.body.cont_name;
	var phone = req.body.phone;
	var email = req.body.email;
	var budget = req.body.budget;
	var text = "Company Name: " + comp_name + "\n"
	         + "Contact Name: " + cont_name + "\n" 
	         + "Phone: " + phone + "\n"
	         + "Email: " + email + "\n"
	         + "Budget: " + budget; 
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth:{
			user: 'iterencei.site@gmail.com',
			pass: 'iterencei123'
		}
	});

	var mailOptions = {
		from: 'iterencei.site@gmail.com',
		to: 'iterencei@hotmail.com',
		subject: 'Site Quote Inquiry',
		text: text
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.status(400)
			res.send({yo: 'error'});
		} else {
			console.log("Message sent: " + info.response);
			res.json({yo: info.response});
		}
	})
})