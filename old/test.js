// var did=6
// var resu=[];
// //resu.push(did);
// //console.log(resu);
// var arr =["1.3$123","2.5.6$123","1.6$123"]
// for (var i in arr) {
//       //console.log(arr[i]);
//       console.log("j");
//       var temp=arr[i];
//       console.log(temp);
//       // for (var j in temp){
//       // 	console.log(j);
//       var res = temp.split("$");
//       console.log(res);
//       res.pop();
//       console.log(res);
//       for (var j in res) {
//       	tmp=res[j];
//       	console.log(tmp);
//       	doc_split=tmp.split(".");
//       	console.log(doc_split);
//       	for (k in doc_split){
//       		console.log(doc_split[k]);
//       		if (did==doc_split[k]){
//       			console.log("hai re");
//       			//break;

//       			resu.push(temp)
//       			console.log(resu);
//       		}
//       		else{
//       			k++;
//       		}
//       		}
//       	}


//       	//console.log("gi");
//       }
//       	 // for (var i = 0; i < Things.length; i++) {
//       	 // 	Things[i]
      	 
      
   
      // //var date = Array();
      // var symptoms = Array();
      // //var treatmentDescription = Array();
      // //var arraydoctorId = Array();

      // //let detailsCount=req.body.detailsCount;
      // //let doctorCount=req.body.doctorCount;
      // //const treatmentId = req.body.
      // //const treatmentName = req.body.treatment_name;
      // //const patientId = req.body.pat_id;
      
      // var test= ["nishant","nimbalkar"]
      // for (var i = 0; i < 2; i++) {
      //       //var date[i]=req.body.date[i];
      //       symptoms.push(test[i])   //pawan karega
      //       //var treatmentDescription[i]=req.body.description[i];
      // }
      // console.log(symptoms);


function createTreatmentId() { 

    // Original string
    var tid=""; 
    var pid = 123;
    var did =[1,2,3];
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
  
    // Joining the strings together 
    // var value = str.concat(' is',' a',' great',' day.'); 
    // document.write(value);     
} 
// createTreatmentId();

// var rand = require("random-key");
 
// //rand.generate(); // => eg: wexO23UXGezfTKHc
 
// var key=rand.generate(7); // => TShNQGc

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
const fs = require('fs');
const qrcode = require('qrcode');

run().catch(error => console.error(error.stack));

async function run() {
  const res = await qrcode.toDataURL("hi");

  fs.writeFileSync('./qr.html', `<img src="${res}">`);
  console.log('Wrote to ./qr.html');
}