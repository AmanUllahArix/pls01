

import React , {useEffect} from "react"
import jwt_decode from "jwt-decode";
import ErrorPage from './ErrorPage';
import { useDispatch} from 'react-redux'

import { connect } from 'react-redux'
import Navbar from './menu/NavRes'
import { profileFetch } from "../actions/actions"



function ContainedNew({children}) {
    var decoded = jwt_decode(localStorage.getItem("arixauth"));
    let dt = decoded.exp * 1000;
    const dispatch = useDispatch();
  
     useEffect(() => {
        dispatch(profileFetch())
       }, [])
  
   //className="d-none d-md-block d-lg-block d-xl-block"
    return (
        <div  >
            <div style={{ zIndex : 9, minWidth :"100%"}} >
           <header >
          
           <Navbar/>
           </header>
      {/**       {children}*/}
        </div>   
     {/**    <div className="d-md-none d-lg-none">
            <ErrorPage pageTitle = "Screen Size mismatch !" pagePara1={"Screen is too small for the system to work properly."} 
            pagePara2={"Please connect screen with proper resolution."}/>
        </div> */}
    </div>
      );
    }
    
    export default connect(null, { profileFetch } )(ContainedNew);
    