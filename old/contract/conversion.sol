
    //Retrieve array of treatments which patient has undergone
    //  function getTreatmentArray(uint _pId , uint _dId) public view returns (uint) {
    //     uint[] temp = patientMapping[_pId].treatmentId;
    //     uint i;
    //     uint j;
    //     uint[] returnedArray;
    //     for (i = 0; i < temp.length; i++) {
    //         uint[] storage split = temp[i].split("$");
    //         uint[] storage split2 = split[0].split(".");
    //         for (j = 0; j < split2.length; j++) {
    //             if(split2[j] == _dId){
    //                 uint[] returnedArray = temp[i];
    //             }
    //         }
    //     }
    //     return (returnedArray);
    // }
    

    // function getTreatmentArray(uint _pId, uint _dId) public view returns(uint[]){
    //     uint[] temp = patientMapping[_pId].treatmentId;
    //     uint i;
    //     uint j;
    //     string[] splittedAtDollar;
    //     for(i=0;i<temp.length;i++){
    
    //         splittedAtDollar = splitStr(temp[0] , "$");
    //         splittedAtDot = splitStr(splittedAtDollar[0] , ".");
    //         for (j=0;j<(splittedAtDot.length)-1;j++){

    //             if(splittedAtDot[j] == string(_dId)){

    //                 }

    //         }
    //      }
        
    //     }



    // }

    // bytes tempNum ; //temporarily hold the string part until a space is recieved
    // uint[] numbers;

    // function splitStr(string str, string delimiter) constant returns (string[]){ //delimiter can be any character that separates the integers 

    //     bytes memory b = bytes(str); //cast the string to bytes to iterate
    //     bytes memory delm = bytes(delimiter); 

    //     for(uint i; i<b.length ; i++){          

    //         if(b[i] != delm[0]) { //check if a not space
    //             tempNum.push(b[i]);             
    //         }
    //         else { 
    //             numbers.push(parseInt(string(tempNum))); //push the int value converted from string to numbers array
    //             tempNum = "";   //reset the tempNum to catch the net number                 
    //         }                
    //     }

    //     if(b[b.length-1] != delm[0]) { 
    //        numbers.push(parseInt(string(tempNum)));
    //     }
    //     return numbers;
    // }


