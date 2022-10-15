import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { createSearchParams, useSearchParams } from "react-router-dom";
import {Row, Col, Container} from 'reactstrap'

function DisplayNj(props) {
    const [data, setData ] = useState({})
    const [searchParams, setSearchParams] = useSearchParams();
    const [screenData, setScreenData] = useState({})
    const [groupData, setGroupData] = useState({})
    const [contentData, setContentData] = useState([])
    const screenid = searchParams.get("screenid");

    const [screenHeight, setScreenHeight] = useState("")
    const [screenwoHeight, setScreenwoHeight] = useState("")
    const [screenWidth, setScreenWidth] = useState("")
    const [screenwoWidth, setScreenwoWidth] = useState("")
    const [screenwooWidth, setScreenwooWidth] = useState("")
    const [counter, setCounter] = React.useState(process.env.REACT_APP_COUNTER);

    const [em , setEm] = useState("Error")

    
    

    useEffect(() => {
        fetchData()
    }, [screenid])

    React.useEffect(() => {
        counter > 0 && setTimeout(() => {setCounter(counter - 1); if(counter === 1){setCounter(5) ; fetchData();  } }, 1000);
      }, [counter]);

    const fetchData =() => {
        axios({
            method: "get",
            headers: {"arixauth" : localStorage.getItem("arixauth")},
            url: `${process.env.REACT_APP_APIURL}/lgn/screens/${screenid}`,
          })
            .then((response) => {
                try{
                   
                   if((response.data.content[0].fileName === contentData[0].fileName) &&
                     (response.data.content[1].fileName === contentData[1].fileName) &&
                       (response.data.content[2].fileName === contentData[2].fileName) &&
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
                    }      
                }catch(e){
                    console.log("I AM HERE IN CATCH BLOCK")
                    let hig = Number(String(response.data.screen.resolution).split("x")[1].trim())
                    let wig = Number(String(response.data.screen.resolution).split("x")[0].trim())
                    
                    //    let widwunit = wid.concat("px")
                    setScreenHeight(hig+"px")
                    setScreenwoHeight(String(Number(hig)/2)+"px")

                    setScreenWidth(wig+"px")
                    setScreenwoWidth(String(Number(wig)/2)+"px")
                    setScreenwooWidth(String(Number(wig)/3)+"px")

                    setScreenData(response.data.screen)
                    
                        setGroupData(response.data.group)
                        setContentData(response.data.content)
                }
            })
            .catch((error) => {
                setEm("Invalid Screen")
            })
    }

    const flayout = () => {
          
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
            return (
                <div style={{minWidth:screenWidth ,  maxWidth : screenWidth , minHeight: screenHeight, height: screenHeight, maxHeight: screenHeight, 
                    border : "10px solid green", overflow: "hidden"}} className={landscapeer}  >
                      <center><div className={flipandmirror} style={{ overflow : "hidden"}} ><center>
                            <div className={mirrorr} style={{overflow : "hidden"}} ><center>
                            { cont.contentType === "Image" ? 
                                <img src = {`${process.env.REACT_APP_APIURL}/images/${cont.fileName}`} style={{objectFit: "cover"}} width={screenWidth} alt="file" />
                                : <div style={{width : "100%", overflow :"hidden"}}>
                                    
                                    <video autoPlay muted loop controls style={{ objectFit : "cover", overflow : "hidden"}} height={screenHeight} width={screenWidth} >
                                        <source src={`${process.env.REACT_APP_APIURL}/vids/${cont.fileName}`} type="video/mp4"></source>
                                    </video>
                                </div>
                                }
                            </center></div>
                            </center></div>
                      </center>
                </div>
            )
        }catch(e){
                
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
                <div>
                    Layer 2
                </div>
            )
        }catch(e){
                
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
                <div>
                    Layher 3
                </div>
            )
        }catch(e){
                
        }   
      
    }

    return (
     <div>
        {flayout()}
     </div>
       
    )

}

export default DisplayNj