import React, {useState, useEffect} from "react";
import Select from "react-select";
import axios from "axios";
import {Row, Col, Button, FormGroup, Input} from 'reactstrap'

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


function Dashboard (props) {

    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
      const width = hasWindow ? window.innerWidth : null;
      const height = hasWindow ? window.innerHeight : null;
      return {
        width,
        height,
      };
    }


    useEffect(() => {
        getgroups()
    }, [])
  
    const [flip, setFlip] = useState(false)
    const [mirror, setMirror] = useState(false)
    const [landscape, setLandscape] = useState(false)
    const [layout, setLayout] = useState("layout1")
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());    
    const [selectedGroup, setSelectedGroup] = useState({})
    const [selectedContent, setSelectedContent] = useState({})
    const [data, setData] = useState({contentType : "", fileName : ""})

    const [previewfile , setPreviewfile] = useState()

    const [glist, setGlist] = useState([])
    const content = [
        {value : 0, label : "contentA"},
        {value : 1, label : "contentB"},
        {value : 2, label : "contentC"}
    ]

    
    const goptions = glist.map(y => {
        return {value : y.groupID, label : y.displayName}
    }) 

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
    
 
    const cleardata = () => {
        setPreviewfile()
        setData()
        getdata()
    }

    const getdata = () => {
        props.setShowProcessing(true)
        
        axios({
            method: "get",
            headers: {"arixauth" : localStorage.getItem("arixauth")},
            url: `${process.env.REACT_APP_APIURL}/lgn/contentt/${selectedGroup.value}/${selectedContent.label}`,
          })
            .then((response) => {
                setData(response.data)                
                setPreviewfile(response.data.fileName)
                props.setShowProcessing(false)
            })
            .catch((error) => {
                props.setShowProcessing(false)
                  //alert.info(<h6 className="palert">Something went wrong, please contact system@arix.tech or login again.</h6>)              
                  props.history.push("/login")  
                })
    }

    {/** 
    const getdatab = (group, location) => {
        props.setShowProcessing(true)
        
        axios({
            method: "get",
            headers: {"arixauth" : localStorage.getItem("arixauth")},
            url: `${process.env.REACT_APP_APIURL}/lgn/contentt/${group}/${location}`,
          })
            .then((response) => {
                setData(response.data)                
                setPreviewfile(response.data.fileName)
                props.setShowProcessing(false)
                
                

            })
            .catch((error) => {
                props.setShowProcessing(false)
                  //alert.info(<h6 className="palert">Something went wrong, please contact system@arix.tech or login again.</h6>)              
                  props.history.push("/login")  
                })
    }
    */}
    //mirror && "mirrorer" +  
    const iframereturn = () => {
        let flipandmirror = ""
        let mirrorr = ""  
        let landscapeer = ""
        if(mirror){
            mirrorr= "mirrorer"    
        }
        if(flip){
            flipandmirror= "flipper"    
        }
        if(landscape){
            landscapeer = "landscaper"
        }
        
        try{
            return (
                <div className={flipandmirror}>
                    <div className={landscapeer} style={{marginTop : landscapeer ? "10%" : "0"}}>
                        <div className={mirrorr}>
                    { data.contentType === "Image" ? 
                    <img src = {`${process.env.REACT_APP_APIURL}/images/${previewfile}`} alt="file" />
                    : <>
                        
                        <video autoPlay loop controls style={{ objectFit : "cover", overflow : "hidden"}} height={windowDimensions.height /2} width={windowDimensions.width /2}>
                            <source src={`${process.env.REACT_APP_APIURL}/vids/${previewfile}`} type="video/mp4"></source>
                        </video>
                    </>
                    }
                        </div>
                    </div>
                </div>
            )
        }catch(e){

        }
    }

    return (
        <div style={{marginTop : 20, marginRight : 20, marginLeft :20}}>
            
            <Row>
                <Col></Col>
                <Col md="1">Group</Col>
                <Col md="2">
                <Select styles={customStyles} 
                                            options = {goptions} 
                                            onChange={e => setSelectedGroup(e)} 
                                            value={selectedGroup} />
                </Col>
                <Col md="1">Content</Col>
                    
                <Col md="2">
                <Select styles={customStyles} 
                                            options = {content} 
                                            onChange={e => {
                                                getdata(selectedGroup.value, e.label)
                                                setSelectedContent(e)
                                            }
                                            } 
                                            value={selectedContent} />
                </Col>
                <Col md ="2"><Button size='sm' onClick={t => {cleardata();}} >Preview</Button></Col>
                <Col>Mirror 
                                            <FormGroup switch>
                                                    <Input
                                                    type="switch"
                                                    checked={mirror}
                                                    onChange={() => {
                                                        setMirror(!mirror);
                                                    }}

                                                    />
                                                </FormGroup>
                                            </Col>
                <Col>Flip 180 
                                            <FormGroup switch>
                                                    <Input
                                                    type="switch"
                                                    checked={flip}
                                                    onChange={() => {
                                                        setFlip(!flip);
                                                    }}
                                                    />
                                                </FormGroup>
                                            </Col>
                <Col>Landscape 
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
                <Col></Col>
               
            </Row>
            <Row style={{marginTop: 10}}>
                <Col>
                    <center>
                        {iframereturn()}
                    </center>
                
                </Col>
            </Row>
            
        </div>
        
    )
}

export default Dashboard;