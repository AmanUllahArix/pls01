import React , {useEffect, useState} from 'react'
import {Row, Col, Button, Input,
    Badge, Card, CardHeader, CardBody, FormGroup, Label, CardFooter , Spinner , Table , Modal , ModalHeader,ModalBody, ModalFooter} 
from 'reactstrap'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import { faEdit, faRemove, faUser ,faIcons, faAdd, faUserSecret} from '@fortawesome/free-solid-svg-icons'
import { profileFetch } from "../../../actions/actions"
import { useDispatch} from 'react-redux'

function Users (props) {
    const dispatch = useDispatch();

    const [userslist, setUsersList] = useState([])
    const [updateList, setUpdateList] = useState(false)

    const [editModal, setEditModal] = useState(false)

    const [empID, setEmpID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [passwd, setPasswd] = useState("");
    const [personalEmail, setPersonalEmail] = useState("");
    const [disab, setDisab ] = useState(false)

    useEffect(() => {
        getusers()
    }, [])

// get all users 
const getusers = () => {
    props.setShowProcessing(true)
    axios({
        method: "get",
        headers: {"arixauth" : localStorage.getItem("arixauth")},
        url: `${process.env.REACT_APP_APIURL}/lgn/ngpl`,
      })
        .then((response) => {
            setUpdateList(false)
            setUsersList(response.data)                
            props.setShowProcessing(false)
        })
        .catch((error) => {
            props.setShowProcessing(false)
              //alert.info(<h6 className="palert">Something went wrong, please contact system@arix.tech or login again.</h6>)              
              props.history.push("/login")  
            })
}

const selusers = (e) => {
     setEmpID(e.empID)   
     setDisplayName(e.displayName)   
     //setPasswd(e.passwd)
     setPersonalEmail(e.personalEmail)
     setEditModal(true)
     setDisab(e.disabledRef)
     
    }

const closef = () => {
    setEmpID("")   
     setDisplayName("")   
     //setPasswd(e.passwd)
     setPersonalEmail("")
     setEditModal(false)
     setDisab(false)
}

const submituser = (e) => {
    e.preventDefault()
    if(empID === "" || empID === undefined){
        return 
    }
    if(personalEmail === "" || personalEmail === undefined){
        return 
    }
    if(displayName === "" || displayName === undefined){
        return 
    }
    else{
        props.setShowProcessing(true)
        axios.post(`${process.env.REACT_APP_APIURL}/lgn/cua`
        , { displayName , personalEmail, password: passwd, empID, disabledRef : disab
        }
    , { headers : {'Content-Type': 'application/json', 'arixauth' : localStorage.getItem('arixauth')}})
      .then(res => {
        props.setShowProcessing(false)
        dispatch(profileFetch())
        swal({
            title: `${res.data.message}`,
            text: `success`,
            icon: "success",
            button: "Back",
        })
        closef()
        getusers()
    })
      .catch(e => {
        
        props.setShowProcessing(false)
        try{  
            if(e) {
              swal({
                title: `Error ! `,
                text: `${e.response.status} - ${e.response.data.message}`,
                icon: "error",
                button: "Back",
            })
            }
            }
            catch(e) {
              swal({
                title: `System Error ! `,
                text: `System is offline.`,
                icon: "error",
                button: "Back",
              })
        }
    }) 
    }
}

const deuser = () => {

}


const updatecreate = () => {
    return (
        <Modal isOpen={editModal} >
            <ModalHeader>User Form</ModalHeader>
            <ModalBody>
                <Row style={{marginTop : 10}}>
                    <Col md="4">Emp ID</Col>
                    <Col><Input type="text" bsSize="sm" value={empID} onChange={e => setEmpID(e.target.value)} /></Col>
                </Row>
                <Row style={{marginTop : 10}}>
                    <Col md="4">Display Name</Col>
                    <Col><Input type="text" bsSize="sm" value={displayName} onChange={e => setDisplayName(e.target.value)} /></Col>
                </Row>
                <Row style={{marginTop : 10}}>
                    <Col md="4">Email Address</Col>
                    <Col><Input type="text" bsSize="sm" value={personalEmail} onChange={e => setPersonalEmail(e.target.value)} /></Col>
                </Row>
                <Row style={{marginTop : 10}}>
                    <Col md="4">password</Col>
                    <Col><Input type="password" placeholder='Leave empty not to change' bsSize="sm" value={passwd} onChange={e => setPasswd(e.target.value)} /></Col>
                </Row>
                <Row style={{marginTop : 10}}>
                    <Col md="4">Disabled</Col>
                    <Col>
                    <FormGroup switch>
                            <Input
                            type="switch"
                            checked={disab}
                            onChange={() => {
                                setDisab(!disab);
                            }}
                            />
                    </FormGroup>        
                    
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                
                <Button size="sm" style={{float :"right"}} onClick={t => closef()}>Close</Button>
                <Button size="sm" style={{float :"right"}} color="warning" onClick={e => submituser(e)}>Submit</Button>
            </ModalFooter>
        </Modal>
    )

}    

    return (
        <div style={{marginTop : 20}}>
            {updatecreate()}
            { props.showProcessing ? <div style={{marginTop : "100px"}}><center><Spinner /></center></div> :  
             <Row> 
             <Col md="2"></Col>
             <Col>
                 <Card>
                     <CardHeader>
                         System Users
                         <Button size="sm" style={{float :"right"}} color= "warning" onClick={t => setEditModal(true)} > New </Button>
                     </CardHeader>
                     <CardBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>EmpID</th>
                                    <th>login ID</th>
                                    <th>Display Name</th>
                                  {/**   <th>D.P</th> */}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                userslist.map((e, key) => {
                                    return (
                                        <tr key = {key} >
                                            <td>{e.empID}</td>
                                            <td>{e.personalEmail}</td>
                                            <td>{e.displayName}</td>
                                            <td>
                                                <FontAwesomeIcon icon={faEdit} onClick={s => selusers(e)}/> &emsp;
                                                
                                                {e.disabledRef === "" ? 
                                                    <FontAwesomeIcon icon={faUser} style={{color :"green"}}/> : 
                                                        <FontAwesomeIcon icon={faRemove} style={{color :"red"}}/> }
                                                
                                            </td>
                                    {/**     <div><img src =  {`${process.env.REACT_APP_APIURL}/dps/${e.empID}/${e.dpn}`} /></div> */}
                                        
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                            
                     </CardBody>
                 
                 </Card>
             </Col>
             <Col md="2"></Col>
             </Row>
          }  
          
        </div>
    )
}
export default Users
//export default Users(null, { profileFetch } )(Users);

