pragma solidity ^0.4.22;
pragma experimental ABIEncoderV2;

contract selfkey {
    struct Citizen {
        uint cId;
        uint key;
    }

    struct Organization {
        uint oId;
        bytes32 oName;
        address accountAddress;
    }

    //
	mapping(uint => Citizen) citizenMapping;
	mapping(uint => Organization) organizationMapping;

	function citizenRegisteration(uint _cId,uint _key) public payable returns(uint){

        Citizen citizen;
        citizen.cId=_cId;
        citizen.key = _key;
        citizenMapping[_cId] = citizen; 
        return 1;
    }

    function organizationRegisteration(uint _oId,bytes32 _oName,address _accountAddress) public payable returns(uint){
    	Organization organization;
    	organization.oId=_oId;
    	organization.oName=_oName;
    	organization.accountAddress=_accountAddress;
    }


    function getcitizenKey(uint _cId) public view returns (uint){
        return (citizenMapping[_cId].key);
    }


    function getorganizationAddress(uint _dId) public view returns (address){
        return (doctorMapping[_dId].accountAddress);
    }
}