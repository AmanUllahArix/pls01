import React, {useState, useEffect} from "react";
import {Row, Col, Button, Input, Progress,
    Badge, Card, CardHeader, CardBody, FormGroup, Label, CardFooter , Spinner , Table , Modal , ModalHeader,ModalBody, ModalFooter} 
from 'reactstrap'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import { faEdit, faRemove, faUser ,faIcons, faAdd, faUserSecret , faUpload} from '@fortawesome/free-solid-svg-icons'
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


function Groups (props) {
    const [{alt, src}, setImg] = useState({
        src: '',
        alt: ''
    });
    const [uploadProgress, setUploadProgress] = useState("0")
    const [groupID, setGroupID] = useState("")
    const [groupName, setGroupName] = useState("")
    const [border, setBorder] = useState(0)
    const [layout, setLayout] = useState("Layout1")
    const [flip, setFlip] = useState(false)
    const [mirror, setMirror] = useState(false)
    const [landscape, setLandscape] = useState(true)

    const [aflip, setAflip] = useState(false)
    const [amirror, setAmirror] = useState(false)
    const [contentA, setContentA] = useState({value: 0, label :""})
    const [bflip, setBflip] = useState(false)
    const [bmirror, setBmirror] = useState(false)
    const [contentB, setContentB] = useState({value: 0, label :""})
    const [cflip, setCflip] = useState(false)
    const [cmirror, setCmirror] = useState(false)
    const [contentC, setContentC] = useState({value: 0, label :""})
    
    const [glist , setGlist] = useState([])

    const [uploadOpen, setUploadOpen] = useState(false)
    const toggle = () => setUploadOpen(!uploadOpen)
    
    const [ddd, setDdd] = useState("")
    const [id, setId] = useState({})

    const [file, setFile] = useState()

    const handleImg = (e) => {
            console.log(e)
            setFile(e.target.files[0])
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });
        }   
    

    const resetval = () => {
        setGroupID(""); setGroupName("");setBorder("0");
        setAflip(false); setAmirror(false);setBflip(false); 
        setBmirror(false); setCflip(false); setCmirror(false);
        setFlip(false);setMirror(false);setLandscape(false);
        setLayout("layout1")            
        setContentA({value : 0 , label : ""})
        setContentB({value : 0 , label : ""})            
        setContentC({value : 0 , label : ""})
    }

    const contentList = [{value: 0, label : "Image"},{value: 1, label : "Video"}]

    const submitgroup = (e) => {
        if(contentA.label === "" || contentA.label === undefined){
            swal({
                title: `Error ! `,
                text: `ContentA is incorrect`,
                icon: "error",
                button: "Back",
            })
            return 
        }
        if(contentB.label === {} || contentB.label === undefined){
            swal({
                title: `Error ! `,
                text: `ContentB is incorrect`,
                icon: "error",
                button: "Back",
            })
            return 
        }
        if(contentC.label === {} || contentC.label === undefined){
            swal({
                title: `Error ! `,
                text: `ContentC is incorrect`,
                icon: "error",
                button: "Back",
            })
            return 
        }
        if(border < 0){
            swal({
                title: `Error ! `,
                text: `Border value is incorrect`,
                icon: "error",
                button: "Back",
            })
            return 
            setBorder(0)
        }
      //  e.preventDefault()
        if(groupName === "" || groupName === undefined){
            swal({
                title: `Error ! `,
                text: `Group Name is required`,
                icon: "error",
                button: "Back",
            })
            return 
        }
        else{
            props.setShowProcessing(true)
            axios.post(`${process.env.REACT_APP_APIURL}/lgn/groups`
            , { groupID , displayName : groupName, border , isLandscape: landscape, isFlip : flip, isMirror: mirror, 
                isFlipA : aflip, isMirrorA: amirror, isFlipB : bflip, isMirrorB: bmirror, isFlipC : cflip, isMirrorC: cmirror,
                contentA : contentA.label , contentB : contentB.label, contentC : contentC.label , dsplit : layout
            }
        , { headers : {'Content-Type': 'application/json', 'arixauth' : localStorage.getItem('arixauth')}})
          .then(res => {
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
    }, [])

    const groupsel = (data) => {
        
        setGroupID(data.groupID); setGroupName(data.displayName);setBorder(data.border);
        setAflip(data.isFlipA); setAmirror(data.isMirrorA);setBflip(data.isFlipB); 
        setBmirror(data.isMirrorB); setCflip(data.isFlipC); setCmirror(data.isMirrorC);
        setFlip(data.isFlipA);setMirror(data.isMirror);setLandscape(data.isLandscape);
        setLayout(data.dsplit)
        setContentA({value : 0 , label : data.contentA})
        setContentB({value : 0 , label : data.contentB})            
        setContentC({value : 0 , label : data.contentC})

    }

    const fileupload =(ddd,id) => {
        
        props.setShowProcessing(true)
        let formData = new FormData(); 
        formData.append("item", file );
        formData.append("groupID", ddd.groupID );
        formData.append("locationID", id );
        formData.append("contentType", ddd[id] );
         
        axios({
            method: "post",
            url : `${process.env.REACT_APP_APIURL}/lgn/fileupload`,
            headers: {
                "Content-Type": "multipart/form-data" , 
                "arixauth" : localStorage.getItem("arixauth")
            },
            onUploadProgress: data => {
                //Set the progress value to show the progress bar
                setUploadProgress(Math.round((100 * data.loaded) / data.total))
              },
            data: formData
            }).then((res) => {
                props.setShowProcessing(false)
                setUploadProgress("0")
                setFile()
                setImg({
                    src: '',
                    alt: ''
                })
                swal({
                    title: `Success`,
                    text: `File Uploaded`,
                    icon: "success",
                    button: "Back",
                })
        
            }).catch(function (error) {
                console.log(error)
                props.setShowProcessing(false)
                setUploadProgress("0")
                swal({
                    title: `Error ! `,
                    text: `Content upload error`,
                    icon: "error",
                    button: "Back",
                })
               console.log(error)
            })
    
        }

    const upload = () => {
        
        return (
            <Modal isOpen={uploadOpen} >
                <ModalHeader toggle={toggle}>
                        <center>{ddd.groupID}{' '}-{' '}{ddd.displayName} ,  {id}    
                        </center>

                        {props.showProcessing ? <center>File upload can take a bit .. <strong>
                                                        <span style={{fontSize : "1em"}}> {uploadProgress} % </span></strong>
                            <Progress
                                max="100"
                                value={uploadProgress}
                                barClassName="progress-bar-danger"
                            />
                            </center> : 
                                ""
                            }        
                </ModalHeader>
                <ModalBody>
                       <Table style={{fontSize : "0.8rem"}}>
                        <thead >
                            <tr >
                                <th>Type</th>
                                <th>File</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <td >{ddd[id]}</td>
                            <td><Input type="file"   onChange={e=> handleImg(e)} style={{  fontSize : "0.8rem"}} bsSize="sm" accept={ddd[id] === "Image" ? process.env.REACT_APP_IMGFILTER : process.env.REACT_APP_VIDEOFILTER} /></td>
                            <td><Button size="sm" style={{  fontSize : "0.8rem"}} color="primary" onClick={f => fileupload(ddd, id)} ><FontAwesomeIcon icon={faUpload} /></Button></td>
                        </tbody>
                        </Table> 
                        {ddd[id] === "Image" ? 
                        <center><img src = {src} alt={"Alter"} style={{maxWidth : "800px", objectFit: "contain"}}/></center>
                        :
                        <center><iframe src = {src} width="800px" /></center> }
                        
 
                 </ModalBody>
                
            </Modal>
        )
    }

    const grouplist = () => {   
      return(  
        glist.map(y => {
            
            return (
                <tr style={{textAlign : "center"}}>
                    <td><Button size="sm" style={{fontSize : "0.5rem"}} onClick={gt=> {groupsel(y)} }>{y.groupID}</Button> </td>
                    <td>{y.displayName}</td>
                    <td>{y.isLandscape ? '\u21C0' : '\u21BF'}</td>
                    <td>{y.isFlip ? '\u21BA' : "×"}</td>
                    <td>{y.isMirror ? "\u21C8" : "×"}</td>
                    <td style={{backgroundColor : "#eeffd4"}}>{y.isFlipA ? 	'\u21BA' : "×"}</td>
                    <td style={{backgroundColor : "#eeffd4"}}>{y.isMirrorA ? "\u21C8" : "×" }</td>
                    <td style={{backgroundColor : "#eeffd4"}}><Button size="sm" style={{fontSize : "0.8rem" , border : "1px solid gray"}} onClick={gt=> {setUploadOpen(true); setDdd(y);setId("contentA")} } color="#eeffd4">{y.contentA}</Button></td>
                    <td style={{backgroundColor : "#fff4d9"}}>{y.isFlipB ? '\u21BA' : "×"}</td>
                    <td style={{backgroundColor : "#fff4d9"}}>{y.isMirrorB ? "\u21C8" : "×"}</td>
                    <td style={{backgroundColor : "#fff4d9"}}><Button size="sm" style={{fontSize : "0.8rem" , border : "1px solid gray"}} onClick={gt=> {setUploadOpen(true); setDdd(y);setId("contentB")} } color="#eeffd4">{y.contentB}</Button></td>
                    <td style={{backgroundColor : "#f0e0ff"}}>{y.isFlipC ? '\u21BA' : "×"}</td>
                    <td style={{backgroundColor : "#f0e0ff"}}>{y.isMirrorC ? "\u21C8" : "×"}</td>
                    <td style={{backgroundColor : "#f0e0ff"}}><Button size="sm" style={{fontSize : "0.8rem" , border : "1px solid gray"}} onClick={gt=> {setUploadOpen(true); setDdd(y);setId("contentC")} } color="#eeffd4">{y.contentC}</Button></td>
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

    return (
        <div style={{ paddingRight :10, paddingLeft: 10}}>
            {upload()}
            {props.showProcessing ? <div style={{marginTop : "100px"}}><center><Spinner /></center></div> :  
            <Card style={{marginTop : 20}}>
            <CardHeader>
                Display Groups
            </CardHeader>
            <Row style={{paddingRight :10, paddingLeft: 10}}>
                <Col md="5" style={{marginTop :5}} className="shadow">
                        <Card>
                            <CardHeader>Display Settings
                                <Button size="sm" color="warning" style={{float: "right"}} onClick={r => resetval()}> New</Button>
                            </CardHeader>
                            <CardBody style={{fontSize :"0.9rem"}}>
                                <Row>
                                    <Col md="6">
                                        <Row>
                                            <Col md="4" style={{marginTop : 5}}>Group ID:</Col>
                                            <Col md="8"><Input bsSize="sm" type="text" disabled placeholder="Auto" /></Col>
                                        </Row>
                                    </Col>
                                    <Col md="6">
                                        <Row>
                                            <Col md="4" style={{marginTop : 5, float: "right"}}>Name:</Col>
                                            <Col md="8"><Input bsSize="sm" type="text" maxLength="15" value={groupName} onChange={e => setGroupName(e.target.value)}/></Col>
                                         </Row>
                                    </Col>
                                </Row>
                                
                                <Row style={{marginTop :10 }}>
                                    <Col md="5">
                                    <Row>
                                        <Col md="8">Landscape:</Col>
                                        <Col md="4">
                                            <FormGroup switch>
                                                            <Input
                                                            type="switch"
                                                            checked={landscape}
                                                            onChange={() => {
                                                                setLandscape(!landscape);
                                                            }}
                                                            />
                                            </FormGroup>
                                        </Col>
                                    </Row>              
                                    </Col>
                                </Row>
                                <Row style={{marginTop :10}}>
                                    <Col md="12">
                                        <Row>
                                            <Col md="8" style={{marginTop :10}}>
                                                <b>Layout: <code>{layout}</code></b>
                                            </Col>
                                            <Col md="4">
                                                <Row>
                                                    <Col style={{marginTop :5}}> Border</Col>
                                                    <Col><Input type="number" min="1" max="5" bsSize="sm" value={border} onChange={e => setBorder(e.target.value)}/></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        
                                    </Col>
                                    <Col md="12" >
                                        <Row style={{marginTop: 20}}>
                                            <Col>
                                                <div className="cont" style={{boxShadow : layout === "layout1" ? "2px 2px #888888" : ""}}>
                                                        <img src={Layout1} width="100px" className="shadow" onClick ={e => setLayout("layout1")}/>
                                                        <div className="top-left">A</div>
                                                </div> 
                                                <div><center>L1</center></div>
                                            </Col>
                                            <Col>
                                                <div className="cont" style={{boxShadow : layout === "layout2" ? "2px 2px #888888" : ""}}>
                                                        <img src={Layout2} width="100px" className="shadow" onClick ={e => setLayout("layout2")}/>
                                                        <div className="top-left">A</div>
                                                        <div className="top-right">B</div>
                                                </div>
                                                <div><center>L2</center></div>
                                            </Col>
                                            <Col>
                                                <div className="cont" style={{boxShadow : layout === "layout3" ? "2px 2px #888888" : ""}}>
                                                        <img src={Layout3} width="100px" className="shadow" onClick ={e => setLayout("layout3")}/>
                                                        <div className="top-left">A</div>
                                                        <div className="top-right">B</div>
                                                        <div className="bottom-right">C</div>
                                                </div>
                                                <div><center>L3</center></div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row style={{marginTop :10, textAlign : "center" ,alignItems : "center" }}>
                                   
                                    <Col>
                                       <Row style={{border : "1px solid gray", color :"red"}}>
                                            <Col md="12">A
                                            <Select styles={customStyles} 
                                            options = {contentList} 
                                            onChange={e => setContentA(e)} 
                                            value={contentA} /></Col>
                                            <Col>Flip 
                                            <FormGroup switch>
                                                    <Input
                                                    type="switch"
                                                    checked={aflip}
                                                    onChange={() => {
                                                        setAflip(!aflip);
                                                    }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col>Mirror
                                            <FormGroup switch>
                                                    <Input
                                                    type="switch"
                                                    checked={amirror}
                                                    onChange={() => {
                                                        setAmirror(!amirror);
                                                    }}
                                                    />
                                                </FormGroup>
                                            </Col>
                                       </Row>
                                    </Col>
                                    <Col>
                                        <Row style={{border : "1px solid gray", color :"blue"}}>
                                                <Col md="12">B <Select styles={customStyles} options = {contentList} 
                                                onChange={e => setContentB(e)} value={contentB}/> </Col>
                                                <Col>Flip
                                                <FormGroup switch>
                                                    <Input
                                                    type="switch"
                                                    checked={bflip}
                                                    onChange={() => {
                                                        setBflip(!bflip);
                                                    }}
                                                    />
                                                </FormGroup>
                                                </Col>
                                                <Col>Mirror
                                                <FormGroup switch>
                                                    <Input
                                                    type="switch"
                                                    checked={bmirror}
                                                    onChange={() => {
                                                        setBmirror(!bmirror);
                                                    }}
                                                    />
                                                </FormGroup>
                                                </Col>
                                        </Row>                
                                    </Col>
                                    <Col>
                                        <Row style={{border : "1px solid gray", color :"green"}}>
                                            <Col md="12">C<Select styles={customStyles} options = {contentList} 
                                            onChange={e => setContentC(e)} value={contentC} /></Col>
                                            <Col>Flip
                                            <FormGroup switch >
                                                    <Input
                                                    type="switch"
                                                    checked={cflip}
                                                    onChange={() => {
                                                        setCflip(!cflip);
                                                    }}
                                                    />
                                                </FormGroup>
                                                </Col>
                                            <Col>Mirror
                                            <FormGroup switch>
                                                    <Input
                                                    type="switch"
                                                    checked={cmirror}
                                                    onChange={() => {
                                                        setCmirror(!cmirror);
                                                    }}
                                                    />
                                                </FormGroup>
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
                <Col md="7" style={{marginTop :5, mixWidth : "800px", overflow : "auto"}} className="shadow" >
                    <Card style={{minWidth : "750px" }}>
                        <CardHeader>
                            List
                        </CardHeader>
                        <CardBody>
                             <Table style={{fontSize : "0.8rem" , textAlign : "center"}}>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>L.scape</th>
                                    <th>Flip</th>
                                    <th>Mirror</th>
                                    <th style={{backgroundColor : "#eeffd4"}}>AFlip</th>
                                    <th style={{backgroundColor : "#eeffd4"}}>AMirror</th>
                                    <th style={{backgroundColor : "#eeffd4"}}>AContnt</th>
                                    <th style={{backgroundColor : "#fff4d9"}}>BFlip</th>
                                    <th style={{backgroundColor : "#fff4d9"}}>BMirror</th>
                                    <th style={{backgroundColor : "#fff4d9"}}>BContnt</th>
                                    <th style={{backgroundColor : "#f0e0ff"}}>CFlip</th>
                                    <th style={{backgroundColor : "#f0e0ff"}}>CMirror</th>
                                    <th style={{backgroundColor : "#f0e0ff"}}>CContet</th>
                                    </tr>                 
                                </thead>
                                <tbody>
                                   { grouplist() }
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

export default Groups