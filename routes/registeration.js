var express = require('express');
var router = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.database_user,
    password: process.env.database_password,
    database: 'CsiManagementSystem'
});

connection.connect(function(err) {
    if (!err) {
        console.log('Connected to MySql!\n');
    } else {
        console.log(err);
    }
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/register',(req,res)=>{
//var count = 0;		
Staff.countDocuments({}, function( err, count){
    /*console.log( "Number of users:", count );
    	//doctorId++;
	console.log(staffId);*/
	const contactNumber = req.body.phone;
	const firstName = req.body.fname;
	const lastName = req.body.lname;
	const gender = req.body.gender;
	const email = req.body.email;
	const password = req.body.password;
	console.log(doctorAddress)

	/*var hash = md5(password);
	console.log(password);
	console.log(hash);
	console.log("inside it");
	console.log("asd"+doctorAddress);*/
	
 	//const dataArray = {staffId: staffId,firstName: firstName, lastName: lastName,password: hash,role: 1,registeration_time: time ,isBlocked: false ,isDeleted: false,mobileNumber:contactNumber,designation:designation,domain:domain,email:email,maritalStatus:maritalStatus,dob:dob};
	connection.query('INSERT INTO request VALUES(?,?,?,?,?,?)',[firstName, lastName, password, email, contactNumber, gender]function(err,results,fields){
		if (err){
			console.log(err);			
			res.sendStatus(400);
		}
		else{
				res.sendStatus(200);
				console.log("Data Inserted");
			}
		});

	/*var data = Staff(dataArray);
	data.save()
	.then(result => {
	console.log(result);
	console.log("success");*/
	

	// 	insertion in blockchain
	let temp = set_doctor_registeration(staffId,doctorAddress);
	console.log("saddas"+temp);
	let temp2=timepass(staffId);
	console.log(temp2);
		res.render("login");
	})





    //temp_count = count;
})




});