const http = require('http');
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const port=process.env.PORT || 8080;
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const macfromip = require('macfromip');
const md5 = require('md5');
const multer = require('multer');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var assert = require('assert');

let uploadData = multer();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
//setting the template engine
app.set('view engine','ejs');

//Defining the models
var Patient = require('./models/patient');
var Staff = require('./models/staff');
var Treatment = require('./models/treatment');

//Database Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/MediChain2', {useNewUrlParser: true});

//Web Connection
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
console.log(`Talking with a geth server ${web3.version.api} \n`);

const abiArray = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tId",
				"type": "string"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_dId",
				"type": "uint256[]"
			},
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "addDoctorIds",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_dId",
				"type": "uint256"
			},
			{
				"name": "_MAC",
				"type": "string[]"
			}
		],
		"name": "addMAC",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_dId",
				"type": "uint256"
			},
			{
				"name": "_pId",
				"type": "uint256"
			}
		],
		"name": "addPatients",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_pId",
				"type": "uint256"
			},
			{
				"name": "_tId",
				"type": "string"
			}
		],
		"name": "addTreatmentToPatient",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_dId",
				"type": "uint256"
			},
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "doctorRegisteration",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_pId",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "patientRegisteration",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tId",
				"type": "string"
			},
			{
				"name": "_key",
				"type": "string"
			}
		],
		"name": "setSecretKey",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_dId",
				"type": "uint256"
			}
		],
		"name": "getdoctorAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_dId",
				"type": "uint256"
			}
		],
		"name": "getMAC",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_dId",
				"type": "uint256"
			}
		],
		"name": "getPatientArray",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tId",
				"type": "string"
			}
		],
		"name": "getSecretKey",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_pId",
				"type": "uint256"
			}
		],
		"name": "getTreatmentArray",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const address = '0xf3e2b702e225fd75077a0c56b71e3b67c5440bc3';
const contract = web3.eth.contract(abiArray);
const contractInstance = contract.at(address);
web3.eth.defaultAccount = web3.eth.coinbase;

web3.eth.defaultAccount = "0xc30d881fcc531c6d88eb9d64732001f28ed0de72";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/',(req,res)=>{
	res.render("home");
});


app.get('/disease',function(req,res){
	res.render("disease");
});


// app.get('/getSearch', function(req,res){
// 	res.render("search");
// });


app.get('/doctor_register', (req,res)=>{
	res.render("doctor_register");
});

app.get('/patient_register', (req,res)=>{
	res.render("patient_register");
});

app.get('/nurse_register', (req,res)=>{
	res.render("nurse_register");
});

//Function to insert doctors data into blockchain
function set_doctor_registeration(staffId,doctorAddress) {
    return contractInstance.doctorRegisteration(staffId,doctorAddress,{ from: web3.eth.accounts[0], gas: 3000000 });
}

// var doctorId = 1;
// var PatientId=100;

//Doctor Registeration

app.post('/doctor_register',(req,res)=>{
var count = 0;		
Staff.countDocuments({}, function( err, count){
    console.log( "Number of users:", count );
    	//doctorId++;
	const staffId = count++;
	const contactNumber = req.body.phone;
	const firstName = req.body.first_name;
	const lastName = req.body.last_name;
	const dob = req.body.birthday;
	const gender = req.body.gender;
	const email = req.body.email;
	const maritalStatus = req.body.status;
	const domain = req.body.domain;
	const designation = req.body.designation;
	const password = req.body.password;
	const time = new Date();
	var doctorAddress = assignAddressForDoctor();

	var hash = md5(password);
	console.log(password);
	console.log(hash);
	console.log("inside it");
	console.log("asd"+doctorAddress);
	
 	const dataArray = {staffId: staffId,firstName: firstName, lastName: lastName,password: hash,role: 1,registeration_time: time ,isBlocked: false ,isDeleted: false,mobileNumber:contactNumber,designation:designation,domain:domain,email:email,maritalStatus:maritalStatus,dob:dob};
	
	var data = Staff(dataArray);
	data.save()
	.then(result => {
	console.log(result);
	console.log("success");
	

	// 	insertion in blockchain
	let temp = set_doctor_registeration(staffId,doctorAddress);
	//console.log("saddas"+temp);
		res.render("login");
	})



    //temp_count = count;
})




});

// var patientIdset=100;

//to call blockchain
function set_patient_registeration(_pId,_name) {
    return contractInstance.patientRegisteration(_pId,_name,{ from: web3.eth.accounts[0], gas: 3000000 });
}

app.get('/patient_register', function(req,res){
	res.render("patient_register");
});

//Patient registeration
app.post('/patient_register',(req,res)=>{
	var countp = 0;		
	Patient.countDocuments({}, function( err, countp){
    console.log( "Number of patient:", countp );
    	//doctorId++;
    const patientId = countp++;
	//const patientId = patientIdset;
	const mobileNumber = req.body.phone;
	const firstName = req.body.first_name;
	const lastName = req.body.last_name;
	const dob = req.body.birthday;
	const gender = req.body.gender;
	const email = req.body.email;
	const maritalStatus = req.body.status;
	const occupation = req.body.occupation;
	const time = new Date();
	const insured = req.body.insured;
	
	const dataArray = {patientId: patientId,firstName: firstName, lastName: lastName,registeration_time:time,mobileNumber:mobileNumber,dob:dob,gender:gender,email:email,occupation:occupation,insured:insured,maritalStatus:maritalStatus};
	
	var data = Patient(dataArray);
	data.save()
	.then(result => {
	console.log(result);
	console.log("success");
	//patientIdset++;


	//insertion in blockchain
	let temp = set_patient_registeration(patientId,firstName);
	//console.log(temp);
	res.render("login");
	})
	.catch(err => console.log(err));
});
});


//doctor login

app.get('/login', function(req,res){

	res.render("login");

});



function getDoctorno(staffId){
	return contractInstance.getDoctor(staffId,{ from: web3.eth.accounts[0], gas: 3000000 });
}

app.post('/mobile_login', function(req,res){
	
	var staffId = req.body.uname;
	var password = req.body.pass;
	console.log(password);
	console.log(md5(password))
 	//console.log(hash);
 	//var temp = "$2a$10$GuIMDdsadfsfo/5y.X9DcA92r5prOX4.q8PYagukgcpiXfOiYoHdT8LGNCjm";
	Staff.findOne({staffId : staffId},function(err , staff){
		if(err){
			console.log(err);
		}
		else{
			console.log(staff);
			console.log("found");
			//console.log("result is "+patients);
			//console.log("YE LE"+patients.password);
		 	//var hash = bcrypt.hashSync(password,bcrypt.genSaltSync(9));
		 	//let role=staff.role;
		 	//console.log(role);

		 	let hash = staff.password;
		 	console.log(hash)
		 	if(hash == md5(password)){

		 		console.log("sahi hia");
		 		let temp = staff.staffId;
		 		//var no = function getDoctorno(staffId);
		 		console.log(temp);
		 		var response={"success":"1","firstname":staff.firstName,"lastname":staff.lastName,"mobileNumber":staff.mobileNumber}

		 		//res.render("home"); //web
		 		res.send(response); //mobile

		 	}else{console.log("galat");
		 		//res.render("login");
		 	}

		 	//let temp = compare(password,hash);
		 	//let temp = bcrypt.compareSync(password,hash);
		 	//console.log(temp);
		}
		});	
});

//website login
app.post('/login', function(req,res){
	
	var staffId = req.body.uname;
	var password = req.body.pass;
	console.log(password);
	console.log(md5(password))
 	//console.log(hash);
 	//var temp = "$2a$10$GuIMDdsadfsfo/5y.X9DcA92r5prOX4.q8PYagukgcpiXfOiYoHdT8LGNCjm";
	Staff.findOne({staffId : staffId},function(err , staff){
		if(err){
			console.log(err);
		}
		else{
			console.log(staff);
			console.log("found");
			//console.log("result is "+patients);
			//console.log("YE LE"+patients.password);
		 	//var hash = bcrypt.hashSync(password,bcrypt.genSaltSync(9));
		 	//let role=staff.role;
		 	//console.log(role);

		 	let hash = staff.password;
		 	console.log(hash)
		 	if(hash == md5(password)){

		 		console.log("sahi hia");
		 		let temp = staff.staffId;
		 		//var no = function getDoctorno(staffId);
		 		//console.log(temp);
		 		//var response={"success":"1","firstname":staff.firstName,"lastname":staff.lastName,"mobileNumber":staff.mobileNumber}

		 		res.render("home"); //web
		 		//res.send(response); //mobile

		 	}else{console.log("galat");
		 		res.render("login");
		 	}

		 	//let temp = compare(password,hash);
		 	//let temp = bcrypt.compareSync(password,hash);
		 	//console.log(temp);
		}
		});	
});

//to get address from session which holds did
// function getAddress(doctorId){
// 	return contractInstance.getdoctorAddress(doctorId,{ from: web3.eth.accounts[9], gas: 3000000 });
// }

//let temp=getAddress(doctorId);


app.get('/nurse_registeration', (req,res)=>{
	res.render("nurse_register");
});


// function set_nurse(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress) {
//     return contractInstance.nusreRegisteration(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress,{ from: doctorAddress, gas: 3000000 });
// }


//Nurse Registeration
app.post('/nurse_registeration',(req,res)=>{

	const staffId = req.body.staffId;
	const contactNumber = req.body.phone;
	const firstName = req.body.first_name;
	const lastName = req.body.last_name;
	const dob = req.body.birthday;
	const gender = req.body.gender;
	const email = req.body.email;
	const maritalStatus = req.body.status;
	//const domain = req.body.domain;
	//const designation = req.body.designation;
	const password = req.body.password;
	const time = new Date().toLocaleTimeString();
	const nurseAddress = web3.eth.accounts[1];

	var hash = md5(password);
	console.log(password);
	console.log(hash);
	//const role = 1;
	console.log("inside it");
	console.log(nurseAddress);
	
	const dataArray = {staffId: staffId,firstName: firstName, lastName: lastName,password: hash,role: 2,registeration_time: time ,isBlocked: false ,isDeleted: false};
	
	var data = Staff(dataArray);
	data.save(dataArray)
	.then(result => {
	console.log(result);
	console.log("success");
	//insertion in blockchain
	//let temp = set_doctor(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress);
	//console.log(temp);
	})
	.catch(err => console.log(err));
	//mapping_MAC("");
	//const values = [contactNo,firstname,secondname,dob,gender,email,maritalStatus,occupation,insured,time];
	//doctorRegisteration(parameter);
});


app.get('/receptionist_registeration', (req,res)=>{
	res.render("receptionist_register");
});



// function set_nurse(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress) {
//     return contractInstance.nusreRegisteration(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress,{ from: doctorAddress, gas: 3000000 });
// }


//Doctor Registeration
app.post('/receptionist_registeration',(req,res)=>{

	const staffId = req.body.staffId;
	const contactNumber = req.body.phone;
	const firstName = req.body.first_name;
	const lastName = req.body.last_name;
	const dob = req.body.birthday;
	const gender = req.body.gender;
	const email = req.body.email;	//const designation = req.body.designation;
	const password = req.body.password;
	const time = new Date().toLocaleTimeString();
	const receptionAddress = web3.eth.accounts[0];

	var hash = md5(password);
	console.log(password);
	console.log(hash);
	//const role = 1;
	console.log("inside it");
	console.log(receptionAddress);
	
	const dataArray = {staffId: staffId,firstName: firstName, lastName: lastName,password: hash,role: 3,registeration_time: time ,isBlocked: false ,isDeleted: false};
	
	var data = Staff(dataArray);
	data.save(dataArray)
	.then(result => {
	console.log(result);
	console.log("success");
	//insertion in blockchain
	//let temp = set_doctor(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress);
	//console.log(temp);
	})
	.catch(err => console.log(err));
	//mapping_MAC("");
	//const values = [contactNo,firstname,secondname,dob,gender,email,maritalStatus,occupation,insured,time];
	//doctorRegisteration(parameter);
});

//generate treatment id
function createTreatmentId(pid,did) { 

    // Original string
    var tid=""; 
    // var pid = 123;
    // var did =[1,2,3];
    console.log(did.length);
    for (var i = 0; i < did.length; i++) {
          //console.log(did[i]);
          tid+=(did[i]);
          if (i<did.length-1) {
            tid+='.';
          } 
          else{
            tid+='$';
          }
          // console.log(tid);


    }
    console.log(tid);
    tid+=pid;
    console.log(tid);
  	return tid;
    // Joining the strings together 
    // var value = str.concat(' is',' a',' great',' day.'); 
    // document.write(value);     
} 


//insert array of dids in treatment struct given tid
function addDoctor(treatmentName,treatmentId,arraydoctorId){
	 return contractInstance.addDoctorIds(treatmentName,treatmentId,arraydoctorId,{ from: web3.eth.accounts[0], gas: 3000000 });
}


//generate random key
function generateKey(){
	var rand = require("random-key");
 
//rand.generate(); // => eg: wexO23UXGezfTKHc
 
	var key=rand.generate(10); // => TShNQGc

// var crypto = require('crypto');
// var assert = require('assert');

// var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
// //var key = 'password';
// var text = 'I love kittens';

// var cipher = crypto.createCipher(algorithm, key);
// //console.log(cipher);  
// var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
// console.log("hi");
// console.log(encrypted);  

// var decipher = crypto.createDecipher(algorithm, key);
// //console.log(decipher);  

// var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
// console.log(decrypted);  

// assert.equal(decrypted, text);
 
return key;

}



//insert array of dids in treatment struct given tid
function store_key(tId,key){
	 return contractInstance.setSecretKey(tId,key,{ from: web3.eth.accounts[0], gas: 3000000 });
}


function encrypt(key,data){


	var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
	//var key = 'password';
	//var text = 'I love kittens';

	var cipher = crypto.createCipher(algorithm, key);
	//console.log(cipher);  
	var encrypted_data = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
	//console.log("hi");
	//console.log(encrypted_data);
	return encrypted_data;
}


function decrypt(key,data){

	var algorithm = 'aes256';
	var decipher = crypto.createDecipher(algorithm, key);
// //console.log(decipher);  

	var decrypted = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
	//console.log(decrypted);  

	//assert.equal(decrypted, data);
	return decrypted;
}


function addPatientsToDoctor(dId,pId){

		return contractInstance.addPatients(dId,pId,{ from: web3.eth.accounts[0], gas: 3000000 });

}

function addTreatment(pId,tId){

	return contractInstance.addTreatmentToPatient(pId,tId,{ from: web3.eth.accounts[0], gas: 3000000 });
}

app.get('/treatment', function(req,res){
	res.render("treatment_form");
});

//treatment form
app.post('/treatment',uploadData.any(),(req,res)=>{

	let formData = req.body;
	//let data = req.files;
	//console.log(formData);
	//console.log(data);
	var arraydoctorId = Array();
	var symptomsArray = Array();
	var description = req.body.description;
	let doctorsCount=req.body.doctorsCount;
	let symptomsCount = req.body.symptoms_count; 
	const treatmentName = req.body.treat_name;
	const patientId = req.body.pat_id;
	//var date = new Date();
	//var date = date1.toISOString();
	//console.log(date);
	//console.log("ads"+req.file[0]['originalname']);
	//inserting all the doc ids in the mongo
	for (var i = 0; i < doctorsCount; i++) {

		arraydoctorId.push(req.body['id'+i]); 
	
	}

	 console.log("Garib ID's"+arraydoctorId);

	for (var i = 0; i < symptomsCount; i++) {
		
		symptomsArray.push(req.body['symptoms'+i]); 
	
	}
	 //var success = 1;
	 //console.log(symptomsArray);
	 let temp1 = {symptoms:symptomsArray};
	 console.log(temp1);
	 let temp2 = {doctorId:arraydoctorId};
	 console.log(temp2);
	 
	 //res.render("home");


	 // for (var i = 0; i < arraydoctorId.length; i++) {
	 // 	console.log(arraydoctorId.length);

	 // }

	var treatmentId = createTreatmentId(patientId,arraydoctorId);
 	console.log("Treatment ID is "+treatmentId);

 	let t =addTreatment(patientId,treatmentId);



 	//calling funct
 	var length=arraydoctorId.length;
 	//let temp3 = addDoctor(treatmentName,treatmentId,arraydoctorId);

 	console.log("hua");

 	for(var i=0;i<length;i++){

 		let temp = addPatientsToDoctor(arraydoctorId[i],patientId);

 	}



 	key = generateKey();
 	//console.log(key);
  
 	//encrypt the data

 	//store the key

 	var temp4 = store_key(treatmentId,key);
 	//console.log("ye bhi hua"); 



 	var encrypted_treatmentId = encrypt(key,treatmentId);
 	var encrypted_patientId = encrypt(key,patientId);
 	var encrypted_description = encrypt(key,description);


 	var encrypted_arrayDoctorId = Array(); 
 	//console.log(encrypted_arrayDoctorId);
 	for (var i = 0; i < arraydoctorId.length; i++) {

 		temp= encrypt(key,arraydoctorId[i]);
 		encrypted_arrayDoctorId.push(temp);
 	}
 	// var encrypted_arrayDoctorId = encrypt(key,arraydoctorId)
 	//console.log(encrypted_patientId);
 	//console.log(encrypted_treatmentId);
 	console.log("Encrypted Array ahe "+encrypted_arrayDoctorId);


 	var decrypted_treatmentId = decrypt(key,encrypted_treatmentId);
 	console.log("decrypted data is "+decrypted_treatmentId);

 	var encrypted_symptomsArray = Array(); 
 	//console.log(encrypted_arrayDoctorId);
 	for (var i = 0; i < symptomsArray.length; i++) {

 		temp= encrypt(key,symptomsArray[i]);
 		encrypted_symptomsArray.push(temp);
 	}
 	// var encrypted_arrayDoctorId = encrypt(key,arraydoctorId)
 	//console.log(encrypted_patientId);
 	//console.log(encrypted_treatmentId);
 	console.log("Encrypted Array ahe "+encrypted_symptomsArray);
	 // function setDoctortoPatient(arraydoctorId){
	 // 	return contractInstance.,{ from: web3.eth.accounts[0], gas: 3000000 });	
	 // }

	// var date = Array();
	// var symptoms = Array();
	// var treatmentDescription = Array();
	// var arraydoctorId = Array();

	// //let detailsCount=req.body.detailsCount;
	// //	let doctorCount=req.body.doctorCount;
	// //const treatmentId = req.body.
	// const treatmentName = req.body.treatment_name;
	// const patientId = req.body.pat_id;
	// const symptomCount = req.body.symptoms_count;
	// const doctorCount = req.body.doctors_count;
	// console.log("kuch mila "+doctorCount)
	// console.log(treatmentName);
	// // for (var i = 0; i < detailsCount; i++) {
	// // 	date.push(req.body.date[i]);
	// // 	symptoms.push(eq.body.symptoms[i]);   //pawan karega
	// // 	treatmentDescription.push(req.body.description[i]);
	// // }

	// for (var i = 0; i < doctorCount; i++) {
	// 	arraydoctorId.push(req.body.arraydoctorId[i]); //pawan add kar
	// }

	// console.log(arraydoctorId);
	// //console.log(date);
	var date = new Date().toLocaleTimeString();
	const dataArray = {treatmentId:encrypted_treatmentId,patientId : encrypted_patientId,description:encrypted_description,symptoms:encrypted_symptomsArray,doctorId:encrypted_arrayDoctorId};
	
	var data = Treatment(dataArray);  
	data.save()
	.then(result => {
	console.log(result);
	console.log("success");
	res.render("home");
	//insertion in blockchain
	//let temp = set_doctor(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress);
	//console.log(temp);
	})
	.catch(err => console.log(err));
	//mapping_MAC("");
	//const values = [contactNo,firstname,secondname,dob,gender,email,maritalStatus,occupation,insured,time];
	//doctorRegisteration(parameter);
});


//funct to get patients array from did
function getPatientsFromDid(dId){
	return contractInstance.getPatientArray(dId,{ from: web3.eth.accounts[0], gas: 3000000 });

}

//funct to get treatments array from pid
function getTreatmentsFromPid(pId){
	return contractInstance.getTreatmentArray(pId,{ from: web3.eth.accounts[0], gas: 3000000 });

}


//view patients ids given treatment id
app.post('/patientData', function(req,res){
	console.log("aat made alo")
	t3 = Array()
	//String dummy; 
	var dId = req.body.user;
	//var dId = 2;    //session lagana hai
	var patients = getPatientsFromDid(dId);
	var data = JSON.stringify(patients);
	console.log("aya "+data);
	//var data = JSON.stringify(patients);
	//console.log("aya "+data);
	var t = data.replace(/"/g,'');
	console.log(t);
	var t1=t.substring(1);
	console.log(t1);
	var t2 =t1.slice(0,-1);
	console.log(t2);
	res.send(t2);
	// t3 = t2.split(",");
	// console.log(t3);
	// console.log(t3.length);
	// console.log(t3[0]);
	// console.log("sdadassadhasgy");
	// //Kailas Sir ke liye JSON
	// //var dummy;
	// var result = Array();
	// for (var i=0;i<t3.length;i++){
	// console.log("inside loop");
	// var search = t3[i];
 // 	Patient.findOne({patientId : search},function(err , patient){
	// 	if(err){
	// 		console.log("error "+err);
	// 	}
	// 	else{
	// 		console.log(patient);
	// 		console.log("found");
	// 	 	let name = patient.firstName;
	// 	 	console.log(name);
	// 	 	let temp = patient.patientId;
	// 	 	var json = {"patientId":temp,"firstName":name};
	// 	 	if(result.length>0){

	// 	 		result=result+','+json;
	// 	 	}
	// 	 	else{
	// 	 	result = result+json;
	// 	 	}
	// 	 	// console.log(json);
	// 	 	// result.push(json);
	// 	 	// console.log(result)
	// 	 	// if(i>=t3.length){
	// 	 	// 	res.send(result);
	// 	 	// }
	// 	}

	// 	//return result;
	// 	});	
	// }//.then(res.send(result))
	// // delay(5000).then();
	// // delay(5000).then();
	// // delay(5000).then();
	// // delay(10000).then(res.send(result));
	// console.log(result);
	// // .then(res.send(result));
	// //res.render("search",{results:results});

});


function getData(tId){

return contractInstance.getSecretKey(tId,{ from: web3.eth.accounts[0], gas: 3000000 });

}

app.post('/getTreatmentDetails', function(req,res){
	//console.log("aat made alo")
	//resu = Array()
	var tId = req.body.tId;

	// let temp = getData(tId);
	// let e = decrypt(temp,tId)
	// 	Treatment.findOne({treatmentId : e},function(err , treatment){
	// 	if(err){
	// 		console.log("error "+err);
	// 	}
	// 	else{
	// 		// console.log(treatment);
	// 		// let t = treatment.doctorId;
	// 		// var temp1 = decrypt(temp,t);
	// 		let json = {treatmentId:"0.1$1",treatmentName:"Surgery treatment",disease:"cancer",description : "high blood pressure" };
	// 		res.send(json);
	// 		}
let json = {treatmentId:tId,treatmentName:"Surgery treatment",disease:"cancer",description : "high blood pressure" };
res.send(json);

});


//web
app.get('/getSearch', function(req,res){
	console.log("aat made alo")
	resu = Array()
	//String dummy; 
	// var dId = req.body.user;
	//var dId = 2;    //session lagana hai
	var patients = getPatientsFromDid('15');
	var data = JSON.stringify(patients);
	console.log("aya "+data);
	//var data = JSON.stringify(patients);
	//console.log("aya "+data);
	var t = data.replace(/"/g,'');
	console.log(t);
	var t1=t.substring(1);
	console.log(t1);
	var t2 =t1.slice(0,-1);
	console.log(t2);
	var resu = t2.split(",");
	console.log(resu);
	//var results;
	res.render("search",{results:resu});
});

app.post('/getname', function(req,res){
	var pId = req.body.pId;
	Patient.findOne({patientId : pId},function(err , patient){
		if(err){
			console.log("error "+err);
		}
		else{
			let temp = patient.firstName;
			console.log(temp);
			res.send(temp)

		}
	});
});

//get all the treatments given pid 
// app.get('/get_treatments', function(req,res){
	
// 	var pId = 4321;     //session lagana hai
// 	var treatments = getTreatmentsFromPid(pId);
// 	var data = JSON.stringify(treatments);
// 	console.log("treatments "+data);
// 	//res.render("search",{results:results});

// });




//secret key
// app.post('/view_treatments', function(req,res){

	
// 		Staff.findOne({treatmentId : treatmentId},function(err , details){   //alok session treatment id
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			console.log(details);
// 			console.log("found");
// 			var secretkey = getKey(treatmentId)
// 			//decrypt the entire JSON file
// 			//res.render(details.html)  pawan dekhle
// 			}
// 		});	
// });




// app.get('/getSearch', function(req, res){
// 	// res.render("search");
// 	// console.log("this is also working");
// 	con.query("select * from patient", function(err, results){
		
// 		res.render("search", {results: results});

// 	});
// });

// app.post('/search', function(req,res){
// 	// console.log("this is working");
// 	// console.log(req.body.myCountry);
// 	// res.render("search");
// 	con.query("select * from patient where name = '"+req.body.myCountry+"'", function(err, results){
// 		// console.log(results);
// 		res.render("search", {results: results});

// 	});
// // 	console.log(req.body.myCountry);
// });



function getPatients(_dId){
	return contractInstance.getTreatmentArray(_dId,{ from: web3.eth.accounts[8], gas: 3000000 });
}


app.get('/getPatients', function(req,res){

	//get patient array from blokchain
	var patientList = getPatients(_dId)

});

function getTreatments(_pId) {

	    return contractInstance.getTreatmentArray(_pId,{ from: web3.eth.accounts[0], gas: 3000000 });

}

function getKey(_tId){

	return contractInstance.getTreatmentArray(_tId,{ from: web3.eth.accounts[0], gas: 3000000 });

}


app.post('/getTreatmentIds', function(req,res){


	//Doctor ID from session
	var dId=req.body.dId;
	//data from blockchain
	var pId=req.body.pId;
	console.log(pId);
	console.log(dId);
	var treatmentsDone=Array();

	var arr = getTreatments(pId);
	//console.log(data);
	//from blockchain
	//var arr =["2.3$9876","2.5.6$9876","1.6$9876"]
	for (var i in arr) {
		//console.log(arr[i]);
	  	//console.log("j");
	  	var temp=arr[i];
	  	console.log(temp);
	  	// for (var j in temp){
	  	// 	console.log(j);
	  	var resu = temp.split("$");
	  	console.log(resu);
	  	resu.pop();
	  	console.log(resu);
	  	for (var j in resu) {
		  	tmp=resu[j];
		  	console.log(tmp);
		  	doc_split=tmp.split(".");
		  	console.log(doc_split);
		  	for (k in doc_split){
		  		console.log(doc_split[k]);
		  		if (dId==doc_split[k]){
		  			console.log("hai re");
		  			treatmentsDone.push(temp)
		  			console.log(treatmentsDone);
		  		}
		  		else{
		  			k++;
		  		}
		  		}
		  	}
	}
	console.log(treatmentsDone);
	console.log(treatmentsDone.length);
	res.send(treatmentsDone)

});





//under testing

app.get('/',(req,res)=>{
	console.log("sadua sigdy");
	// var temp = {trea{ "name":"John", "age":30, "city":"New York" }
	// 			};
	// res.send(temp);
	//web3.eth.getAccounts(console.log);
	let temp = nishant();

	//console.log(temp[0].toNumber());
	console.log(temp);
	// for (code in temp) {
	// 	console.log(code);
	// }
});

function nishant() {
    return contractInstance.getTreatmentArray(100,{ from: web3.eth.accounts[8], gas: 3000000 });
}


//getting patient ids from blockchain
function getPatients(dId) {
    return contractInstance.getPatientArray(dId,{ from: doctorAddress, gas: 3000000 });
}


//To show all the patients treated by a Doctor
app.get('/patients',(req,res)=>{
	var temp = getPatients(dId);
	console.log(temp);
	return res.send(temp);
});







function patientRegisteration() {
    return contractInstance.patientRegisteration(parameter,parameter,{ from: web3.eth.accounts[0], gas: 3000000 });
}




function mapping_MAC() {
    return contractInstance.doctorRegisteration(IP,MAC,{ from: web3.eth.accounts[0], gas: 3000000 });
}


function doctorRegisteration() {
    return contractInstance.doctorRegisteration(parameter,parameter,{ from: web3.eth.accounts[0], gas: 3000000 });
}


var i=1;

function assignAddressForPatient() {
	return web3.eth.accounts[i++];	
}

var j=5;

function assignAddressForDoctor() {
	console.log(j);
	return web3.eth.accounts[j++];	
}







app.get('/test',(req,res)=>{
	let ip =req.connection.remoteAddress;
	macfromip.getMac(ip, function(err, data){
    if(err){
        console.log(err);
    }
    console.log(data);
});
	console.log(ip);

});

app.get('/down', function(req,res){
	res.render("test3");
});

app.listen(8080);