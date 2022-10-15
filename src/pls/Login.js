import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faLock , faStreetView, faUserLock ,faEyeSlash ,faEye } from '@fortawesome/free-solid-svg-icons'

import myimg from './images/system/logocc.png';
import axios from 'axios'
import jwtDecode from "jwt-decode";
import {  useLocation ,useNavigate } from 'react-router-dom';

import { InputGroup, InputGroupText, Input} from 'reactstrap'
import { dtStamp } from './comps/stamp';

const Login = () => {

    let navigate = useNavigate();
    let location = useLocation();
    try{
      var from = location.state.from.pathname ;
    }catch (err) {
      var from = "/";
    }
    const [name , setName ] = useState()
    const [pass , setPass ] = useState()
    const [msg, setMsg] = useState()
    
    const[eye,seteye]=useState(true);
    const[password,setpassword]=useState("password");
    const[type,settype]=useState(false);
    const [width, setWindowWidth] = useState(0);
  
    
  
  
  let myStyle = {
    color:"gray",
    backgroundColor:"#F5F6F9",
  }
  
  
  const Eye=()=>{
    console.log(eye)
    eye ? setpassword("") : setpassword("password")
    seteye(!eye)
  } 
  
  const otpwindow = (ress) => {
    console.log("OTP USER")
    nonotpwindow(ress)
  }
 
  
  const nonotpwindow = (ress) => {
//    console.log(ress.headers)
    localStorage.setItem("arixauth" , ress.headers.arixauth)
    localStorage.setItem("autho" , ress.headers.autho)
    navigate(from, { replace: true });
    
  }
  
    const auth = () => {
      setMsg("")
      let browsername = dtStamp().browsername;
      let localdt = dtStamp().localdt;
      axios.post(`${process.env.REACT_APP_APIURL}/lgn/usr`, {email : name, pass : pass, browsername, localdt })
      .then(res => {
        let otpcheck  = res.headers.arixauth
        jwtDecode(otpcheck).otp ? otpwindow(res) : nonotpwindow(res)
  
      })
      .catch(e =>{
          try{
            if(e.response.status === 404) {
              setMsg("Incorrect Login ID")  
            }
            else if(e.response.status === 401) {
              setMsg("invalid user or password")  
            }else{
              setMsg("System is down, please contact system administrator!")
            }
          }catch(ss){
            setMsg("Catch Block!")
          }
  
      });
    }
  
    return (
            <Container className="mt-5" >
                <Row>
                  <Col style={{fontFamily: 'Inconsolata', textAlign : "center"}}>
                       <h1> {process.env.REACT_APP_PRODUCT_FULL} {process.env.REACT_APP_PRODUCTV}</h1>
                  </Col>
                  </Row>  
                <Row style={{fontFamily: 'Inconsolata'}}>
                   
                    <Col lg={4} md={6} sm={12} className="text-center mt-5 p-3" style={{marginTop:"80px"}}>
                        <Form>
                             <center >
                               <h4 >Authenticate</h4>
                             </center>
                            
                         <Form.Group controlId="formBasicEmail">
                         <InputGroup >
                            <InputGroupText>
                            {' '} .<FontAwesomeIcon icon={faStreetView} /> {' '}
                            </InputGroupText>
                            <Input value={name}  onChange={e => setName(e.target.value)} placeholder="username" />
                          </InputGroup>
                         </Form.Group>
                         <br></br>
                         <Form.Group controlId="formBasicPassword">
                         <InputGroupText  onClick={Eye}>
                                  <FontAwesomeIcon icon={faUserLock} />{' __ '}
                                  <Input value={pass} type={password} 
                                   onChange={e => setPass(e.target.value)} placeholder="secret" 
                                   onKeyDown={u => u.key === 'Enter' && auth()}
                                   />
                                  {' _ '}<FontAwesomeIcon  icon = {eye ? faEye : faEyeSlash} />
                              </InputGroupText>
                         </Form.Group>
                         <br></br>
                         <Button  onClick= {e => auth()} >Login</Button>
                         <br />
                         <code style={{color : "red"}}>{msg}</code>
                            
                        </Form>
                    </Col>
                    <Col lg={8} md={6} sm={12} className="myImg">
                        <img className="w-100" src={myimg} alt=""/>
                    </Col>
               
                </Row>
            </Container>
    );
};

export default Login; 
