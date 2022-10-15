import React, { useEffect } from "react"
import myimg from './images/system/logocc.png';


function ErrorPage(props) {
   let pagetitle = "Screen size too small !"
   let pagePara1 = "Sorry but the page you are trying to use can not be viewed on the screen size you are using !"
   let pagePara2 = "This is not an error but system limitation, you can state the purpose and justification to limitations@arix.tech and we will see what we could do to help you in it."

   useEffect(() => {

   },[props])

    return (
     
      <div>
         <center>
         <img src={myimg} width="400px" alt="ABC" />
         <br />
         <br />
         <h1 >   
            {props.pageTitle} 
         </h1>
         <h5 >{props.pagePara1}</h5>
         <br />
            {props.pagePara2} 
         </center>
         
      </div>

    );
  }
  
  export default ErrorPage;
  