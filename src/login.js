
import React, { Component, useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Dropdown, Form, Spinner } from 'react-bootstrap';
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";
import backgroundImage from "./test2.png";

import "./App.css";

function Login(props) {


    const [loginstate,setloginstate]= useState("login")
    const [web3, setweb3] = useState(null)
    const [accounts, setaccounts] = useState(null)
    const [contract, setcontract] = useState(null)
    const [flag, setflag] = useState(0)
    const [accountdetails, setaccountdetails] = useState(null)
    const[u_name,setu_name]= useState("")
    const[u_password,setu_password]= useState("")
    const[u_address,setu_address]=useState("")
    const[user_type1,setuser_type1]=useState(false)
    const[user_type2,setuser_type2]=useState(false)
    const[user_type,setuser_type]=useState("")
    const[data,setdata]=useState([])
    const[adminexisst,setadminexisst]=useState(false)
    const[loader,setloader]=useState(false)
    

    useEffect(() => {
      console.log("use");
      initilize()
      }, [flag])

      let load_data =async(data)=>{

        try{
          let responce =await data.methods.view_details().call()
          let array=[]
        let obj_responce=JSON.parse(responce)
          console.log(obj_responce);
          obj_responce.map((ele)=>{
            array.push(ele)
            if(ele.type=="admin"){
              setadminexisst(true)
            }
          })
    
setdata(obj_responce)
        }
        catch(err){
console.log(err);
setdata([])
        }
      }

      const initilize = (async () => {
      

        try {
        // console.log("try");
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        setaccountdetails(accounts)
        
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
        );
        
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        // this.setState({ web3, accounts, contract: instance }, this.runExample);
        setweb3(instance)
        setaccounts(instance)
        setcontract(instance)

        load_data(instance)
        // console.log(instance);
        // runExample(instance)
        // console.log(contract);
    
        } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
        `Failed to load web3, accoun deployedNetwork && deployedNetwork.address,
        ts, or contract. Check console for details.`,
        );
        console.error(error);
        }
      
        })

    

    let login_function = async(username, password)=>{
    
      

  if(username=="admin" &&  password=="123"){
    localStorage.setItem("login",1)
    localStorage.setItem("usertype","admin")
    localStorage.setItem("useraddress","admin")
    props.history.push("/admin")
    window.location.reload()  }
  else if(username=="citizen" &&  password=="123")
  {
    localStorage.setItem("login",1)
    localStorage.setItem("usertype","citizen")
    localStorage.setItem("useraddress","citizen")
    props.history.push("/home")
    window.location.reload()
  }
  else if(username=="" &&  password=="")
  {
   alert("PLEASE FILL ALL DETAILS")
    window.location.reload()
  }
     
    }



  


if(loader==true){
  return(
    <>
    <Spinner animation="border" variant="primary" />
    </>
  )
}
return (

<>

<div className="auth-wrapper" style={{
backgroundImage: `url(${backgroundImage})`,
backgroundPosition: 'center',
backgroundSize: 'cover',
backgroundRepeat: 'no-repeat',
width: '100vw',
height: '100vh'
}}>
    
          
<div style={{marginLeft:"63%", paddingTop:"8%"}}>
<Card style={{ width: '15rem',height:"18rem",borderRadius:"10px",backgroundColor:"#ebebeb" }}>
    
      <Card.Body style={{}}>
        <Card.Title className="text-center mt-3 mb-4">LOGIN</Card.Title>
        <Form>
      <Form.Group className="mb-4" controlId="formBasicEmail">
        {/* <Form.Label>User address</Form.Label> */}
        <Form.Control type="text" placeholder="Enter name" value={u_address}  onChange={(e)=>{
          setu_address(e.target.value)
      
        }}/>
      
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicPassword">
        {/* <Form.Label>Password</Form.Label> */}
        <Form.Control type="password" placeholder="Password" value={u_password} onChange={(e)=>{
          setu_password(e.target.value)}} />
      </Form.Group>
      <div className="d-grid px-4 mb-2">
      <Button variant="primary" size="sm" onClick={()=>{login_function(u_address,u_password) 
      }} >
      Login
      </Button>
      
    </div>
   

    </Form>
      
      </Card.Body>
    </Card>
</div>
       
  
  
</div>

</>

);
}
export default Login;

