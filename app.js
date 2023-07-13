// App.js
var http = require('http');
var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose")
// const User = require("./src/model/User");
const UserSchema = require("./src/model/usermessage");
const path = require("path");
const app = express();
const hbs = require("hbs");

// mongoose.connect("mongodb://localhost/27017/newCollection");
require("./src/db/conn");
const Register = require("./src/model/register");

// Passport Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public')); // sooooooo important to include css file 

const static_path = path.join(__dirname, '../public')
const template_path = path.join(__dirname, 'templates/views')
const partials_path = path.join(__dirname, 'templates/partials')

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine", "ejs");
app.set("view engine", "hbs");
app.set("views", template_path); 
hbs.registerPartials(partials_path);

//middleware
app.use('/css', express.static(path.join(__dirname, "../tourisme project - Copy/node_modules/bootstrap/dist/css")))
app.use('/js', express.static(path.join(__dirname, "../tourisme project - Copy/node_modules/bootstrap/dist/js")))
app.use('/jq', express.static(path.join(__dirname, "../tourisme project - Copy/node_modules/jquery/dist")))
//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
	// res.render("home");
	res.render("index");
});

app.get("/contact", function (req, res) {
	res.render("contact");
	// res.send("We are here");
});
app.post("/contact", async(req, res) => {
	try{
		// res.send(req.body);
		const userData = new UserSchema(req.body);
		await userData.save();
		res.status(201).render("index");
	} catch (error) {
		res.status(500).send(error);
	}
})

// Showing secret page
// app.get("/secret", isLoggedIn, function (req, res) {
// 	res.render("secret");
// });

// Showing register form
app.get("/register", function (req, res) {
	res.render("register");
});

// Handling user signup
app.post("/register", async (req, res) => {
	try{
		const password = req.body.password;
		const cpassword = req.body.confirmpassword;

		if(password == cpassword){
			const registerEmployee = new Register({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				phone:req.body.phone,
				email:req.body.email,
				gender:req.body.gender,
				password:password,
				confirmpassword:cpassword
			})

			const registered = await registerEmployee.save();
			res.setHeader('Content-Type','text/html');
			res.status(201).render("index");
		}else{
			res.send("password are not matching")
		}
		console.log("first is "+ req.body.firstname + " " + req.body.lastname);
		res.send(req.body.firstname);
					// return res.status(201).redirect("/");
	}
	catch(error){
		res.status(400).send(error);
	}}
	// const user = await User.create({
	// username: req.body.username,
	// password: req.body.password
	// });
	// 
	// return res.status(200).json(user);
// }
);



//Showing login form
app.get("/login", function (req, res) {
	res.render("login");
	// if(true){
	// 	res.redirect("/");
	// }
	// else{ console.log("something wrong");}
});

//Handling user login
app.post("/login", async function(req, res){
	try {
		// check if the user exists
		const user = await UserSchema.findOne({ username: req.body.username });
		if (user) {
		//check if password matches
		const result = req.body.password === user.password;
		if (result) {
			res.render("secret");
		} else {
			res.status(400).json({ error: "password doesn't match" });
		}
		} else {
		res.status(400).json({ error: "User doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
});

// app.use(function (err, req, res, next) {
    // console.log(err.stack);
    // res.type('text/plain');
    // res.status(500);
    // res.send('500 Server Error');
// });
// 
//Handling user logout
app.get("/logout", function (req, res) {
	req.logout(function(err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

app.get("/flights", function (req, res) {
	
		res.render("flights");
});


var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});



