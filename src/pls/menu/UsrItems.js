import React , { useState, useEffect, useRef } from 'react'
import Drpdown from "./Drpdown";
import { faCoffee, faLock , faGear, faGears} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../Logout'
import { faBell , faBellConcierge} from '@fortawesome/free-solid-svg-icons'
import { faBell as faBella } from '@fortawesome/free-regular-svg-icons'
import { useSelector , useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import myimg from '../images/system/pls.png';

const UsrItems = ({ items, depthLevel, key }) => {
    let navigation = useNavigate()
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();
    const storp = useSelector(state => state.profile.userData)


    
    useEffect(() => {
        const handler = (event) => {
         if (dropdown && ref.current && !ref.current.contains(event.target)) {
          setDropdown(false);
         }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
         // Cleanup the event listener
         document.removeEventListener("mousedown", handler);
         document.removeEventListener("touchstart", handler);
        };
       }, [dropdown]);

    const helpers = (menuitem) => {
        if(menuitem === "Logout"){
            logout()
        }    
   }

    

 return (
  <li className="menu-itemss ms-auto" ref={ref} key={key}>
   
            
   {items.submenu ? (
    <>
        <img
                          alt="..."
                          className="avatar border-gray"
                          src =  {`${process.env.REACT_APP_APIURL}/dps/${storp.empID}/${storp.dpn}`}
                          width="60px" style={{maxWidth : "40px", maxHeight :"40px" , borderRadius : "40%" ,
                            marginRight : "10px", marginTop : "2px" , backgroundColor : "transparent"}}
                          onClick={() => {
                                setDropdown((prev) => !prev)
                                helpers(items.title)
                                }}  
                          
        />
    
        <Drpdown  submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel} />
    </>
   ) : (
    <a style={{cursor : "pointer"}}
        onClick={e => {
            if(items.comp === "logout"){
                helpers(items.title)
                navigation(`/`)
                
            }else{
                navigation(`/box/${items.comp}`)

                }
            }
        }
    >{items.title}</a>
   )}
  </li>
 );
};

export default UsrItems;