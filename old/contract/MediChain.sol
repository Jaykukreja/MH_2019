pragma solidity ^0.4.22;
pragma experimental ABIEncoderV2;

contract MediChain {
    struct Doctor {
        uint dId;
        address accountAddress;
        uint[] patientId;
    }

    struct Patient {
        uint pId;
        string name;     
        string[] treatmentId;
    }

    struct Treatment {
        string tId;  
        string name;
        uint[] dId;
    }

    struct AuthenticateDevice {
        uint dId;  //d1.d2.d3$pn
        string[] MAC;
    }

    struct SecretKey{
        string tId;    
        string key;
    }


    mapping(uint => Doctor) doctorMapping;
    mapping(uint => Patient) patientMapping;
    mapping(string => Treatment) treatmentMapping;
    mapping(uint => AuthenticateDevice) deviceMapping;
    mapping(string => SecretKey) SecretKeyMapping;

    function patientRegisteration(uint _pId,string _name) public payable returns(uint){

        Patient patient;
        patient.name=_name;
        patient.pId = _pId;
        patientMapping[_pId] = patient; 
        return 1;
    }


    function doctorRegisteration(uint _dId,address _address) public payable returns(uint){

        Doctor doctor;
        doctor.dId = _dId;
        doctor.accountAddress = _address;
        doctorMapping[_dId] = doctor; 
        return 1;
    }

    function getdoctorAddress(uint _dId) public view returns (address){
        return (doctorMapping[_dId].accountAddress);
    }


    //Mapping of doctor and patient
    function addPatients(uint _dId,uint _pId) public payable returns (uint) {
        doctorMapping[_dId].patientId.push(_pId); 
        return 1;
    }

    //Mapping of patient and treatment(adding all the treatments the patient has undergone)
    function addTreatmentToPatient(uint _pId,string _tId) public payable returns (uint) {
        patientMapping[_pId].treatmentId.push(_tId); 
        return 1;
    }

    //"1$123","Cancer",[1,2],4
    //Mapping of doctor and treatment(adding doctor array in treatments)
    function addDoctorIds(string _tId,string _name,uint[] _dId,uint count) public payable returns (uint) {
        Treatment treatment;
        treatment.name=_name;
        treatment.tId=_tId;
        uint i;
        uint temp;
        treatment.dId = _dId;
        treatmentMapping[_tId] = treatment;
        return 1;
    }



    //Retrieve array of patients from logged in doctor
    function getPatientArray(uint _dId) public view returns (uint[]) {
        return (doctorMapping[_dId].patientId);
    }


    //Retrieve array of treatments which patient has undergone
    function getTreatmentArray(uint _pId) public view returns (string[]) {
        return (patientMapping[_pId].treatmentId);
    }

    //Set the MAC address of the doctors device
    function addMAC(uint _dId,string[] _MAC) public payable returns (uint) {
        AuthenticateDevice newnode;
        newnode.dId = _dId;
        newnode.MAC = _MAC;
        deviceMapping[_dId] = newnode; 
        return 1;
    }



    //Retrieve the MAC address of the doctors device
    function getMAC(uint _dId) public view returns (string[]) {
        return (deviceMapping[_dId].MAC);
    }

   function setSecretKey(string _tId, string _key) public payable returns(uint){
        SecretKey newnode;
        newnode.tId = _tId;
        newnode.key = _key;
        SecretKeyMapping[_tId]=newnode; 
        return 1;
    }

    function getSecretKey(string _tId) public view returns (string) {
        return (SecretKeyMapping[_tId].key);
    }

}