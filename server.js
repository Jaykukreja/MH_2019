const http = require('http');
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const Web3 = require('web3');
const multer = require('multer');
const fs = require('fs');
app.set('view engine','ejs');

//var config = require('./routes/config')
var citizen = require('./routes/citizen')
//var gov = require('./routes/gov')
var government = require('./routes/government')
let uploadData = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const cid = 5;
const storage=multer.diskStorage({

	destination:function(req,file,cb){
		fs.mkdir('C:/Users/ABHISHEK/Desktop/EHR/uploads/'+cid+'/', err => { 
	   if (err && err.code != 'EEXIST') throw 'up'
})
		cb(null,'./uploads/'+cid+'/')

	},
	filename:function(req,file,cb){
	// 	fs.mkdir('C:/Users/ABHISHEK/Desktop/EHR/patients/'+pid+'/', err => { 
 //    if (err && err.code != 'EEXIST') throw 'up'
 //     qrimage
	// .image(""+pid+"$mere paas key hai",{type:'png',size:10})//idr random key dena hai
	// .pipe(fs.createWriteStream("patients/"+pid+"/qr2"+tid+".png"))
	// //fs.createStream.end() 
 //    })
		cb(null,file.originalname)
		console.log(file.encoding)

	}

});


var upload = multer({storage:storage});

app.post('/upload',upload.array('Image'),(req,res)=>{
	

	console.log(req.files);
})

// function citizenRegisteratn(cId,key){
// 	return contractInstance.citizenRegisteration(cId,key,{ from: web3.eth.accounts[0], gas: 3000000 });
// }
// app.post('/upload',(req,res)=>{
//   // const k=req.body.uname;
//   // const j=req.body.pass;
//   console.log("jijiijij");
//   // const key = fun.generateKey();
//   // console.log(key);
//   const temp=citizenRegisteratn(1,25);

// });



app.use('/citizen',citizen)
app.use('/government',government);

app.listen(8080);