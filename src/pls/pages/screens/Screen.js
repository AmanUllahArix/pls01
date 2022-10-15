import React, {useState, useEffect} from "react";
import {Row, Col, Button, Input,
    Badge, Card, CardHeader, CardBody, FormGroup, Label, CardFooter , Spinner , Table , Modal , ModalHeader,ModalBody, ModalFooter} 
from 'reactstrap'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import { faEdit, faRemove, faUser ,faIcons, faAdd, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { profileFetch } from "../../../actions/actions"
import { useDispatch} from 'react-redux'
import Select from "react-select";
import styled from 'styled-components'
import Layout1 from '../../images/system/Layout1.png'
import Layout2 from '../../images/system/Layout2.png'
import Layout3 from '../../images/system/Layout3.png'

export const customStyles = {
    control: base => ({
        ...base,
        minHeight: 30,
        color : "#2a63ad"
        
    }),
    container: base => ({
        ...base,
        fontSize: "0.8em",
        color : "#2a63ad",
        fontWeight : "bold",
        border : "1px solid black"
    }),
    dropdownIndicator: base => ({
        ...base,
        padding: 4
    }),
    clearIndicator: base => ({
        ...base,
        padding: 4
    }),
    valueContainer: base => ({
        ...base,
        padding: '0px 6px',
        color : "#2a63ad"
    }),
    input: base => ({
        ...base,
        margin: 0,
        padding: 0,
        color : "#2a63ad"
    }),
    
};

let rlist = [
    {value: 0 , label : "1920 x 1080"},
    {value: 0 , label : "1680 x 1050"},
    {value: 0 , label : "1440 x 900"},
    {value: 0 , label : "1400 x 1050"},
    {value: 0 , label : "1366 x 768"},
    {value: 0 , label : "1360 x 768"},
    {value: 0 , label : "1280 x 1024"},
    {value: 0 , label : "1280 x 960"},
    {value: 0 , label : "1280 x 800"},
    {value: 0 , label : "1280 x 768"},
    {value: 0 , label : "1280 x 720"},
    {value: 0 , label : "1280 x 600"},
    {value: 0 , label : "1152 x 864"},
    {value: 0 , label : "1024 x 768"},
    {value: 0 , label : "800 x 600"}

]

function Screen (props) {
    const [screenName, setScreenName] = useState("")
    const [screenID, setScreenID] = useState("")
    const [mac, setMac] = useState("")
    const [groupID, setGroupID] = useState("")
    const [groupName, setGroupName] = useState("")
    
    const [storee, setStoree] = useState("")
    const [area, setArea] = useState("")
    const [location, setLocation] = useState("")
    
    const [screenresolution , setScreenresolution] = useState("");
    const [screenSize , setScreenSize] = useState("");

    
    const [glist , setGlist] = useState([])
    const [slist , setSlist] = useState([])
   
    
    const resetval = () => {
        setGroupID(""); setGroupName("");
        setScreenID("");setScreenName(""); setMac("")
        setStoree(""); setArea(""); setLocation("");
        setScreenresolution(""); setScreenSize("");
        
    }

    const glistoptions = glist.map(e => { return {
        value : e.groupID, name: e.groupID + "-" + e.displayName ,  label : e.displayName
    }})

    const contentList = [{value: 0, label : "Image"},{value: 1, label : "Video"},{value: 2, label : "Stream"}]

    const submitgroup = (e) => {
        if(groupID === "" || groupID === undefined){
            swal({
                title: `Error ! `,
                text: `Group ID is incorrect`,
                icon: "error",
                button: "Back",
            })
            return 
        }
        if(screenName === "" || screenName === undefined){
            swal({
                title: `Error ! `,
                text: `Screen Name is incorrect`,
                icon: "error",
                button: "Back",
            })
            return 
        }
        if(location === "" || location === undefined){
            swal({
                title: `Error ! `,
                text: `location is incorrect`,
                icon: "error",
                button: "Back",
            })
            return 
        }
        if(storee === "" || storee === undefined){
            swal({
                title: `Error ! `,
                text: `Storee is incorrect`,
                icon: "error",
                button: "Back",
            })
            return 
        }
        if(area === "" || area === undefined){
            swal({
                title: `Error ! `,
                text: `Area is incorrect`,
                icon: "error",
                button: "Back",
            })
            return 
        }
        if(screenresolution === "" || screenresolution === undefined){
            swal({
                title: `Error ! `,
                text: `Resolution is incorrect`,
                icon: "error",
                button: "Back",
            })
            return 
        }
        if(screenSize === "" || screenSize === undefined){
            swal({
                title: `Error ! `,
                text: `Size is incorrect`,
                icon: "error",
                button: "Back",
            })
            return 
        }
      //
        else{
            props.setShowProcessing(true)
            axios.post(`${process.env.REACT_APP_APIURL}/lgn/screens`
            , { screenID, screenName, groupID, displayName : groupName,storee, area, location, mac, resolution : screenresolution, size: screenSize
            }
        , { headers : {'Content-Type': 'application/json', 'arixauth' : localStorage.getItem('arixauth')}})
          .then(res => {
            getscreens()
   
            props.setShowProcessing(false)
            swal({
                title: `${res.data.message}`,
                text: `success`,
                icon: "success",
                button: "Back",
            })
            resetval()
            getgroups()
            
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

    useEffect(() => {
        getgroups()
        getscreens()
    }, [])

    const screensel = (data) => {

      setScreenID(data.screenID);
      setScreenName(data.screenName)
      setGroupID(data.groupID);
      setGroupName(data.displayName);
      setMac(data.mac);
      setStoree(data.store)
      setArea(data.area)
      setLocation(data.location)
      setScreenresolution(data.resolution)
      setScreenSize(data.size)

    }

    const screenlist = () => {   
      return(  
        slist.map(y => {
            
            return (
                <tr style={{textAlign : "center"}}>
                    <td><Button size="sm" style={{fontSize : "0.5rem"}} onClick={gt=> {screensel(y)} }>{y.screenID}</Button> </td>
                    <td>{y.screenName}</td>
                    <td>{y.groupID + y.displayName}</td>
                    <td>{y.mac}</td>
                    <td>{y.store}</td>
                    <td>{y.area}</td>
                    <td>{y.location}</td>
                    <td>{y.resolution}</td>
                    <td>{y.size}</td>
                </tr>
            )
        })
        )
    }

    const getgroups = () => {
        props.setShowProcessing(true)
        axios({
            method: "get",
            headers: {"arixauth" : localStorage.getItem("arixauth")},
            url: `${process.env.REACT_APP_APIURL}/lgn/groups`,
          })
            .then((response) => {
                
                setGlist(response.data)                
                props.setShowProcessing(false)
            })
            .catch((error) => {
                props.setShowProcessing(false)
                  //alert.info(<h6 className="palert">Something went wrong, please contact system@arix.tech or login again.</h6>)              
                  props.history.push("/login")  
                })
    }

    const getscreens = () => {
        props.setShowProcessing(true)
        axios({
            method: "get",
            headers: {"arixauth" : localStorage.getItem("arixauth")},
            url: `${process.env.REACT_APP_APIURL}/lgn/screens`,
          })
            .then((response) => {
                
                setSlist(response.data)                
                props.setShowProcessing(false)
            })
            .catch((error) => {
                props.setShowProcessing(false)
                  //alert.info(<h6 className="palert">Something went wrong, please contact system@arix.tech or login again.</h6>)              
                  props.history.push("/login")  
                })
    }

    return (
        <div style={{ paddingRight :10, paddingLeft: 10}}>
            {props.showProcessing ? <div style={{marginTop : "100px"}}><center><Spinner /></center></div> :  
                    <Card style={{marginTop : 20}}>
                        <CardHeader>
                            Display Screens
                        </CardHeader>
                        <Row style={{paddingRight :10, paddingLeft: 10}}>
                            <Col md="5" style={{marginTop :5}} className="shadow">
                                    <Card>
                                        <CardHeader>Screen Settings
                                            <Button size="sm" color="warning" style={{float: "right"}} onClick={r => resetval()}> New</Button>
                                        </CardHeader>
                                        <CardBody style={{fontSize :"0.9rem"}}>
                                            <Row>
                                                <Col md="4">
                                                    <Row>
                                                        <Col md="6" style={{marginTop : 5}}>Screen:</Col>
                                                        <Col md="6"><Input bsSize="sm" type="text" disabled placeholder="Auto" /></Col>
                                                    </Row>
                                                </Col>
                                                <Col md="4">
                                                    <Row>
                                                        <Col md="4" style={{marginTop : 5, float: "right"}}>Name:</Col>
                                                        <Col md="8"><Input bsSize="sm" type="text" maxLength="15" value={screenName} onChange={e => setScreenName(e.target.value)}/></Col>
                                                    </Row>
                                                </Col>
                                                <Col md="4">
                                                    <Row>
                                                        <Col md="4" style={{marginTop : 5, float: "right"}}>MAC:</Col>
                                                        <Col md="8"><Input bsSize="sm" type="text" maxLength="20" value={mac} onChange={e => setMac(e.target.value)}/></Col>
                                                    </Row>
                                                </Col>
                                            </Row>

                                            <Row style={{marginTop : 10}}>
                                                <Col md="6">
                                                    <Row>
                                                        <Col md="6" style={{marginTop : 5}}>Display Group:</Col>
                                                        <Col md="6">
                                                            <Select styles={customStyles} 
                                                            options = {glistoptions} 
                                                            onChange={e => {setGroupID(e.value);setGroupName(e.label)}}

                                                            value={{value : groupID, label : groupID + "-"+ groupName}} />

                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md="6">
                                                    <Row>
                                                        <Col md="6" style={{marginTop : 5}}>Store:</Col>
                                                        <Col md="6"><Input bsSize="sm" type="text" placeholder="Store Name" value={storee} onChange={e => setStoree(e.target.value)} /></Col>
                                                    </Row>
                                                </Col>
                                        
                                            </Row>

                                            <Row style={{marginTop :10 }}>
                                                <Col md="6">
                                                    <Row>
                                                        <Col md="4" style={{marginTop : 5, float: "right"}}>Area:</Col>
                                                        <Col md="8"><Input bsSize="sm" type="text" maxLength="15" placeholder="Store Area" value={area} onChange={e => setArea(e.target.value)}/></Col>
                                                    </Row>
                                                </Col>
                                                <Col md="6">
                                                    <Row>
                                                        <Col md="4" style={{marginTop : 5, float: "right"}}>Location:</Col>
                                                        <Col md="8"><Input bsSize="sm" type="text" maxLength="50" placeholder="Screen Location" value={location} onChange={e => setLocation(e.target.value)}/></Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row style={{marginTop :10}}>
                                            <Col md="6">
                                                    <Row>
                                                        <Col md="6" style={{marginTop : 5, float: "right"}}>Resolution (W x H):</Col>
                                                        <Col md="6">
                                                            <Select styles={customStyles} 
                                                                options = {rlist} 
                                                                onChange={e => {setScreenresolution(e.label)}}
                                                                value={{value : "0", label : screenresolution}} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md="6">
                                                    <Row>
                                                        <Col md="6" style={{marginTop : 5, float: "right"}}>Size:</Col>
                                                        <Col md="6">
                                                        <Input maxLength="20" bsSize="sm" onChange={e => {setScreenSize(e.target.value)}}
                                                                value={screenSize} />
                                                            
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                        <CardFooter>
                                            <Button color="warning" style={{float :"right"}} size="sm" onClick={e => submitgroup()}>Submit</Button>                   

                                        </CardFooter>
                                    </Card>
                            </Col>
                            <Col md="7" className="shadow"  style={{marginTop :5, mixWidth : "800px", overflow : "auto"}}>
                                <Card style={{minWidth : "800pxx"}}>
                                    <CardHeader>
                                        List
                                    </CardHeader>
                                    <CardBody>
                                        <Table style={{fontSize : "0.8rem" , textAlign : "center"}}>
                                            <thead>
                                                <tr>
                                                <th>ID</th>
                                                <th>Screen</th>
                                                <th>Group</th>
                                                <th>MAC</th>
                                                <th>Store</th>
                                                <th>Area</th>
                                                <th>Location</th>
                                                <th>Resolution</th>
                                                <th>Size</th>
                                                </tr>
                                                </thead>
                                            <tbody>
                                            { screenlist() }
                                            </tbody>
                                            </Table>                           
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
            }
        </div>
    )
}

export default Screen