import React , { useState, useEffect, useRef } from 'react'
import {useNavigate} from 'react-router-dom';
import Dropdown from "./Dropdown";
import { faCoffee, faLock , faGear, faGears, faHome, faHomeAlt, faHomeLg, faHomeLgAlt,faHomeUser,} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../Logout'

const MenuItms = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();
    let navigation = useNavigate()
            
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
        if(menuitem == "logout"){
            console.log(menuitem)
        }    
                
   }

 return (
  <li className="menu-items" ref={ref}
  style={{  cursor : "pointer" }}>
   {items.submenu ? (
    <>
     <button
      aria-expanded={dropdown ? "true" : "false"}
      
      onClick={(e) => 
        {
            helpers(items);
            setDropdown((prev) => !prev)}
        }
        style={{border : "none",
        backgroundColor : "transparent"}}
     >
     {items.icons ?  <FontAwesomeIcon icon={items.icons} color="gray" /> : <b>items.title</b>}{" "}
      {depthLevel > 0 ? <span className="arrow arrown" >{/* &raquo; */}</span> : <span className="arrow" />}
     </button>
     <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel}/>
    </>
   ) : (
    
    <a 
    style={{  cursor : "pointer" }}
    onClick={e => {
        if(items.comp === "home"){
            navigation(`/${items.comp}`)    
        }else{
            navigation(`/box/${items.comp}`)
        }
      }
    }>{items.title}</a>
   )}
  </li>
 );
};

export default MenuItms;