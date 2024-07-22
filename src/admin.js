
import React, { Component, useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Dropdown, Form, Spinner,Navbar,NavDropdown,NavItem,Nav,Modal,Figure  } from 'react-bootstrap';


import "./App.css";
import { Description } from "@ethersproject/properties";

function Admin(props) {

  const ipfs_Client = require("ipfs-http-client");

  const _project_Id = '2LE4pUKjaVFr2UkQWEhMpxesjCj'
  const _project_Secret = '2bb2beb63a4a271172ab6f54166141c9'
  
  
  const _authorization_data = 'Basic ' + Buffer.from(_project_Id + ':' + _project_Secret).toString('base64');
  
   const responce =  ipfs_Client.create({
      host: 'infura-ipfs.io',
      port: 5001,
      protocol: 'https',
      apiPath: '/api/v0',
      headers: {
        authorization: _authorization_data
      }
    })

const history = useHistory();
const [web3, setweb3] = useState(null)
const [accounts, setaccounts] = useState(null)
const [contract, setcontract] = useState(null)
const [result, setresult] = useState(null)

const [flag, setflag] = useState(0)
const [event, setevent] = useState("login")
const [show, setShow] = useState(false);
const [show_view_details, setShow_view_details] = useState(false);
const [show_view_details_docs, setShow_view_details_docs] = useState(false);

const [error, setError] = useState();
const [txs, setTxs] = useState([]);
const [selleradd, setselleradd] = useState("")
const [eth, seteth] = useState("")
const [current_plan_viewed, setcurrent_plan_viewed] = useState("")
const [current_user_data, setcurrent_user_data] = useState("")
const [claim, setclaim] = useState(null)
const handleClose = () => {setShow(false)};
const handleShow = () => setShow(true);

const handleClose_view_details = () => {setShow_view_details(false)};
const handleShow_view_details = () => setShow_view_details(true);
const handleClose_view_details_docs = () => {setShow_view_details_docs(false)};
const handleShow_view_details_docs = () => setShow_view_details_docs(true);
const [accountdetails, setaccountdetails] = useState(null)
const[repay_amount,setrepay_amount]=useState("")
const[plan_amount,setplan_amount]=useState("")
const[plan_name,setplan_name]=useState("")
const[description,setdescription]=useState("")
const[img1,setimg1]=useState("")
const[data,setdata]=useState([])
const[img2,setimg2]=useState("")
const [file1, setFile1] = useState(null);
const [file2, setFile2] = useState(null);
const [claim_list, setclaim_list] = useState([]);
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
        if(ele.address==localStorage.getItem("useraddress")){
          setcurrent_user_data(ele)
          
        }
   
   

       
      })
setdata(obj_responce)

    }
    catch(err){
console.log(err);
    }
  }

   //*************IPFS part************** */
 const retrieveFile_from_ipfs = (e) => {
  const data1 = e.target.files[0];
  const reader = new window.FileReader();
  reader.readAsArrayBuffer(data1);
  reader.onloadend = () => {
    setFile1(Buffer(reader.result));
  }
  e.preventDefault();  
}
const Submit = async (e) => {
    e.preventDefault();
    try {
      const created = await responce.add(file1);
  
      const url1 = `https://infura-ipfs.io/ipfs/${created.path}`;
      console.log(url1,"handleSubmit1");
      setimg1(url1)
    } catch (error) {
      console.log("error");
    }
  };



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

    const purchase = async (e,a) => {
      console.log(e, a);
    
    
      setError("");
      await startPayment({
        setError,
        setTxs,
        ether: e,
        addr: a
      });
    };

const startPayment = async ({ setError, setTxs, ether, addr }) => {

try {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  ethers.utils.getAddress(addr);
  console.log({ ether, addr });
  const tx = await signer.sendTransaction({
    to: addr,
    value: ethers.utils.parseEther(ether)
  });

  console.log("tx", tx);
  setTxs([tx]);
  
  await storing_data_in_bc(data)

  alert("Funded successfully")
} catch (err) {
  setError(err.message);
  // window.location.reload()
}
};
  
  async function storing_data_in_bc() {
    console.log(data);
    let responce2 =await contract.methods.update_details(JSON.stringify(data)).send({ from: accountdetails[0] })
    window.location.reload()
  }
 
  async function verification(value){
    console.log(value,"dgsygd");
    console.log(data);
  //  await data.map((val)=>{
  //     if(val.url==value.url){
  //       setresult("VALID FILE")
  //     }
  //     else{
  //       setresult("INVALID FILE")
  //   }
  // })

  for(let i=0;i<data.length;i++){
    if(data[i].url==value.url){
      setresult("VALID FILE")
      break
    }
    else{
      setresult("INVALID FILE")
  }
  }
  }
 
return(
   <>
  
   <Container fluid>
  
   <Navbar bg="light" expand="lg">
      <Container fluid>
     
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          

            <Button variant="outline-danger" className="mx-2" 
            onClick={()=>{
           localStorage.clear()
              history.push("/")
              window.location.reload()
            }}
            
            >Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
<div class="jumbotron bg-light py-3 d-flex flex-row justify-content-between">
  <h1 class="display-5 text-danger">Hello, ADMIN</h1>
 
</div>


<Container  className="mt-4">

<Row className="mt-3">
  {
data!=[]?(
  data.map((data)=>(

    <Col lg={3} className="">
        <Card style={{ width: '14rem' }} className="mb-4">
        <embed src={data.url}  width="220" height="200" alt="No Image Found" />
          <Card.Body  className="rounded-10">
          <Card.Title className="text-center text-danger">{data.name.toUpperCase()}</Card.Title>
          </Card.Body>
          <Card.Footer>
          <Button variant="outline-danger" className=" mx-1 mt-3 mb-3 "

onClick={()=>{
  setcurrent_plan_viewed(data)
 verification(data)
  handleShow()
}}
>Verify</Button> 

          </Card.Footer>
        </Card>
        </Col>
        ))
)
:
(null)
  }
  </Row>





</Container>

<div style={{marginTop:"50px"}}>

<Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title >Verification Process!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br></br>
          <br></br>
          <div class="text-center" >
          <embed src={current_plan_viewed.url}  width="300" height="400" alt="No Image Found" />
          </div>

      <Modal.Title className="text-center mt-2">{result}</Modal.Title>

        </Modal.Body>
       

</Modal>



    




</div>
     
</Container>

   
   </>
)

}

export default Admin;

