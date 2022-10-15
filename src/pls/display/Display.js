import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { createSearchParams, useSearchParams } from "react-router-dom";
import {Row, Col} from 'reactstrap'

function Display(props) {
    const [data, setData ] = useState({})
    const [searchParams, setSearchParams] = useSearchParams();
    const [screenData, setScreenData] = useState({})
    const [groupData, setGroupData] = useState({})
    const [contentData, setContentData] = useState([])
    const screenid = searchParams.get("screenid");

    const [counter, setCounter] = React.useState(process.env.REACT_APP_COUNTER);

    const [em , setEm] = useState("Error")

    
    

    useEffect(() => {
        fetchData()
    }, [screenid])

    React.useEffect(() => {
        counter > 0 && setTimeout(() => {setCounter(counter - 1); if(counter === 1){setCounter(10) ; fetchData();  } }, 1000);
      }, [counter]);

    const fetchData =() => {
        axios({
            method: "get",
            headers: {"arixauth" : localStorage.getItem("arixauth")},
            url: `${process.env.REACT_APP_APIURL}/lgn/screens/${screenid}`,
          })
            .then((response) => {
                try{
                  console.log(response.data.group) 
                  console.log(groupData) 
                   
                   if((response.data.content[0].fileName === contentData[0].fileName) &&
                         (response.data.group.isLandscape === groupData.isLandscape) && 
                         (response.data.group.isFlipA === groupData.isFlipA) && 
                         (response.data.group.isFlipB === groupData.isFlipB) &&
                         (response.data.group.isFlipC === groupData.isFlipC) && 
                         (response.data.group.isMirrorA === groupData.isMirrorA) && 
                         (response.data.group.isMirrorB === groupData.isMirrorB) && 
                         (response.data.group.isMirrorC === groupData.isMirrorC))  {
                        return    
                    }
                    else{
                       setScreenData([])
                       setGroupData([])
                        setContentData([])
                     //   setScreenData(response.data.screen)
                    //    console.log(response.data.group)
                    //    setGroupData(response.data.group)
                    //    console.log(response.data.content)
                    //    setContentData(response.data.content)
                    }      
                }catch(e){
                    setScreenData(response.data.screen)
                    //    console.log(response.data.group)
                        setGroupData(response.data.group)
                    //    console.log(response.data.content)
                        setContentData(response.data.content)
                    console.log(e)
                }
          //      console.log(response.data.screen)
               
               
            
               
            })
            .catch((error) => {
                console.log(error)
                setEm("Invalid Screen")
            })
    }

    const flayout = () => {
          console.log(groupData.dsplit)  
        try{
            if(groupData.dsplit === "layout1"){
              return(layoutone())  
            }
            if(groupData.dsplit === "layout2"){
                    return(layouttwo())  
            }
            if(groupData.dsplit === "layout3"){
                return(layoutthree())  
            }
        }catch(e){
            console.log(e)
            return(
                <div>{em}</div>
            )
        }
    }



    const layoutone = () => {
        return (
            layoutoned()
        )
    }

    const layoutoned = () => {
        let flipandmirror = ""
        let mirrorr = ""  
        let landscapeer = ""
        if(groupData.isMirrorA){
            mirrorr= "mirrorer"    
        }
        if(groupData.isFlipA){
            flipandmirror= "flipper"    
        }
        if(groupData.isLandscape){
            landscapeer = "landscaper"
        }
        

         const cont = contentData.find(obj => {
            return obj.locationID === "contentA";
          });
        
          

        try{
            console.log(`${process.env.REACT_APP_APIURL}/vids/${cont.fileName}`)
            return (
                <div className={flipandmirror} style={{backgroundColor : "black", overflowY :"none"}}>
                    <div className={landscapeer} style={{backgroundColor : "black",overflowY :"hidden"}}>
                        <div className={mirrorr} style={{backgroundColor : "black",overflowY :"hidden"}}>
                           <code> {counter}</code>
                            
                    { cont.contentType === "Image" ? 
                    <img src = {`${process.env.REACT_APP_APIURL}/images/${cont.fileName}`} alt="file" />
                    : <>
                        
                        <video autoPlay muted loop controls style={{minWidth : "95%", minHeight : "95%"}}>
                            <source src={`${process.env.REACT_APP_APIURL}/vids/${cont.fileName}`} type="video/mp4"></source>
                        </video>
                    </>
                    }
                        </div>
                    </div>
                </div>
            )
        }catch(e){
               console.log("I am in error")
                
        }
    }

    const layouttwo = () => {
        return (
            layouttwod()
        )
    }

    const layouttwod = () => {
        let flipA = ""
        let mirrorA = ""
        let flipB = ""
        let mirrorB = ""  
        let landscapeer = ""
        if(groupData.isLandscape){
            landscapeer = "landscaper"
        }
        if(groupData.isMirrorA){
            mirrorA= "mirrorer"    
        }
        if(groupData.isFlipA){
            flipA= "flipper"    
        }
        if(groupData.isMirrorB){
            mirrorB= "mirrorer"    
        }
        if(groupData.isFlipB){
            flipB= "flipper"    
        }

         const contA = contentData.find(obj => {
            return obj.locationID === "contentA";
          });
        const contB = contentData.find(obj => {
            return obj.locationID === "contentB";
          });  
         
          try{
            return (
                <Row className={landscapeer} style={{backgroundColor : "black", }}>
                    <Col md="6">
                        <div className={flipA} style={{backgroundColor : "black", overflowY :"none"}}>
                            <div className={mirrorA} style={{backgroundColor : "black",overflowY :"hidden"}}>
                        { contA.contentType === "Image" ? 
                        <img src = {`${process.env.REACT_APP_APIURL}/images/${contA.fileName}`} alt="file" />
                        : <>
                            
                            <video autoPlay muted loop controls style={{minWidth : "95%", minHeight : "95%" , backgroundColor :"black"}}>
                                <source src={`${process.env.REACT_APP_APIURL}/vids/${contA.fileName}`} type="video/mp4"></source>
                            </video>
                        </>
                        }
                         </div>
                    </div>
                    </Col>
                    <Col md="6" style={{overflowX: "hidden" }}>
                        <div className={flipB} style={{backgroundColor : "black", overflow :"hidden"}}>
                                <div className={mirrorB} style={{backgroundColor : "black",overflow :"hidden"}}>
                            { contB.contentType === "Image" ? 
                            <img src = {`${process.env.REACT_APP_APIURL}/images/${contB.fileName}`} alt="file" />
                            : <div style={{overflow : "hidden"}}>
                                
                                <video autoPlay muted loop controls style={{minWidth : "90%", minHeight : "90%", overflow: "hidden", overflowAnchor : "none"}}>
                                    <source src={`${process.env.REACT_APP_APIURL}/vids/${contB.fileName}`} type="video/mp4"></source>
                                </video>
                            </div>
                            }
                            </div>
                        </div>
                    </Col>
                </Row>
                
            )
        }catch(e){
               console.log("I am in error")
                
        }   
      
    }

    const layoutthree = () => {
        return (
            layoutthreed()
        )
    }
    
    const layoutthreed = () => {
        let flipA = ""
        let mirrorA = ""
        let flipB = ""
        let mirrorB = ""
        let flipC = ""
        let mirrorC = ""  
        let landscapeer = ""
        if(groupData.isLandscape){
            landscapeer = "landscaper"
        }
        if(groupData.isMirrorA){
            mirrorA= "mirrorer"    
        }
        if(groupData.isFlipA){
            flipA= "flipper"    
        }
        if(groupData.isMirrorB){
            mirrorB= "mirrorer"    
        }
        if(groupData.isFlipB){
            flipB= "flipper"    
        }
        if(groupData.isMirrorC){
            mirrorC= "mirrorer"    
        }
        if(groupData.isFlipC){
            flipC= "flipper"    
        }

         const contA = contentData.find(obj => {
            return obj.locationID === "contentA";
          });
        const contB = contentData.find(obj => {
            return obj.locationID === "contentB";
          });
        const contC = contentData.find(obj => {
            return obj.locationID === "contentC";
          });  
         
          try{
            return (
                <div id="container">
                    <div className={groupData.isLandscape ?"rotation-wrapper-outer" : "" }>
                        <div className={groupData.isLandscape ? "rotation-wrapper-inner" : ""}>
                            <Row  style={{backgroundColor : "black", }} className={groupData.isLandscape ? "element-to-rotate" : ""}>
                                <Col md="6">
                                    <div className={flipA} style={{ marginTop : 0, backgroundColor : "black", overflowY :"none"}}>
                                        <div className={mirrorA} style={{backgroundColor : "black",overflowY :"hidden"}}>
                                    { contA.contentType === "Image" ? 
                                    <img src = {`${process.env.REACT_APP_APIURL}/images/${contA.fileName}`} alt="file" />
                                    : <>
                                        
                                        <video autoPlay muted loop controls
                                        style={{minWidth : "95%", minHeight : "95%" , backgroundColor :"black"}}>
                                            <source src={`${process.env.REACT_APP_APIURL}/vids/${contA.fileName}`} type="video/mp4"></source>
                                        </video>
                                    </>
                                    }
                                    </div>
                                </div>
                                </Col>
                                <Col md="6">
                                    <Row>
                                        <Col>
                                        <div className={flipB} style={{backgroundColor : "black", overflowY :"none"}}>
                                            <div className={mirrorB} style={{backgroundColor : "black",overflowY :"hidden"}}>
                                                { contB.contentType === "Image" ? 
                                                <img src = {`${process.env.REACT_APP_APIURL}/images/${contB.fileName}`} alt="file" />
                                                : <>
                                                    
                                                    <video autoPlay muted loop controls style={{minWidth : "95%", minHeight : "95%"}}>
                                                        <source src={`${process.env.REACT_APP_APIURL}/vids/${contB.fileName}`} type="video/mp4"></source>
                                                    </video>
                                                </>
                                                }
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <div className={flipC} style={{backgroundColor : "black", overflowY :"none"}}>
                                            <div className={mirrorC} style={{backgroundColor : "black",overflowY :"hidden"}}>
                                            { contC.contentType === "Image" ? 
                                            <img src = {`${process.env.REACT_APP_APIURL}/images/${contC.fileName}`} alt="file" />
                                            : <>
                                                
                                                <video autoPlay muted loop controls style={{minWidth : "95%", minHeight : "95%"}}>
                                                    <source src={`${process.env.REACT_APP_APIURL}/vids/${contC.fileName}`} type="video/mp4"></source>
                                                </video>
                                            </>
                                            }
                                            </div>
                                        </div>
                                        </Col>
                                    </Row>
                                
                                </Col>
                            </Row>
                        
                        </div>
                    </div>
                </div>
                
            )
        }catch(e){
               console.log("I am in error")
                
        }   
      
    }

    return (
        <div  style={{backgroundColor: "black"}}>
            {em === "Invalid Screen"  ? "Invalid Screen" :  flayout()}
        </div>
    )

}

export default Display