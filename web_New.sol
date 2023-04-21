// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.5.0 < 0.9.0;

contract AddTwoN
{
    uint public a;
    uint public b;
    
    function getSum() public view returns(uint)
    {
        return a+b;
    }

    function setter(uint firstNo, uint secondNo) public 
    {
        a = firstNo;
        b = secondNo;
    }
}