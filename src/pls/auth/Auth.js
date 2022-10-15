import React  from "react"
import { Navigate, useLocation } from 'react-router-dom';
import jwt_decode from "jwt-decode";


 export const Auth = ({children})  => {
        let location = useLocation();
        
        try{
                var decoded = jwt_decode(localStorage.getItem("arixauth"));
                if(decoded){
                        return children
                } 
                
               return  <Navigate to="/login" replace/>
        }catch(e){
                console.log("Catching Error");
                return <Navigate to="/login" state={{ from: location }} replace/>
        }
}


