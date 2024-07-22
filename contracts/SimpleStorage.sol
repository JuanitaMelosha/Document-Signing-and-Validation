pragma solidity ^0.5.13;

contract SimpleStorage
{
string details;
function update_details (string memory data) public 
{
    details = data;
}
function view_details () public view returns(string memory)
{
    return (details);  
}
}