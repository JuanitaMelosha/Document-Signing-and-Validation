
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

  function Home(props) {


    
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
  const [flag, setflag] = useState(0)
  const [event, setevent] = useState("login")
  const[description,setdescription]=useState("")
  const[plan_date,setplan_date]=useState("")
  const[plan_time,setplan_time]=useState("")
  const [show, setShow] = useState(false);
  const [show_claim, setShow_claim] = useState(false);
  const [show_docs, setShow_docs] = useState(false);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file_name, setFile_name] = useState("");

  const [current_user_data, setcurrent_user_data] = useState("")
  const [setting_admin_data, setsetting_admin_data] = useState(null);
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [selleradd, setselleradd] = useState("")
  const [eth, seteth] = useState("")
  const[img1,setimg1]=useState("")
  const[img2,setimg2]=useState("")
  const handleClose = () => {setShow(false)
  window.location.reload()};
  const handleShow = () => setShow(true);
  
  const handleClose_claim = () => {setShow_claim(false)};
    const handleShow_claim = () => setShow_claim(true);

    const handleClose_docs = () => {setShow_docs(false)};
    const handleShow_docs = () => setShow_docs(true);
    const [current_val, setcurrent_val] = useState(null)

  const [data, setdata] = useState([])
  const [accountdetails, setaccountdetails] = useState(null)
    const[user_list_array,setuser_list_array]=useState([])
    const[user_data,setuser_data]=useState("")
    const[pay_amount,setpay_amount]=useState("")
    let adminaddress=""
   



    useEffect(() => {
      initilize()
      }, [flag])

      let load_data =async(data)=>{

        try{
          let responce =await data.methods.view_details().call()
        let obj_responce=JSON.parse(responce)
          setdata(obj_responce)
          console.log(obj_responce,"efe");
        
        }
        catch(err){
          setdata([])
  console.log(err,'sge');
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

      alert("Purchased successfully")
    } catch (err) {
      setError(err.message);
      // window.location.reload()
    }
  };


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


  
     //*************IPFS part************** */
 const retrieveFile_from_ipfs2 = (e) => {
  const data1 = e.target.files[0];
  const reader = new window.FileReader();
  reader.readAsArrayBuffer(data1);
  reader.onloadend = () => {
    setFile2(Buffer(reader.result));
  }
  e.preventDefault();  
}
const Submit2 = async (e) => {
    e.preventDefault();
    try {
      const created = await responce.add(file2);
  
      const url2 = `https://infura-ipfs.io/ipfs/${created.path}`;
      console.log(url2,"handleSubmit2");
      setimg2(url2)
    } catch (error) {
      console.log("error");
    }
  };


  async function storing_data_in_bc() {
    console.log(data);
    let responce2 =await contract.methods.update_details(JSON.stringify(data)).send({ from: accountdetails[0] })
          window.location.reload()

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
    
  <div class="jumbotron bg-light py-3">
    <h1 class="display-5 text-danger">Hello, USER!</h1>
  </div>
  <Container  className="mt-4">
  <Row>
<div class="text-right">
<Button variant="outline-dark" className="mx-2" 
         style={{fontSize:11}}
                   onClick={()=>{
                   handleShow()
                   }}
         
                   >Upload file</Button>
</div>
 

<Row className="mt-3">
  {
data!=null?(
  data.map((data)=>(

    <Col lg={3} className="">
        <Card style={{ width: '14rem' }} className="mb-4">
        <embed src={data.url}  width="220" height="200" alt="No Image Found" />
          <Card.Body  className="rounded-10">
          <Card.Title className="text-center text-danger">{data.name.toUpperCase()}</Card.Title>
        

      
          </Card.Body>
        </Card>
        </Col>
        ))
)
:
(null)
  }
  </Row>
  </Row>


  </Container>

  <div >

  <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Good to see you Back!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <br></br>
          <br></br>
         
                  <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Name" value={description} onChange={(e)=>{
              setdescription(e.target.value)}} />
          </Form.Group>
                  <Row>
  <Col>
  <form className="form" onSubmit={Submit}>
    <Row>
      <Col md={8}>
      <input class="form-control form-control-sm" id="formFileSm" onChange={retrieveFile_from_ipfs} type="file"/>

      </Col>
      <Col  md={4}>
      <Button variant="outline-primary" type="submit">

          Upload
        </Button>
      </Col>
 
    </Row>
 
</form>
<div class="text-center mt-2">
<embed src={img1}  width="300" height="300" alt="No Image Found" />
</div>
  </Col>

</Row>
        </Modal.Body>
          <Modal.Footer>
          
            <Button variant="danger" onClick={()=>{
              data.push({
                "name":description,
                "url":img1
              })
              storing_data_in_bc(data)
              }}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal>



       <Modal show={show_claim} onHide={handleClose_claim}>
        <Modal.Header closeButton>
          <Modal.Title>Good to see you Back!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br></br>
          <br></br>
         
                  <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Description" value={description} onChange={(e)=>{
              setdescription(e.target.value)}} />
          </Form.Group>
                  <Row>
  <Col>
  <form className="form" onSubmit={Submit}>
    <Row>
      <Col md={8}>
      <input class="form-control form-control-sm" id="formFileSm" onChange={retrieveFile_from_ipfs} type="file"/>

      </Col>
      <Col  md={4}>
      <Button variant="outline-primary" type="submit">
          Upload
        </Button>
      </Col>
 
    </Row>
 
</form>
<Figure class="mt-3 text-center">
<Figure.Image
          width={300}
          height={300}
          alt="No Image Found"
          src={img1}
          style={{borderRadius:"8%"}}
          />
      </Figure>
  </Col>

</Row>
        </Modal.Body>
        <Modal.Footer>
         
        <Button variant="danger" onClick={()=>{
       
       let claim_obj={
        "image_url":img1,
        "claimed_date":moment().format("DD MM YYYY"),
        "claimed_time":moment().format("hh:mm:ss"),
         description, 
         "claimed_status":"pending",
        "claimed_by_address":current_user_data.address,
        "claimed_by_name":current_user_data.name,
       }
          
setting_admin_data.claims.push(claim_obj)
// current_user_data.plans_purchased.map((val)=>{
//   if(val.purchased_time==plan_time && val.purchased_date==plan_date){
//     val.claim_status="pending"
//   }
//         })
storing_data_in_bc()
              }}>
              save
            </Button>
        </Modal.Footer>

</Modal>


<Modal show={show_docs} onHide={handleClose_docs}>
        <Modal.Header closeButton>
          <Modal.Title>Good to see you Back!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br></br>
          <br></br>
         
                  <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Description" value={description} onChange={(e)=>{
              setdescription(e.target.value)}} />
          </Form.Group>
                  <Row>
  <Col>
  <form className="form" onSubmit={Submit2}>
    <Row>
      <Col md={8}>
      <input class="form-control form-control-sm" id="formFileSm" onChange={retrieveFile_from_ipfs2} type="file"/>

      </Col>
      <Col  md={4}>
      <Button variant="outline-primary" type="submit">
          Upload
        </Button>
      </Col>
 
    </Row>
 
</form>
<Figure class="mt-3 text-center">
<Figure.Image
          width={300}
          height={300}
          alt="No Image Found"
          src={img2}
          style={{borderRadius:"8%"}}
          />
      </Figure>
  </Col>

</Row>
        </Modal.Body>
        <Modal.Footer>
         
        <Button variant="danger" onClick={()=>{
       current_val.users_bought.push({
        "user_address":current_user_data.address,
        "user_name":current_user_data.name,
        "admin_id":current_val.admin_id,
        "purchased_date":moment().format("DD MM YYYY"),
        "purchased_time":moment().format("hh:mm:ss"),
        "payment":false,
        "verification":"pending",
        "doc_img":img2,
        "doc_description":description
      }
        )
      
        current_user_data.plans_purchased.push(
          {
            "user_address":current_user_data.address,
            "user_name":current_user_data.name,
            "purchased_date":moment().format("DD MM YYYY"),
            "purchased_time":moment().format("hh:mm:ss"),
            "plan_name":current_val.plan_name,
            'plan_amount':current_val.plan_amount,
            "claim_status":"NIL",
            "admin_id":current_val.admin_id,
            "payment":false,
            "verification":"pending",
            "doc_img":img2,
            "doc_description":description
      
          }
        )
  
storing_data_in_bc()

console.log(data);
              }}>
              save
            </Button>
        </Modal.Footer>

</Modal>


<Modal show={show_claim} onHide={handleClose_claim}>
        <Modal.Header closeButton>
          <Modal.Title>Good to see you Back!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br></br>
          <br></br>
         
                  <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Control type="text" placeholder="Description" value={description} onChange={(e)=>{
              setdescription(e.target.value)}} />
          </Form.Group>
                  <Row>
  <Col>
  <form className="form" onSubmit={Submit}>
    <Row>
      <Col md={8}>
      <input class="form-control form-control-sm" id="formFileSm" onChange={retrieveFile_from_ipfs} type="file"/>

      </Col>
      <Col  md={4}>
      <Button variant="outline-primary" type="submit">
          Upload
        </Button>
      </Col>
 
    </Row>
 
</form>
<Figure class="mt-3 text-center">
<Figure.Image
          width={300}
          height={300}
          alt="No Image Found"
          src={img1}
          style={{borderRadius:"8%"}}
          />
      </Figure>
  </Col>

</Row>
        </Modal.Body>
        <Modal.Footer>
         
        <Button variant="danger" onClick={()=>{
       
       let claim_obj={
        "image_url":img1,
        "claimed_date":moment().format("DD MM YYYY"),
        "claimed_time":moment().format("hh:mm:ss"),
         description, 
         "claimed_status":"pending",
        "claimed_by_address":current_user_data.address,
        "claimed_by_name":current_user_data.name,
       }
          
setting_admin_data.claims.push(claim_obj)
// current_user_data.plans_purchased.map((val)=>{
//   if(val.purchased_time==plan_time && val.purchased_date==plan_date){
//     val.claim_status="pending"
//   }
//         })
storing_data_in_bc()
              }}>
              save
            </Button>
        </Modal.Footer>

</Modal>




  </div>
      
  </Container>

    
    </>
  )

  }

  export default Home;

